package app;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.patch;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.staticFiles;

import java.io.File;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.gson.Gson;

import dao.CompraDAO;
import dao.IngressoDAO;
import dao.NegociacaoDAO;
import dao.UsuarioDAO;
import model.Compra;
import model.Ingresso;
import model.Negociacao;
import model.Usuario;
import util.JSONTransformer;

public class Aplicacao {

    public static void main(String[] args) throws Exception {

        JSONTransformer jsonTransformer = new JSONTransformer();
        final Gson gson = new Gson();

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        IngressoDAO ingressoDAO = new IngressoDAO();
        NegociacaoDAO negociacaoDAO = new NegociacaoDAO();
        CompraDAO compraDAO = new CompraDAO();

        port(6789);
        staticFiles.location("/public");

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        after((req, res) -> {
            res.type("application/json");
            res.body(jsonTransformer.render(res.body()));
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
        });

        post("/insere_usuario", (request, response) -> {
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);
            usuarioDAO.insere(usuario);
            return "Usuario inserido com sucesso!";
        }, jsonTransformer);

        delete("/deleteUsuario/:id", (request, response) -> usuarioDAO.delete(Integer.parseInt(request.params(":id"))));

        patch("/insere_usuario/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);
            usuarioDAO.update(id, usuario);
            return "Usuario atualizado com sucesso!";
        }, jsonTransformer);

        get("/usuario/:id", (request, response) -> usuarioDAO.getUsuario(Integer.parseInt(request.params(":id"))));

        post("/insere_ingresso", (request, response) -> {
            Ingresso ingresso = gson.fromJson(request.body(), Ingresso.class);

            // String pdfPath = request.queryParams("pdf");
            // ingresso.setIngressoPdf(pdfPath);

            ingressoDAO.insere(ingresso);

            return "Ingresso inserido com sucesso!";
        }, jsonTransformer);

        delete("/deletarIngresso/:id",
                (request, response) -> ingressoDAO.delete(Integer.parseInt(request.params(":id"))));

        put("/updateIngresso/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));
            Ingresso ingresso = gson.fromJson(request.body(), Ingresso.class);

            // String pdfPath = request.queryParams("pdf");
            // ingresso.setIngressoPdf(pdfPath);

            boolean ingressoAtualizado = ingressoDAO.update(id, ingresso);

            return ingressoAtualizado ? "Ingresso atualizado com sucesso!" : "Erro ao atualizar ingresso.";
        }, jsonTransformer);

        get("/ingressos/:id", (request, response) -> ingressoDAO.getById(Integer.parseInt(request.params(":id"))),
                jsonTransformer);

        get("/ingressos", (request, response) -> {
            List<Ingresso> ingressos = IngressoDAO.getAll();
            Map<String, Object> data = new HashMap<>();
            data.put("ingressos", ingressos);
            return data;
        }, jsonTransformer);

        post("/compra_ingresso/:usuarioId/:ingressoId", (request, response) -> {
            int usuarioId = Integer.parseInt(request.params(":usuarioId"));
            int ingressoId = Integer.parseInt(request.params(":ingressoId"));

            Ingresso ingresso = ingressoDAO.getById(ingressoId);
            if (ingresso != null) {
                Compra compra = new Compra();
                compra.setUsuarioIdUsuario(usuarioId);
                compra.setIngressoIdIngresso(ingressoId);
                compra.setDataCompra(new Timestamp(System.currentTimeMillis()));
                compra.setPrecoFinal(ingresso.getPreco()); // Use o preço do evento ou outro valor adequado
                compraDAO.insere(compra);
                // ingresso.setUsuarioIdUsuario(usuarioId); // Atualiza o ingresso com o ID do novo proprietário
                ingressoDAO.update(ingressoId, ingresso);
                return "Ingresso comprado com sucesso!";
            } else {
                response.status(404);
                return "Ingresso não encontrado!";
            }
        }, jsonTransformer);

        post("/uploadPdf", (request, response) -> {
            String uploadDirectory = "uploads/pdfs"; // Diretório de upload

            File uploadDir = new File(uploadDirectory);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            DiskFileItemFactory factory = new DiskFileItemFactory();
            factory.setSizeThreshold(1024 * 1024);
            factory.setRepository(new File(System.getProperty("java.io.tmpdir")));

            ServletFileUpload upload = new ServletFileUpload(factory);
            upload.setSizeMax(1024 * 1024 * 10); // Limite de 10MB

            try {
                List<FileItem> formItems = upload.parseRequest(request.raw());
                for (FileItem item : formItems) {
                    if (!item.isFormField()) {
                        String fileName = new File(item.getName()).getName();
                        String uniqueName = UUID.randomUUID().toString() + "_" + fileName;
                        String filePath = uploadDirectory + File.separator + uniqueName;
                        File storeFile = new File(filePath);
                        item.write(storeFile);
                        response.status(200);
                        return "PDF carregado com sucesso! Caminho: " + filePath;
                    }
                }
            } catch (Exception ex) {
                response.status(500);
                return "Erro ao carregar o PDF: " + ex.getMessage();
            }

            response.status(400);
            return "Nenhum arquivo enviado.";
        });

        post("/insere_negociacao", (request, response) -> {
            Negociacao negociacao = gson.fromJson(request.body(), Negociacao.class);
            negociacaoDAO.insere(negociacao);
            return "Negociação inserida com sucesso!";
        }, jsonTransformer);

        delete("/deletarNegociacao/:id",
                (request, response) -> negociacaoDAO.delete(Integer.parseInt(request.params(":id"))));

        put("/updateNegociacao/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));
            Negociacao negociacao = gson.fromJson(request.body(), Negociacao.class);
            boolean negociacaoAtualizada = negociacaoDAO.update(id, negociacao);
            return negociacaoAtualizada ? "Negociação atualizada com sucesso!" : "Erro ao atualizar negociação.";
        }, jsonTransformer);

        get("/negociacao/:id", (request, response) -> negociacaoDAO.getById(Integer.parseInt(request.params(":id"))),
                jsonTransformer);

        get("/negociacoes", (request, response) -> {
            List<Negociacao> negociacoes = negociacaoDAO.getAll();
            Map<String, Object> data = new HashMap<>();
            data.put("negociacoes", negociacoes);
            return data;
        }, jsonTransformer);

        get("/compra/:id", (request, response) -> compraDAO.getById(Integer.parseInt(request.params(":id"))),
                jsonTransformer);

        get("/compras", (request, response) -> {
            List<Compra> compras = compraDAO.getAll();
            Map<String, Object> data = new HashMap<>();
            data.put("compras", compras);
            return data;
        }, jsonTransformer);
    }
}

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
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

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

        // Rota de autenticação
        post("/login", (request, response) -> {
            Type type = new TypeToken<Map<String, String>>() {
            }.getType();
            Map<String, String> jsonData = gson.fromJson(request.body(), type);
            String email = jsonData.get("email");
            String senha = jsonData.get("senha");

            Usuario usuario = usuarioDAO.authenticate(email, senha);
            if (usuario != null) {
                return gson.toJson(usuario);
            } else {
                response.status(401);
                return "Usuário ou senha inválidos!";
            }
        });

        post("/insere_usuario", (request, response) -> {
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);
            boolean inserido = usuarioDAO.insere(usuario);

            Map<String, Object> data = new HashMap<>();
            data.put("mensagem", inserido ? "Usuario cadastrado" : "Usuario não pode ser cadastrado");
            data.put("ok", inserido);

            return data;
        }, jsonTransformer);

        delete("/deleteUsuario/:id", (request, response) -> usuarioDAO.delete(Integer.parseInt(request.params(":id"))));

        patch("/insere_usuario/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);
            usuarioDAO.update(id, usuario);
            return "Usuario atualizado com sucesso!";
        }, jsonTransformer);

        get("/usuario/:id", (request, response) -> usuarioDAO.getUsuario(Integer.parseInt(request.params(":id"))),
                jsonTransformer);

        post("/insere_ingresso", (request, response) -> {
            Ingresso ingresso = gson.fromJson(request.body(), Ingresso.class);

            boolean inserido = ingressoDAO.insere(ingresso);

            Map<String, Object> data = new HashMap<>();
            data.put("mensagem", inserido ? "Seu ingresso esta a venda" : "Houve um erro ao vender seu ingresso");
            data.put("ok", inserido);

            return data;
        }, jsonTransformer);

        delete("/deletarIngresso/:id", (request, response) -> {
            boolean deletado = ingressoDAO.delete(Integer.parseInt(request.params(":id")));
            Map<String, Object> data = new HashMap<>();
            data.put("mensagem", deletado ? "Ingresso deletado" : "Erro ao deletar ingresso");
            data.put("ok", deletado);

            return data;
        }, jsonTransformer);

        put("/updateIngresso/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));
            Ingresso ingresso = gson.fromJson(request.body(), Ingresso.class);

            boolean ingressoAtualizado = ingressoDAO.update(id, ingresso);

            Map<String, Object> data = new HashMap<>();
            data.put("mensagem", ingressoAtualizado ? "Ingresso atualizado" : "Erro ao atualizar ingresso");
            data.put("ok", ingressoAtualizado);

            return data;
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

                ingressoDAO.update(ingressoId, ingresso);
                return "Ingresso comprado com sucesso!";
            } else {
                response.status(404);
                return "Ingresso não encontrado!";
            }
        }, jsonTransformer);

        post("/uploadPdf", (request, response) -> {
            String uploadDirectory = "server/src/main/resources/public/pdfs"; // Diretório de upload

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
                        Map<String, Object> data = new HashMap<>();
                        data.put("url", uniqueName);
                        data.put("path", filePath);
                        return data;
                    }
                }
            } catch (Exception ex) {
                response.status(500);
                return "Erro ao carregar o PDF: " + ex.getMessage();
            }

            response.status(400);
            return "Nenhum arquivo enviado.";
        }, jsonTransformer);

        post("/insere_negociacao", (request, response) -> {
            Negociacao negociacao = gson.fromJson(request.body(), Negociacao.class);
            boolean inserido = negociacaoDAO.insere(negociacao);

            Map<String, Object> data = new HashMap<>();
            data.put("mensagem", inserido ? "Ingresso atualizado" : "Erro ao atualizar ingresso");
            data.put("ok", inserido);

            return data;
        }, jsonTransformer);

        delete("/deletarNegociacao/:id",
                (request, response) -> {
                    boolean deletado = negociacaoDAO.delete(Integer.parseInt(request.params(":id")));
                    Map<String, Object> data = new HashMap<>();
                    data.put("mensagem", deletado ? "Negociação deletada" : "Erro ao deletar negociação");
                    data.put("ok", deletado);

                    return data;
                });

        put("/updateNegociacao/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));
            Negociacao negociacao = gson.fromJson(request.body(), Negociacao.class);
            boolean negociacaoAtualizada = negociacaoDAO.update(id, negociacao);
            if (negociacao.getStatus().equals("aceito")) {
                Ingresso ingresso = ingressoDAO.getById(negociacao.getIngressoIdIngresso());
                ingresso.setPreco(negociacao.getPrecoOferecido());

                ingressoDAO.update(negociacao.getIngressoIdIngresso(), ingresso);
            }
            Map<String, Object> data = new HashMap<>();
            data.put("ok", negociacaoAtualizada);
            data.put("mensagem",
                    negociacaoAtualizada ? "Negociação atualizada com sucesso!" : "Erro ao atualizar negociação.");
            return data;
        }, jsonTransformer);

        get("/negociacao/:id", (request, response) -> negociacaoDAO.getById(Integer.parseInt(request.params(":id"))),
                jsonTransformer);

        get("/negociacoes", (request, response) -> {
            List<Negociacao> negociacoes = NegociacaoDAO.getAll(); // ERRADO
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

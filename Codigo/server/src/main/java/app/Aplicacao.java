//ROTAS

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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import dao.IngressoDAO;
import dao.UsuarioDAO;
import model.Ingresso;
import model.Usuario;
import util.JSONTransformer;

public class Aplicacao {

    public static void main(String[] args) throws Exception {

        JSONTransformer jsonTransformer = new JSONTransformer();
        final Gson gson = new Gson();
		
		UsuarioDAO usuarioDAO = new UsuarioDAO();
        IngressoDAO ingressoDAO = new IngressoDAO();

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
            response.header("Access-Control-Allow-Origin", "*"); // Permitir todas as origens (modifique conforme necessário)
        });
                
		post("/insere_usuario ", (request, response) -> {
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);

            usuarioDAO.insere(usuario);

            return "Usuario inserido com sucesso!";
        }, jsonTransformer); // inserir
        delete("/deleteUsuario/:id", (request, response) -> usuarioDAO.delete(Integer.parseInt(request.params(":id")))); // deletar
        patch("/insere_usuario/:id", (request, response) -> {
            int id = Integer.parseInt(request.params(":id"));

            Usuario usuario = gson.fromJson(request.body(), Usuario.class);

            usuarioDAO.update(id, usuario);

            return "Usuario atualizado com sucesso!";
        }, jsonTransformer); // 
        get("/usuario/:id", (request, response) -> usuarioDAO.getUsuario(Integer.parseInt(request.params(":id"))));
        
        post("/insere_ingresso", (request, response) -> {
            Ingresso ingresso = gson.fromJson(request.body(), Ingresso.class);

            ingressoDAO.insere(ingresso);

            return "Ingresso inserido com sucesso!";
        }, jsonTransformer);
		delete("/deletarIngresso/:id", (request, response) -> {
            boolean ingressoDeletado = ingressoDAO.delete(Integer.parseInt(request.params(":id")));
            return ingressoDeletado;
        }, jsonTransformer);
        put("/updateIngresso/:id", (request, response) -> {
            Ingresso ingresso = gson.fromJson(request.body(), Ingresso.class);

            boolean ingressoAtualizado = ingressoDAO.update(Integer.parseInt(request.params(":id")), ingresso);

            return ingressoAtualizado;
        }, jsonTransformer);
        get("/ingressos/:id", (request, response) -> {
            Ingresso ingresso = ingressoDAO.getById(Integer.parseInt(request.params(":id")));
            return ingresso;
        }, jsonTransformer);
        get("/ingressos", (request, response) -> {
            List<Ingresso> ingressos = IngressoDAO.getAll();
            Map<String, Object> data = new HashMap<>();
            data.put("ingressos", ingressos);

            return data;
        }, jsonTransformer);
	}
}
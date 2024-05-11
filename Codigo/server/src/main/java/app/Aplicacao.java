//ROTAS

package app;

import static spark.Spark.*;
import java.util.List;

import dao.DAO;
import dao.UsuarioDAO;
import model.Usuario;
import dao.IngressoDAO;

public class Aplicacao {

    public static void main(String[] args) throws Exception {
		
		UsuarioDAO usuarioDAO = new UsuarioDAO();
        IngressoDAO ingressoDAO = new IngressoDAO();
		
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

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*"); // Permitir todas as origens (modifique conforme necessário)
        });

		port(6789);
        
        staticFiles.location("/public");
        
		post("/insere_usuario ", (request, response) -> usuarioDAO.insere()); // inserir
		
        delete("/deleteUsuario ", (request, response) -> usuarioDAO.delete()); // deletar
		
        post("/insere_usuario ", (request, response) -> usuarioDAO.update()); // 
		
        get("/usuario/ id:", (request, response) -> usuarioDAO.getUsuario());
        
        


        post("/insere_ingresso", (request, response) -> ingressoDAO.insere());
		delete("/produtos", (request, response) -> ; ingrssoDAO.delete());
        post("/updateIngresso",(request,response)->ingressoDAO.update());
        get("/ingresso/:id", (request, response) -> ingressoDAO.getIngresso(request.params(":id")));
	
	}
}
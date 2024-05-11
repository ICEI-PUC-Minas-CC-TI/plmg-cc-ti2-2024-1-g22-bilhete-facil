package dao;

import java.sql.*;

import model.Usuario;

public class UsuarioDAO extends DAO { // sempre colocar extends DAO

	public UsuarioDAO() {
		super();
		conectar();
	}

	public void finalize() {
		close();
	}

	public boolean insere(Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "INSERT INTO usuario (id, nome, email, idade, cpf, senha) " + "VALUES (" + usuario.getId()
					+ ",'" + usuario.getNome() + ",'" + usuario.getEmail() + ",'" + usuario.getIdade() + ",'"
					+ usuario.getCpf() + ",'" + usuario.getSenha() + "',);";

			System.out.println(sql); // printa o que você tá fazendo

			st.executeUpdate(sql); // Manda pro banco de dados

			st.close(); // fecha a conexão

			status = true; // boolean
		} catch (Exception e) {
			System.out.println("erro insereUsuário: " + e.getMessage());
		}
		return status;

	}

	public boolean delete(int id) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "DELETE FROM usuario WHERE id = " + id + ";";
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (Exception e) {
			System.out.println("Erro ao deletar usuário: " + e.getMessage());
		}
		return status;
	}

	public boolean update(int id, Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE usuario SET nome = '" + usuario.getNome() + "', email = '" + usuario.getEmail()
					+ "', idade = " + usuario.getIdade() + ", cpf = '" + usuario.getCpf() + "', senha = '"
					+ usuario.getSenha() + "' WHERE id = " + id + ";";
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (Exception e) {
			System.out.println("Erro ao atualizar usuário: " + e.getMessage());
		}
		return status;
	}

	public Usuario getUsuario(int id) {
		Usuario usuario = null;
		try {
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery("SELECT * FROM usuario WHERE id = " + id + ";");
			if (rs.next()) {
				usuario = new Usuario();
				usuario.setId(rs.getInt("id"));
				usuario.setNome(rs.getString("nome"));
				usuario.setEmail(rs.getString("email"));
				usuario.setIdade(rs.getInt("idade"));
				usuario.setCpf(rs.getString("cpf"));
				usuario.setSenha(rs.getString("senha"));
			}
			st.close();
		} catch (Exception e) {
			System.out.println("Erro ao obter usuário: " + e.getMessage());
		}
		return usuario;
	}
}
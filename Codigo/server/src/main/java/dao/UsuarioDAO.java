package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

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
            String sql = "INSERT INTO usuario (nome, email, idade, cpf, senha) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setString(1, usuario.getNome());
            ps.setString(2, usuario.getEmail());
            ps.setInt(3, usuario.getIdade());
            ps.setString(4, usuario.getCpf());
            ps.setString(5, usuario.getSenha());
            ps.executeUpdate();
            ps.close();
            status = true;
        } catch (Exception e) {
            System.out.println("Erro ao inserir usuário: " + e.getMessage());
        }
        return status;
    }

    public boolean delete(int idUsuario) {
        boolean status = false;
        try {
            Statement st = conexao.createStatement();
            String sql = "DELETE FROM usuario WHERE idUsuario = " + idUsuario + ";";
            st.executeUpdate(sql);
            st.close();
            status = true;
        } catch (Exception e) {
            System.out.println("Erro ao deletar usuário: " + e.getMessage());
        }
        return status;
    }

    public boolean update(int idUsuario, Usuario usuario) {
        boolean status = false;
        try {
            String sql = "UPDATE usuario SET nome = ?, email = ?, idade = ?, cpf = ?, senha = ? WHERE idUsuario = ?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setString(1, usuario.getNome());
            ps.setString(2, usuario.getEmail());
            ps.setInt(3, usuario.getIdade());
            ps.setString(4, usuario.getCpf());
            ps.setString(5, usuario.getSenha());
            ps.setInt(6, idUsuario);
            ps.executeUpdate();
            ps.close();
            status = true;
        } catch (Exception e) {
            System.out.println("Erro ao atualizar usuário: " + e.getMessage());
        }
        return status;
    }

    public Usuario getUsuario(int idUsuario) {
        Usuario usuario = null;
        try {
            String sql = "SELECT * FROM usuario WHERE idUsuario = ?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("idUsuario"));
                usuario.setNome(rs.getString("nome"));
                usuario.setEmail(rs.getString("email"));
                usuario.setIdade(rs.getInt("idade"));
                usuario.setCpf(rs.getString("cpf"));
                usuario.setSenha(rs.getString("senha"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter usuário: " + e.getMessage());
        }
        return usuario;
    }

     // Método de autenticação
    public Usuario authenticate(String email, String senha) {
        Usuario usuario = null;
        try {
            String sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, senha);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("idUsuario"));
                usuario.setNome(rs.getString("nome"));
                usuario.setEmail(rs.getString("email"));
                usuario.setIdade(rs.getInt("idade"));
                usuario.setCpf(rs.getString("cpf"));
                usuario.setSenha(rs.getString("senha"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao autenticar usuário: " + e.getMessage());
        }
        return usuario;
    }
}
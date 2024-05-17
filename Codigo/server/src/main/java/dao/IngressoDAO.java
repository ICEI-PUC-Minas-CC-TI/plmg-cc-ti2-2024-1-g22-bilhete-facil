package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Ingresso;

public class IngressoDAO extends DAO {

    public void finalize() {
        close();
    }

    public IngressoDAO() {
        super();
        conectar();
    }

    public boolean insere(Ingresso ingresso) {
        boolean status = false;
        try {
            String sql = "INSERT INTO Ingresso (descricao, imagem, preco, negociar, nome, idUsuario) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setString(1, ingresso.getDescricao());
            ps.setString(2, ingresso.getImagem());
            ps.setDouble(3, ingresso.getPreco());
            ps.setBoolean(4, ingresso.isNegociar());
            ps.setString(5, ingresso.getNome());
            ps.setInt(6, ingresso.getUsuarioIdUsuario());
            ps.executeUpdate();
            status = true;
        } catch (Exception e) {
            System.out.println("Erro ao inserir ingresso: " + e.getMessage());
        }
        return status;
    }

    public boolean delete(int idIngresso) {
        boolean status = false;
        try {
            Statement st = conexao.createStatement();
            String sql = "DELETE FROM Ingresso WHERE idIngresso = " + idIngresso;
            int ver = st.executeUpdate(sql);
            if (ver > 0) {
                status = true;
            }
        } catch (Exception e) {
            System.out.println("Erro ao deletar ingresso: " + e.getMessage());
        }
        return status;
    }

    public boolean update(int idIngresso, Ingresso ingresso) {
        boolean status = false;
        try {
            String sql = "UPDATE Ingresso SET descricao=?, imagem=?, preco=?, negociar=?, Usuario_idUsuario=?, nome=? WHERE idIngresso=?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setString(1, ingresso.getDescricao());
            ps.setString(2, ingresso.getImagem());
            ps.setDouble(3, ingresso.getPreco());
            ps.setBoolean(4, ingresso.isNegociar());
            // ps.setInt(5, ingresso.getUsuarioIdUsuario());
            ps.setInt(6, idIngresso);
            ps.setString(7, ingresso.getNome());
            int ver = ps.executeUpdate();
            ps.close();
            if (ver > 0) {
                status = true;
            }
        } catch (Exception e) {
            System.out.println("Erro ao atualizar ingresso: " + e.getMessage());
        }
        return status;
    }

    public Ingresso getById(int idIngresso) {
        Ingresso ingresso = null;
        try {
            String sql = "SELECT * FROM Ingresso WHERE idIngresso=?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setInt(1, idIngresso);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ingresso = new Ingresso();
                ingresso.setIdIngresso(rs.getInt("idIngresso"));
                ingresso.setNome(rs.getString("nome"));
                ingresso.setDescricao(rs.getString("descricao"));
                ingresso.setImagem(rs.getString("imagem"));
                ingresso.setPreco(rs.getDouble("preco"));
                ingresso.setNegociar(rs.getBoolean("negociar"));
                ingresso.setUsuarioIdUsuario(rs.getInt("idUsuario"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter ingresso por ID: " + e.getMessage());
        }
        return ingresso;
    }

    public static List<Ingresso> getAll() {
        List<Ingresso> ingressos = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Ingresso";
            Statement st = conexao.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Ingresso ingresso = new Ingresso();
                ingresso.setIdIngresso(rs.getInt("idIngresso"));
                ingresso.setNome(rs.getString("nome"));
                ingresso.setDescricao(rs.getString("descricao"));
                ingresso.setImagem(rs.getString("imagem"));
                ingresso.setPreco(rs.getDouble("preco"));
                ingresso.setNegociar(rs.getBoolean("negociar"));
                ingresso.setUsuarioIdUsuario(rs.getInt("idUsuario"));
                ingressos.add(ingresso);
            }
            rs.close();
            st.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter todos os ingressos: " + e.getMessage());
        }
        return ingressos;
    }
}

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
            String sql = "INSERT INTO ingresso (id, nome, descricao, precoevento, negociar) " + "VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setInt(1, ingresso.getId());
            ps.setString(2, ingresso.getNome());
            ps.setString(3, ingresso.getDescricao());
            ps.setInt(4, ingresso.getPrecoevento());
            ps.setBoolean(5, ingresso.getNegociar());
            System.out.println(sql); // printa o que você está fazendo
            ps.executeUpdate();
            status = true; // boolean
        } catch (Exception e) {
            System.out.println("erro insereIngresso: " + e.getMessage());
        }
        return status;
    }

    public boolean delete(int id) {
        boolean status = false;
        try {
            Statement st = conexao.createStatement();
            String sql = "DELETE FROM ingresso WHERE id=" + id;
            int ver = st.executeUpdate(sql);
            if (ver > 0) {
                status = true;
            }
        } catch (Exception e) {
            System.out.println("erro deleteIngresso: " + e.getMessage());
        }
        return status;
    }

    public boolean update(int id, Ingresso ingresso) {
        boolean status = false;
        try {
            PreparedStatement ps = conexao
                    .prepareStatement("UPDATE ingresso SET nome=?, descricao=?, precoevento=?,negociar=? WHERE id=?");
            ps.setString(1, ingresso.getNome());
            ps.setString(2, ingresso.getDescricao());
            ps.setInt(3, ingresso.getPrecoevento());
            ps.setBoolean(4, ingresso.getNegociar());
            ps.setInt(5, id);
            int ver = ps.executeUpdate();
            ps.close();
            if (ver > 0) {
                status = true;
            }
        } catch (Exception e) {
            System.out.println("erro deleteIngresso: " + e.getMessage());
        }
        return status;
    }

    public Ingresso getById(int id) {
        Ingresso ingresso = null;
        try {
            PreparedStatement ps = conexao.prepareStatement("SELECT *from ingresso WHERE id=?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ingresso = new Ingresso();
                ingresso.setId(rs.getInt("id"));
                ingresso.setNome(rs.getString("nome"));
                ingresso.setDescricao(rs.getString("descricao"));
                ingresso.setPrecoevento(rs.getInt("precoevento"));
                ingresso.setNegociar(rs.getBoolean("negociar"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            System.out.println("erro getByIdIngresso: " + e.getMessage());
        }
        return ingresso;
    }

    public static List<Ingresso> getAll() {
        List<Ingresso> ingressos = new ArrayList<>();
        try {
            Statement st = conexao.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM ingresso");
            while (rs.next()) {
                Ingresso ingresso = new Ingresso();
                ingresso.setId(rs.getInt("id"));
                ingresso.setNome(rs.getString("nome"));
                ingresso.setDescricao(rs.getString("descricao"));
                ingresso.setPrecoevento(rs.getInt("precoevento"));
                ingresso.setNegociar(rs.getBoolean("negociar"));
                ingressos.add(ingresso);
            }
            rs.close();
            st.close();
        } catch (Exception e) {
            System.out.println("erro getAllIngresso: " + e.getMessage());
        }
        return ingressos;
    }
}
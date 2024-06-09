package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Negociacao;

public class NegociacaoDAO extends DAO {

    public NegociacaoDAO() {
        super();
        conectar();
    }

    public void finalize() {
        close();
    }

    public boolean insere(Negociacao negociacao) {
        System.out.println(negociacao.getIngressoIdIngresso());
        boolean status = false;
        try {
            String sql = "INSERT INTO negociacao (idIngresso, idUsuario, PrecoOferecido, Status) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setInt(1, negociacao.getIngressoIdIngresso());
            ps.setInt(2, negociacao.getUsuarioIdUsuario());
            ps.setDouble(3, negociacao.getPrecoOferecido());
            ps.setString(4, negociacao.getStatus());
            ps.executeUpdate();
            status = true;
        } catch (Exception e) {
            System.out.println("Erro ao inserir negociação: " + e.getMessage());
        }
        return status;
    }

    public boolean delete(int idNegociacao) {
        boolean status = false;
        try {
            Statement st = conexao.createStatement();
            String sql = "DELETE FROM negociacao WHERE idNegociacao=" + idNegociacao;
            int ver = st.executeUpdate(sql);
            if (ver > 0) {
                status = true;
            }
        } catch (Exception e) {
            System.out.println("Erro ao deletar negociação: " + e.getMessage());
        }
        return status;
    }

    public boolean update(int idNegociacao, Negociacao negociacao) {
        boolean status = false;
        try {
            PreparedStatement ps = conexao.prepareStatement("UPDATE negociacao SET Ingresso_idIngresso=?, Usuario_idUsuario=?, PrecoOferecido=?, Status=? WHERE idNegociacao=?");
            ps.setInt(1, negociacao.getIngressoIdIngresso());
            ps.setInt(2, negociacao.getUsuarioIdUsuario());
            ps.setDouble(3, negociacao.getPrecoOferecido());
            ps.setString(4, negociacao.getStatus());
            ps.setInt(5, idNegociacao);
            int ver = ps.executeUpdate();
            ps.close();
            if (ver > 0) {
                status = true;
            }
        } catch (Exception e) {
            System.out.println("Erro ao atualizar negociação: " + e.getMessage());
        }
        return status;
    }

    public Negociacao getById(int idNegociacao) {
        Negociacao negociacao = null;
        try {
            PreparedStatement ps = conexao.prepareStatement("SELECT * FROM negociacao WHERE idNegociacao=?");
            ps.setInt(1, idNegociacao);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                negociacao = new Negociacao();
                negociacao.setIdNegociacao(rs.getInt("idNegociacao"));
                negociacao.setIngressoIdIngresso(rs.getInt("Ingresso_idIngresso"));
                negociacao.setUsuarioIdUsuario(rs.getInt("Usuario_idUsuario"));
                negociacao.setPrecoOferecido(rs.getDouble("PrecoOferecido"));
                negociacao.setStatus(rs.getString("Status"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter negociação: " + e.getMessage());
        }
        return negociacao;
    }

    public static List<Negociacao> getAll() {
        List<Negociacao> negociacoes = new ArrayList<>();
        try {
            Statement st = conexao.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM negociacao");
            while (rs.next()) {
                Negociacao negociacao = new Negociacao();
                negociacao.setIdNegociacao(rs.getInt("idNegociacao"));
                negociacao.setIngressoIdIngresso(rs.getInt("idIngresso"));
                negociacao.setUsuarioIdUsuario(rs.getInt("idUsuario"));
                negociacao.setPrecoOferecido(rs.getDouble("PrecoOferecido"));
                negociacao.setStatus(rs.getString("Status"));
                negociacoes.add(negociacao);
            }
            rs.close();
            st.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter todas as negociações: " + e.getMessage());
        }
        return negociacoes;
    }
}
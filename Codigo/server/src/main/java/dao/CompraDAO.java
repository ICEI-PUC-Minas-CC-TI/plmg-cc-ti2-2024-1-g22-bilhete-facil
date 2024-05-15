package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Compra;

public class CompraDAO extends DAO {

    public CompraDAO() {
        super();
        conectar();
    }

    public void finalize() {
        close();
    }

    public boolean insere(Compra compra) {
        boolean status = false;
        try {
            String sql = "INSERT INTO Compra (Negociacao_idNegociacao, Usuario_idUsuario, Ingresso_idIngresso, DataCompra, PrecoFinal) "
                       + "VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = conexao.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            if (compra.getNegociacaoIdNegociacao() != null) {
                ps.setInt(1, compra.getNegociacaoIdNegociacao());
            } else {
                ps.setNull(1, Types.INTEGER);
            }
            ps.setInt(2, compra.getUsuarioIdUsuario());
            ps.setInt(3, compra.getIngressoIdIngresso());
            ps.setTimestamp(4, compra.getDataCompra());
            ps.setDouble(5, compra.getPrecoFinal());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                compra.setIdCompra(rs.getInt(1));
            }
            status = true;
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao inserir Compra: " + e.getMessage());
        }
        return status;
    }

    public boolean update(Compra compra) {
        boolean status = false;
        try {
            String sql = "UPDATE Compra SET Negociacao_idNegociacao=?, Usuario_idUsuario=?, Ingresso_idIngresso=?, DataCompra=?, PrecoFinal=? "
                       + "WHERE idCompra=?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            if (compra.getNegociacaoIdNegociacao() != null) {
                ps.setInt(1, compra.getNegociacaoIdNegociacao());
            } else {
                ps.setNull(1, Types.INTEGER);
            }
            ps.setInt(2, compra.getUsuarioIdUsuario());
            ps.setInt(3, compra.getIngressoIdIngresso());
            ps.setTimestamp(4, compra.getDataCompra());
            ps.setDouble(5, compra.getPrecoFinal());
            ps.setInt(6, compra.getIdCompra());
            ps.executeUpdate();
            status = true;
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao atualizar Compra: " + e.getMessage());
        }
        return status;
    }

    public boolean delete(int idCompra) {
        boolean status = false;
        try {
            Statement st = conexao.createStatement();
            String sql = "DELETE FROM Compra WHERE idCompra = " + idCompra;
            st.executeUpdate(sql);
            status = true;
            st.close();
        } catch (Exception e) {
            System.out.println("Erro ao deletar Compra: " + e.getMessage());
        }
        return status;
    }

    public Compra getById(int idCompra) {
        Compra compra = null;
        try {
            String sql = "SELECT * FROM Compra WHERE idCompra = ?";
            PreparedStatement ps = conexao.prepareStatement(sql);
            ps.setInt(1, idCompra);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                compra = new Compra();
                compra.setIdCompra(rs.getInt("idCompra"));
                compra.setNegociacaoIdNegociacao((Integer) rs.getObject("Negociacao_idNegociacao"));
                compra.setUsuarioIdUsuario(rs.getInt("Usuario_idUsuario"));
                compra.setIngressoIdIngresso(rs.getInt("Ingresso_idIngresso"));
                compra.setDataCompra(rs.getTimestamp("DataCompra"));
                compra.setPrecoFinal(rs.getDouble("PrecoFinal"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter Compra: " + e.getMessage());
        }
        return compra;
    }

    public List<Compra> getAll() {
        List<Compra> compras = new ArrayList<>();
        try {
            Statement st = conexao.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM Compra");
            while (rs.next()) {
                Compra compra = new Compra();
                compra.setIdCompra(rs.getInt("idCompra"));
                compra.setNegociacaoIdNegociacao((Integer) rs.getObject("Negociacao_idNegociacao"));
                compra.setUsuarioIdUsuario(rs.getInt("Usuario_idUsuario"));
                compra.setIngressoIdIngresso(rs.getInt("Ingresso_idIngresso"));
                compra.setDataCompra(rs.getTimestamp("DataCompra"));
                compra.setPrecoFinal(rs.getDouble("PrecoFinal"));
                compras.add(compra);
            }
            rs.close();
            st.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter todas as Compras: " + e.getMessage());
        }
        return compras;
    }
}

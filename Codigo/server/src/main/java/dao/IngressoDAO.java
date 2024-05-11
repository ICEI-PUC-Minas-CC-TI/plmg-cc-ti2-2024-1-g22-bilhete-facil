package dao;
import java.util.List;
import model.Ingresso;

import java.sql.*;
import java.util.ArrayList;

public class IngressoDAO extends DAO{

    public void finalize() {
        close();
    }

    public IngressoDAO(){
        super();
		conectar();
    } 

    public boolean insere(Ingresso ingresso){
        boolean status = false;
        try{
            Statement st = conexao.createStatement();
            String sql = "INSERT INTO ingresso (id,descricao,precoevento,negociar)"
+"VALUES ("+ingresso.getId()+","+ingresso.getDescricao()+","+ingresso.getPrecoevento()
+","+ingresso.getNegociar()+")";
            System.out.println(sql); // printa o que você está fazendo
            st.executeUpdate(sql); // Manda pro banco de dados
            st.close(); // fecha a conexão
            status = true; // boolean   

        }catch (Exception e) {
            System.out.println("erro insereIngresso: " + e.getMessage());
    }
    return status;
}
    public boolean delete(int id){
            boolean status = false;
            try{
                Statement st=conexao.createStatement();
                String sql="DELETE FROM ingresso WHERE id="+id;
                int ver=st.executeUpdate(sql);
                if(ver>0){
                    status=true;
                }
            }catch(Exception e){
                System.out.println("erro deleteIngresso: " + e.getMessage());
            }
            return status;
    }
    public boolean update(Ingresso ingresso){
        boolean status = false;
        try{
            PreparedStatement ps=conexao.prepareStatement("UPDATE ingresso SET descricao=?, precoevento=?,negociar=? WHERE id=?");
            ps.setString(1, ingresso.getDescricao());
            ps.setInt(2, ingresso.getPrecoevento());
            ps.setBoolean(3, ingresso.getNegociar());
            ps.setInt(4, ingresso.getId());
            int ver=ps.executeUpdate();
            ps.close();
            if(ver>0){
                status=true;
            }
        }catch(Exception e){
            System.out.println("erro deleteIngresso: " + e.getMessage());
        }
        return status;
}

    public Ingresso getById(int id){
        Ingresso ingresso = null;
        try{
            PreparedStatement ps=conexao.prepareStatement("SELECT *from ingresso WHERE id=?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ingresso = new Ingresso();
                ingresso.setId(rs.getInt("id"));
                ingresso.setDescricao(rs.getString("descricao"));
                ingresso.setPrecoevento(rs.getInt("precoevento"));
                ingresso.setNegociar(rs.getBoolean("negociar"));
            }
            rs.close();
            ps.close();
        }catch(Exception e){
            System.out.println("erro getByIdIngresso: " + e.getMessage());
        }
        return ingresso;
    }
    public List<Ingresso> getAll() {
        List<Ingresso> ingressos = new ArrayList<>();
        try {
            Statement st = conexao.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM ingresso");
            while (rs.next()) {
                Ingresso ingresso = new Ingresso();
                ingresso.setId(rs.getInt("id"));
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
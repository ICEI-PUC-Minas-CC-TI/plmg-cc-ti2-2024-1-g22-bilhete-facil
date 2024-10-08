//CONECTAR COM POSTGRESQL

package dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DAO {
	protected static Connection conexao;
	
	public DAO() {
		conexao = null;
	}
	
	public boolean conectar() {
		String driverName = "org.postgresql.Driver";                    
		String serverName = "ti2-bilhete-facil.postgres.database.azure.com"; // vai mudar pra url
		String mydatabase = "TI2-Bilhete Facil";
		int porta = 5432;
		String url = "jdbc:postgresql://" + serverName + ":" + porta +"/" + mydatabase;
		String username = "postgres"; // login
		String password = "Rmsr21/07"; // login 
		boolean status = false;

		try {
			Class.forName(driverName);
			conexao = DriverManager.getConnection(url, username, password);
			status = (conexao == null);
			System.out.println("Conexão efetuada com o postgres!");
		} catch (ClassNotFoundException e) { 
			System.err.println("Conexão NÃO efetuada com o postgres -- Driver não encontrado -- " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Conexão NÃO efetuada com o postgres -- " + e.getMessage());
		}

		return status;
	}
	
	public boolean close() {
		boolean status = false;
		
		try {
			conexao.close();
			status = true;
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		
		return status;
	}
	
	
	public static String toMD5(String senha) throws Exception {
		MessageDigest m=MessageDigest.getInstance("MD5");
		m.update(senha.getBytes(),0, senha.length());
		return new BigInteger(1,m.digest()).toString(16);
	}
}
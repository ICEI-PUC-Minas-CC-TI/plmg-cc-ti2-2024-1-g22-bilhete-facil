package model;

public class Usuario {
    private int idUsuario;
    private String nome;
    private String email;
    private int idade;
    private String cpf;
    private String senha;

    // Construtor vazio
    public Usuario() {
    }

    // Construtor com parâmetros
    public Usuario(int idUsuario, String nome, String email, int idade, String cpf, String senha) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.cpf = cpf;
        this.senha = senha;
    }

    // Métodos getters e setters
    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "idUsuario=" + idUsuario +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", idade=" + idade +
                ", cpf='" + cpf + '\'' +
                ", senha='" + senha + '\'' +
                '}';
    }
}

package model;

/**
 * Ingresso
 */
public class Ingresso {
    private int idIngresso;
    private String descricao;
    private String imagem;
    private double preco;
    private boolean negociar;
    // private int usuarioIdUsuario;
    private String nome;

    // Construtor vazio
    public Ingresso() {
    }

    // Construtor com parâmetros
    public Ingresso(int idIngresso, String descricao, String imagem, double preco, boolean negociar, int usuarioIdUsuario) {
        this.idIngresso = idIngresso;
        this.descricao = descricao;
        this.imagem = imagem;
        this.preco = preco;
        this.negociar = negociar;
        // this.usuarioIdUsuario = usuarioIdUsuario;
    }

    // Métodos getters e setters
    public String getNome() {
      return nome;
    }

    public void setNome(String nome) {
      this.nome = nome;
    }
    
    public int getIdIngresso() {
        return idIngresso;
    }

    public void setIdIngresso(int idIngresso) {
        this.idIngresso = idIngresso;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public boolean isNegociar() {
        return negociar;
    }

    public void setNegociar(boolean negociar) {
        this.negociar = negociar;
    }

    // public int getUsuarioIdUsuario() {
    //     return usuarioIdUsuario;
    // }

    // public void setUsuarioIdUsuario(int usuarioIdUsuario) {
    //     this.usuarioIdUsuario = usuarioIdUsuario;
    // }

    @Override
    public String toString() {
        return "Ingresso{" +
                "idIngresso=" + idIngresso +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", negociar=" + negociar +
                // ", usuarioIdUsuario=" + usuarioIdUsuario +
                '}';
    }
}

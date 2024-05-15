package model;

/**
 * Ingresso
 */
public class Ingresso {
    private int idIngresso;
    private String descricao;
    private byte[] imagem;
    private double preco;
    private boolean negociar;
    private int usuarioIdUsuario;

    // Construtor vazio
    public Ingresso() {
    }

    // Construtor com parâmetros
    public Ingresso(int idIngresso, String descricao, byte[] imagem, double preco, boolean negociar, int usuarioIdUsuario) {
        this.idIngresso = idIngresso;
        this.descricao = descricao;
        this.imagem = imagem;
        this.preco = preco;
        this.negociar = negociar;
        this.usuarioIdUsuario = usuarioIdUsuario;
    }

    // Métodos getters e setters
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

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
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

    public int getUsuarioIdUsuario() {
        return usuarioIdUsuario;
    }

    public void setUsuarioIdUsuario(int usuarioIdUsuario) {
        this.usuarioIdUsuario = usuarioIdUsuario;
    }

    @Override
    public String toString() {
        return "Ingresso{" +
                "idIngresso=" + idIngresso +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", negociar=" + negociar +
                ", usuarioIdUsuario=" + usuarioIdUsuario +
                '}';
    }
}

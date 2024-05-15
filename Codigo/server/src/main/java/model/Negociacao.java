package model;

public class Negociacao {
    private int idNegociacao;
    private int ingressoIdIngresso;
    private int usuarioIdUsuario;
    private double precoOferecido;
    private String status;

    // Construtor vazio
    public Negociacao() {
    }

    // Métodos getters e setters
    public int getIdNegociacao() {
        return idNegociacao;
    }

    public void setIdNegociacao(int idNegociacao) {
        this.idNegociacao = idNegociacao;
    }

    public int getIngressoIdIngresso() {
        return ingressoIdIngresso;
    }

    public void setIngressoIdIngresso(int ingressoIdIngresso) {
        this.ingressoIdIngresso = ingressoIdIngresso;
    }

    public int getUsuarioIdUsuario() {
        return usuarioIdUsuario;
    }

    public void setUsuarioIdUsuario(int usuarioIdUsuario) {
        this.usuarioIdUsuario = usuarioIdUsuario;
    }

    public double getPrecoOferecido() {
        return precoOferecido;
    }

    public void setPrecoOferecido(double precoOferecido) {
        this.precoOferecido = precoOferecido;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Negociacao{" +
                "idNegociacao=" + idNegociacao +
                ", ingressoIdIngresso=" + ingressoIdIngresso +
                ", usuarioIdUsuario=" + usuarioIdUsuario +
                ", precoOferecido=" + precoOferecido +
                ", status='" + status + '\'' +
                '}';
    }
}
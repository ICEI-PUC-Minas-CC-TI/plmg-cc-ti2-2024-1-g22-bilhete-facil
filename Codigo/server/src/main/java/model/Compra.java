package model;

import java.sql.Timestamp;

public class Compra {
    private int idCompra;
    private Integer negociacaoIdNegociacao; // Pode ser null
    private int usuarioIdUsuario;
    private int ingressoIdIngresso;
    private Timestamp dataCompra;
    private double precoFinal;

    // Getters e Setters
    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public Integer getNegociacaoIdNegociacao() {
        return negociacaoIdNegociacao;
    }

    public void setNegociacaoIdNegociacao(Integer negociacaoIdNegociacao) {
        this.negociacaoIdNegociacao = negociacaoIdNegociacao;
    }

    public int getUsuarioIdUsuario() {
        return usuarioIdUsuario;
    }

    public void setUsuarioIdUsuario(int usuarioIdUsuario) {
        this.usuarioIdUsuario = usuarioIdUsuario;
    }

    public int getIngressoIdIngresso() {
        return ingressoIdIngresso;
    }

    public void setIngressoIdIngresso(int ingressoIdIngresso) {
        this.ingressoIdIngresso = ingressoIdIngresso;
    }

    public Timestamp getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(Timestamp dataCompra) {
        this.dataCompra = dataCompra;
    }

    public double getPrecoFinal() {
        return precoFinal;
    }

    public void setPrecoFinal(double precoFinal) {
        this.precoFinal = precoFinal;
    }
}

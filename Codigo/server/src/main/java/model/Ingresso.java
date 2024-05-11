package model;

/**
 * Ingresso
 */
public class Ingresso {
    private int id;
    private String descricao;
    private int precoevento;
    private Boolean negociar;

    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public int getPrecoevento() {
		return precoevento;
	}
	public void setPrecoevento(int precoevento) {
		this.precoevento = precoevento;
	}
	public Boolean getNegociar() {
		return negociar;
	}
	public void setNegociar(Boolean negociar) {
		this.negociar = negociar;
	}
    
}
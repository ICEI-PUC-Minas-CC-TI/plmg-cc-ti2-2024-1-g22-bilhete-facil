package model;

/**
 * Ingresso
 */
public class Ingresso {
    private int id;
    private String nome;
    private String descricao;
    private int precoevento;
    private Boolean negociar;
		private String ingresso_pic;

  public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getIngressoPic() {
		return ingresso_pic;
	}
	public void setIngressoPic(String ingresso_pic) {
		this.ingresso_pic = ingresso_pic;
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
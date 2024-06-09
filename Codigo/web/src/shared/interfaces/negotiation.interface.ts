export interface Negotiation {
  idNegociacao: number
  ingressoIdIngresso: number
  usuarioIdUsuario: number
  precoOferecido: number
  status: 'pendente' | 'aceito' | 'recusado'
}

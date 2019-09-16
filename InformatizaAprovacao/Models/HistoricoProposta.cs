using System;
using System.Collections.Generic;

namespace InformatizaAprovacao.Models
{
    public partial class HistoricoProposta
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public int IdUsuario { get; set; }
        public int IdProposta { get; set; }
        public DateTime Data { get; set; }

        public Proposta IdPropostaNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}

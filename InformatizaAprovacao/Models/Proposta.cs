using System;
using System.Collections.Generic;

namespace InformatizaAprovacao.Models
{
    public partial class Proposta
    {
        public Proposta()
        {
            HistoricoProposta = new HashSet<HistoricoProposta>();
        }

        public int Id { get; set; }
        public int IdCategoria { get; set; }
        public int IdFornecedor { get; set; }
        public string Nome { get; set; }
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }
        public string Descricao { get; set; }
        public string CaminhoArquivo { get; set; }
        public bool? AprovadaAnalistaCompras { get; set; }
        public bool? AprovadaAnalistaFinanceiro { get; set; }
        public bool? AprovadaDiretorFinanceiro { get; set; }

        public Categoria IdCategoriaNavigation { get; set; }
        public Fornecedor IdFornecedorNavigation { get; set; }
        public ICollection<HistoricoProposta> HistoricoProposta { get; set; }
    }
}

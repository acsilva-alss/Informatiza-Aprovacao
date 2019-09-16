using System;
using System.Collections.Generic;

namespace InformatizaAprovacao.Models
{
    public partial class Fornecedor
    {
        public Fornecedor()
        {
            Proposta = new HashSet<Proposta>();
        }

        public int Id { get; set; }
        public string Cnpj { get; set; }
        public string Cpf { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }

        public ICollection<Proposta> Proposta { get; set; }
    }
}

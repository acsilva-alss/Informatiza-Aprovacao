using System;
using System.Collections.Generic;

namespace InformatizaAprovacao.Models
{
    public partial class Categoria
    {
        public Categoria()
        {
            Proposta = new HashSet<Proposta>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }

        public ICollection<Proposta> Proposta { get; set; }
    }
}

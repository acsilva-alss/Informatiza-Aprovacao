using System;
using System.Collections.Generic;

namespace InformatizaAprovacao.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            HistoricoProposta = new HashSet<HistoricoProposta>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Perfil { get; set; }
        public string Login { get; set; }
        public byte[] Senha { get; set; }

        public ICollection<HistoricoProposta> HistoricoProposta { get; set; }
    }
}

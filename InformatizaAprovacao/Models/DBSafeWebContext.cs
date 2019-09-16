using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace InformatizaAprovacao.Models
{
    public partial class DBSafeWebContext : DbContext
    {
        public DBSafeWebContext()
        {
        }

        public DBSafeWebContext(DbContextOptions<DBSafeWebContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Fornecedor> Fornecedor { get; set; }
        public virtual DbSet<HistoricoProposta> HistoricoProposta { get; set; }
        public virtual DbSet<Proposta> Proposta { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

       ///protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       /// {
       ///     if (!optionsBuilder.IsConfigured)
       ///     {
///#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
       ///        optionsBuilder.UseSqlServer("Data Source=PONFAC-02\\SQLEXPRESS;Initial Catalog=DBSafeWeb;User ID=sa;Password=gatecash00;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False;");
       ///     }
       /// }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("categoria");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Nome)
                    .HasColumnName("nome")
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Fornecedor>(entity =>
            {
                entity.ToTable("fornecedor");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cnpj)
                    .HasColumnName("cnpj")
                    .HasMaxLength(21)
                    .IsUnicode(false);

                entity.Property(e => e.Cpf)
                    .HasColumnName("cpf")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Telefone)
                    .IsRequired()
                    .HasColumnName("telefone")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<HistoricoProposta>(entity =>
            {
                entity.ToTable("historico_proposta");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Data)
                    .HasColumnName("data")
                    .HasColumnType("datetime");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdProposta).HasColumnName("id_proposta");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.HasOne(d => d.IdPropostaNavigation)
                    .WithMany(p => p.HistoricoProposta)
                    .HasForeignKey(d => d.IdProposta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__historico__id_pr__1B0907CE");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.HistoricoProposta)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__historico__id_us__1A14E395");
            });

            modelBuilder.Entity<Proposta>(entity =>
            {
                entity.ToTable("proposta");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AprovadaAnalistaCompras).HasColumnName("aprovada_analista_compras");

                entity.Property(e => e.AprovadaAnalistaFinanceiro).HasColumnName("aprovada_analista_financeiro");

                entity.Property(e => e.AprovadaDiretorFinanceiro).HasColumnName("aprovada_diretor_financeiro");

                entity.Property(e => e.CaminhoArquivo)
                    .HasColumnName("caminho_arquivo")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Data)
                    .HasColumnName("data")
                    .HasColumnType("datetime");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");

                entity.Property(e => e.IdFornecedor).HasColumnName("id_fornecedor");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Valor).HasColumnName("valor");

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Proposta)
                    .HasForeignKey(d => d.IdCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__proposta__id_cat__164452B1");

                entity.HasOne(d => d.IdFornecedorNavigation)
                    .WithMany(p => p.Proposta)
                    .HasForeignKey(d => d.IdFornecedor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__proposta__id_for__173876EA");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuario");

                entity.HasIndex(e => e.Login)
                    .HasName("UIX_usuario")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("cpf")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.DataNascimento)
                    .HasColumnName("data_nascimento")
                    .HasColumnType("date");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasColumnName("login")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Perfil)
                    .IsRequired()
                    .HasColumnName("perfil")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasColumnName("senha")
                    .HasMaxLength(40);
            });
        }
    }
}

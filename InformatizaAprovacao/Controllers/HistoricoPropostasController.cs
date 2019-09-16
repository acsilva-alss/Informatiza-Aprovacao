using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InformatizaAprovacao.Models;

namespace InformatizaAprovacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricoPropostasController : ControllerBase
    {
        private readonly DBSafeWebContext _context;

        public HistoricoPropostasController(DBSafeWebContext context)
        {
            _context = context;
        }

        // GET: api/HistoricoPropostas
        [HttpGet]
        public IEnumerable<HistoricoProposta> GetHistoricoProposta()
        {
            return _context.HistoricoProposta;
        }

        // GET: api/HistoricoPropostas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHistoricoProposta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var historicoProposta = await _context.HistoricoProposta.FindAsync(id);

            if (historicoProposta == null)
            {
                return NotFound();
            }

            return Ok(historicoProposta);
        }

        // PUT: api/HistoricoPropostas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistoricoProposta([FromRoute] int id, [FromBody] HistoricoProposta historicoProposta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != historicoProposta.Id)
            {
                return BadRequest();
            }

            _context.Entry(historicoProposta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistoricoPropostaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HistoricoPropostas
        [HttpPost]
        public async Task<IActionResult> PostHistoricoProposta([FromBody] HistoricoProposta historicoProposta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.HistoricoProposta.Add(historicoProposta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistoricoProposta", new { id = historicoProposta.Id }, historicoProposta);
        }

        // DELETE: api/HistoricoPropostas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistoricoProposta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var historicoProposta = await _context.HistoricoProposta.FindAsync(id);
            if (historicoProposta == null)
            {
                return NotFound();
            }

            _context.HistoricoProposta.Remove(historicoProposta);
            await _context.SaveChangesAsync();

            return Ok(historicoProposta);
        }

        private bool HistoricoPropostaExists(int id)
        {
            return _context.HistoricoProposta.Any(e => e.Id == id);
        }
    }
}
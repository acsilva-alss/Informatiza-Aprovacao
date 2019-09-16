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
    public class PropostasController : ControllerBase
    {
        private readonly DBSafeWebContext _context;

        public PropostasController(DBSafeWebContext context)
        {
            _context = context;
        }

        // GET: api/Propostas
        [HttpGet]
        public IEnumerable<Proposta> GetProposta()
        {
            return _context.Proposta;
        }

        // GET: api/Propostas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProposta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var proposta = await _context.Proposta.FindAsync(id);

            if (proposta == null)
            {
                return NotFound();
            }

            return Ok(proposta);
        }

        // PUT: api/Propostas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProposta([FromRoute] int id, [FromBody] Proposta proposta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != proposta.Id)
            {
                return BadRequest();
            }

            _context.Entry(proposta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropostaExists(id))
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

        // POST: api/Propostas
        [HttpPost]
        public async Task<IActionResult> PostProposta([FromBody] Proposta proposta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Proposta.Add(proposta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProposta", new { id = proposta.Id }, proposta);
        }

        // DELETE: api/Propostas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProposta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var proposta = await _context.Proposta.FindAsync(id);
            if (proposta == null)
            {
                return NotFound();
            }

            _context.Proposta.Remove(proposta);
            await _context.SaveChangesAsync();

            return Ok(proposta);
        }

        private bool PropostaExists(int id)
        {
            return _context.Proposta.Any(e => e.Id == id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiscymedic.Models;

namespace apiscymedic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class clientesController : ControllerBase
    {
        private readonly apiscymedicContext _context;

        public clientesController(apiscymedicContext context)
        {
            _context = context;
        }

        // GET: api/clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<cliente>>> Getclientes()
        {
            return await _context.cliente.ToListAsync();
        }

        // GET: api/clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<cliente>> Getcliente(int id)
        {
            var cliente = await _context.cliente.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // PUT: api/clientes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcliente(int id, cliente cliente)
        {
            if (id != cliente.id)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!clienteExists(id))
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

        // POST: api/clientes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<cliente>> Postcliente(cliente cliente)
        {
            _context.cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcliente", new { id = cliente.id }, cliente);
        }

        // DELETE: api/clientes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<cliente>> Deletecliente(int id)
        {
            var cliente = await _context.cliente.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return cliente;
        }

        private bool clienteExists(int id)
        {
            return _context.cliente.Any(e => e.id == id);
        }
    }
}

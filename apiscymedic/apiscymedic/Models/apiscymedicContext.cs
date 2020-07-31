using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiscymedic.Models
{
    public class apiscymedicContext:DbContext
    {
        public apiscymedicContext(DbContextOptions<apiscymedicContext> options) : base(options)
        {

        }
        public DbSet<cliente> cliente { get; set; }
    }
}

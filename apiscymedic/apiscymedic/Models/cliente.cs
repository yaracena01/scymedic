using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiscymedic.Models
{
    public class cliente
    {
        [Key]
        public int id { get; set; }
        [Required]     
        public  string nombre { get; set; }
    }
}

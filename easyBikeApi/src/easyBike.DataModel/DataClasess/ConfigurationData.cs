using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class ConfigurationData
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime RegisteredDate { get; set; }
    }
}

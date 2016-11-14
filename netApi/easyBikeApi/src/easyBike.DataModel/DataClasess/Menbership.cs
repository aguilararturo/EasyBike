using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel
{
    public class Menbership
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MenbershipType Type { get; set; }
    }
}

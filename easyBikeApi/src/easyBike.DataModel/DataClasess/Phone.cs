using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class Phone
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public User User { get; set; }
    }
}

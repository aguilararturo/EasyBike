using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class BikeRegister
    {
        public int Id { get; set; }
        public Bike Bike { get; set; }
        public DateTime Date { get; set; }
        public User User { get; set; }
        public bool Active { get; set; }
    }
}

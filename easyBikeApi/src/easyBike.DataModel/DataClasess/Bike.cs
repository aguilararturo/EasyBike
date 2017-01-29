using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class Bike
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Plate { get; set; }
        public string Model { get; set; }
        public Client Driver { get; set; }
        public User User { get; set; }
    }
}

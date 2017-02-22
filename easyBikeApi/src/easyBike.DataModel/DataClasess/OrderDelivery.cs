using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class OrderDelivery
    {
        public int Id { get; set; }
        public Address Address { get; set; }
        public string Note { get; set; }
        public string Identifier { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class PriceProduct
    {
        public int Id { get; set; }
        public DateTime RegisteredDate { get; set; }
        public Product Product { get; set; }
        public decimal Price { get; set; }
    }
}

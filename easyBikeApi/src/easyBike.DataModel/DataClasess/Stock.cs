using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class Stock
    {
        public int Id { get; set; }        
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}

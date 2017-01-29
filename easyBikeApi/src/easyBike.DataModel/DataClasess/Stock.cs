using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class Stock
    {
        public int Id { get; set; }
        [ForeignKey("StockCode")]
        public string StockCode { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime RegisterDate { get; set; }
        public int OrderId { get; set; }
        public int OrderProductId{ get; set; }
        public decimal Cost { get; set; }
        public User User { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Client Client{ get; set; }
        public List<OrderProduct> Products { get; set; }
        public Address DeliveryAddress { get; set; }
    }
}

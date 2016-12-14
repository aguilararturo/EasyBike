using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Client Client{ get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public Address DeliveryAddress { get; set; }
        public int StateId { get; set; }
        public OrderState state { get; set; }
        public Bike Bike { get; set; }
    }
}

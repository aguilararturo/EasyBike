using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace easyBike.DataModel.DataClasess
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Client Client{ get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public Address DeliveryAddress { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderState state { get; set; }
        public Bike Bike { get; set; }
        public decimal Total { get; set; }
        public DateTime DeliverDate { get; set; }
        public DateTime InTransitDate { get; set; }
        public decimal BikePrice { get; set; }
        public User User { get; set; }
    }
}

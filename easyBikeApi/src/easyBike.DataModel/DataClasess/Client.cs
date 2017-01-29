using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{ 
    public class Client
    {
        public int Id { get; set; }
        public int Nit { get; set; }
        public List<Phone> Phones { get; set; }
        public string Name { get; set; }        
        public List<Address> Addresses { get; set; }
        public string ImageUrl { get; set; }
        public User User { get; set; }
    }
}

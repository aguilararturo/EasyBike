using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel
{
    public class Client
    {
        public int Id { get; set; }
        public List<int> Phones { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public List<Address> Address { get; set; }
    }
}

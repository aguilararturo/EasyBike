using System.Collections.Generic;

namespace easyBike.DataModel
{
    public class Restorant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public List<int> Phones { get; set; }
    }
}
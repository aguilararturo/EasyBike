using System.Collections.Generic;

namespace easyBike.DataModel.DataClasess
{
    public class Restorant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public List<Phone> Phones { get; set; }
        public string ImageUrl { get; set; }
    }
}
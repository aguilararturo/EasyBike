using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class ElacUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Passport { get; set; }
        public string Country { get; set; }
        public string Alergies { get; set; }
        public string Obsevations { get; set; }
        public string Shirt { get; set; }
        public string Type { get; set; }
        public string ArriveCompany { get; set; }
        public string DepartureCompany { get; set; }
        public string Arrivefligth { get; set; }
        public string Departurefligth { get; set; }
        public DateTime ArriveDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime RegDate { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string BarCode { get; set; }
        public ProductCategory Category { get; set; }
        public Restorant Restorant{ get; set; }
        

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class Product
    {
        public int Id { get; set; }
        public string CodSubfix { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string BarCode { get; set; }
        public string Description { get; set; }
        public ProductCategory Category { get; set; }
        public Business Restorant { get; set; }        
    }
}

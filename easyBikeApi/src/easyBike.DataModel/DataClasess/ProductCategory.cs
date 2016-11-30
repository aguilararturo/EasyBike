using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public bool Default { get; set; }
        public ICollection<BusinessCategory> BusinesCategories { get; set; }
    }
}

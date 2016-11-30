using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.DataModel.DataClasess
{
    public class BusinessCategory
    {
        public int ProductCategoryId { get; set; }        
        public ProductCategory ProductCategory { get; set; }

        public int BussinessId { get; set; }
        public Business Bussiness { get; set; }
    }
}

using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi.Reports
{
    public class UserOrdersCount
    {
        public Client Client { get; set; }
        public int NumberOrder { get; set; }
    }
}

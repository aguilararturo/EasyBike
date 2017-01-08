using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi.Reports
{
    public class UserOrder
    {
        public Client Client { get; set; }
        public int OrderNumber { get; set; }
        public decimal Total { get; set; }
    }
}

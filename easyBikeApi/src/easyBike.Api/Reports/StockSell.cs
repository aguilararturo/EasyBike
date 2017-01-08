using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi.Reports
{
    public class StockSell
    {
        public Product Product { get; set; }
        public int Cantidad { get; set; }
        public decimal TotalVendido { get; set; }
    }
}

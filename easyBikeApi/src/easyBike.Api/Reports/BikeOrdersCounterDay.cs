using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi.Reports
{
    public class BikeOrdersCounterDay
    {
        public Bike Bike{ get; set; }
        public IEnumerable<DayCount> Dates { get; set; }
        public int NumberOrder
        {
            get
            {
                var total = 0;
                foreach (var item in Dates)
                {
                    total += item.Count;
                }
                return total;
            }
        }
    }
}

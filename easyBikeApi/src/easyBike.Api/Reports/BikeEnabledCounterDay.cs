using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi.Reports
{
    public class BikeEnabledCounterDay
    {
        public DateTime Date { get; set; }
        public decimal PriceTotal { get; set; }
        public int Count { get; set; }
    }
}

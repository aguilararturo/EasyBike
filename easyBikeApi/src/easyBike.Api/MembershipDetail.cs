using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi
{
    public class MembershipDetail
    {
        public Membership Membership { get; set; }
        public int OrdersCount { get; set; }
        public decimal Total { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
    }
}

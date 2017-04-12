using easyBike.DataModel.DataClasess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.Api.Reports
{
    public class ClientAddressMostUsed
    {
        public Client Client { get; set; }

        public List<Address> LastUsed { get; set; }
    }
}

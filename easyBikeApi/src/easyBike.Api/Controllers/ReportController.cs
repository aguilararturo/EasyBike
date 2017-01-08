using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBikeApi.Reports;
using easyBike.DataModel;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBikeApi.Controllers
{
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        // GET: api/values
        [HttpGet("GetTopSellBike/{initDate}/{endDate}")]
        public IEnumerable<BikeOrdersCounter> GetTopSellBike(string initDate, string endDate)
        {
            var init = DateTime.Parse(initDate);
            var end = DateTime.Parse(endDate);
            IEnumerable<BikeOrdersCounter> data = null;
            using (var db = new EasyBikeDataContext())
            {               
                    data = db.Orders
                    .Where(o=>o.Date.Date>= init.Date && o.Date.Date<=end.Date)
                    .GroupBy(s => s.Bike.Id)                    
                    .Select(s => new BikeOrdersCounter
                    {
                        Bike = s.Select(pro => pro.Bike).FirstOrDefault(),
                        NumberOrder = s.Count()
                    }).ToList();
            }

            return data;
        }       
    }
}

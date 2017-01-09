﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBikeApi.Reports;
using easyBike.DataModel;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

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
            var init = DateTime.ParseExact(initDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            IEnumerable<BikeOrdersCounter> data = null;
            using (var db = new EasyBikeDataContext())
            {               
                    data = db.Orders                    
                    .Where(o=>o.Date.Date>= init.Date && o.Date.Date<=end.Date)
                    .Include(o => o.Bike)
                    .ThenInclude(b => b.Driver)
                    .GroupBy(s => s.Bike)                    
                    .Select(s => new BikeOrdersCounter
                    {
                        Bike = s.Key,
                        NumberOrder = s.Count()
                    }).ToList();
            }

            return data;
        }
        [HttpGet("GetTopSellBikePerDay/{initDate}/{endDate}")]
        public IEnumerable<BikeOrdersCounterDay> GetTopSellBikePerDay(string initDate, string endDate)
        {
            var init = DateTime.ParseExact(initDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            IEnumerable<BikeOrdersCounterDay> data = null;
            using (var db = new EasyBikeDataContext())
            {
                data = db.Orders
                .Where(o => o.Date.Date >= init.Date && o.Date.Date <= end.Date)
                .Include(o => o.Bike)
                .ThenInclude(b => b.Driver)
                .GroupBy(s => s.Bike)
                .Select(s => new BikeOrdersCounterDay
                {
                    Bike = s.Key,
                    Dates = s.GroupBy(d => d.Date.Date).Select(i => new DayCount
                    {
                        Day = i.Key,
                        Count = i.Count()
                    }
                        )

                }).ToList();
            }
            return data;
        }

        [HttpGet("GetTopSellProduct/{initDate}/{endDate}")]
        public IEnumerable<BikeOrdersCounterDay> GetTopSellProduct(string initDate, string endDate)
        {
            var init = DateTime.ParseExact(initDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            IEnumerable<BikeOrdersCounterDay> data = null;
            using (var db = new EasyBikeDataContext())
            {
                data = db.Orders
                .Where(o => o.Date.Date >= init.Date && o.Date.Date <= end.Date)
                .Include(o => o.Client)                
                .GroupBy(s => s.Bike)
                .Select(s => new BikeOrdersCounterDay
                {
                    Bike = s.Key,
                    Dates = s.GroupBy(d => d.Date.Date).Select(i => new DayCount
                    {
                        Day = i.Key,
                        Count = i.Count()
                    }
                        )

                }).ToList();
            }
            return data;
        }

        [HttpGet("GetTopOrderUser/{initDate}/{endDate}")]
        public IEnumerable<UserOrdersCount> GetTopOrderUser(string initDate, string endDate)
        {
            var init = DateTime.ParseExact(initDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            IEnumerable<UserOrdersCount> data = null;
            using (var db = new EasyBikeDataContext())
            {
                data = db.Orders
                .Where(o => o.Date.Date >= init.Date && o.Date.Date <= end.Date)
                .Include(o => o.Client)                
                .GroupBy(s => s.Client)
                .Select(s => new UserOrdersCount
                {
                    Client = s.Key,
                    NumberOrder = s.Count()
                }).ToList();
            }

            return data;
        }

        [HttpGet("GetTopOrderUserPerDay/{initDate}/{endDate}")]
        public IEnumerable<UserOrdersCountDay> GetTopOrderUserPerDay(string initDate, string endDate)
        {
            var init = DateTime.ParseExact(initDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "MM-dd-yyyy", CultureInfo.InvariantCulture);
            IEnumerable<UserOrdersCountDay> data = null;
            using (var db = new EasyBikeDataContext())
            {
                data = db.Orders
                .Where(o => o.Date.Date >= init.Date && o.Date.Date <= end.Date)
                .Include(o => o.Client)                
                .GroupBy(s => s.Client)
                .Select(s => new UserOrdersCountDay
                {
                    Client = s.Key,
                    Dates = s.GroupBy(d => d.Date.Date).Select(i => new DayCount
                    {
                        Day = i.Key,
                        Count = i.Count()
                    }
                        )

                }).ToList();
            }
            return data;
        }

    }
}

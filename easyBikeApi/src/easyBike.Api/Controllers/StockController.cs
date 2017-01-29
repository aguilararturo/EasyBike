using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel.DataClasess;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Web.Http;
using System.Net;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class StockController : LocalController
    {
        public StockController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Stock> Get()
        {
            var Data = _db.Stock
                .OrderBy(item => item.Id)
                .ToList();
            return Data;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Stock Get(int id)
        {
            var Data = _db.Stock
                .Where(item => item.Id == id);
            return Data.First();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Stock value)
        {
            _db.Stock.Add(value);
            _db.SaveChanges();
        }

        // POST api/values
        [HttpPost("AddStocks")]
        public void AddStocks([FromBody]IEnumerable<Stock> values)
        {
            foreach (var item in values)
            {
                _db.Entry(item.Product).State = EntityState.Unchanged;
                item.RegisterDate = DateTime.Now;
            }
            _db.Stock.AddRange(values);
            _db.SaveChanges();
        }


        // GET: api/values
        [HttpGet("getStockProductsQuantity")]
        public IEnumerable<Stock> getStockProductsQuantity()
        {
            var configData = _db.Configurations.Where(c => c.Id == ConfigurationsNames.DefaultBusiness.ToString()).FirstOrDefault();

            if (configData == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Default Business not exists", System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.NotFound

                };

                throw new HttpResponseException(response);
            }
            var stock = _db.Stock.GroupBy(s => s.Product.Id)
                .Select(s => new Stock
                {
                    Quantity = s.Sum(item => item.Quantity),
                    Product = s.Select(pro => pro.Product).FirstOrDefault(),
                    DueDate = DateTime.Now,
                    RegisterDate = DateTime.Now
                }).ToList();

            return stock;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Stock value)
        {
            var original = _db.Stock
                .Where(item => item.Id == id).FirstOrDefault();

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.Stock
                .Where(item => item.Id == id);

            _db.Stock.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

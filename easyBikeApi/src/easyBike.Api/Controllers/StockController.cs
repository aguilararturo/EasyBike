using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel.DataClasess;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBikeApi.Controllers
{
    [Route("api/[controller]")]
    public class StockController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Stock> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Stock
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Stock Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Stock
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Stock value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Stock.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Stock value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Stock
                    .Where(item => item.Id == id).FirstOrDefault();

                db.Entry(original).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Stock
                    .Where(item => item.Id == id);

                db.Stock.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

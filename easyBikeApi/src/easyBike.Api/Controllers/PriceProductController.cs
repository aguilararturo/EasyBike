using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;
using easyBike.DataModel.DataClasess;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class PriceProductController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<PriceProduct> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var q = db.PriceProducts.GroupBy(pp => pp.Product)
               .Select(g => g.OrderByDescending(i => i.RegisteredDate).First())
               .ToList();
                                
                return q;
            }
        }

        // GET api/values/5
        [HttpGet("{ProductId}")]
        public PriceProduct Get(int ProductId)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.PriceProducts
                    .Where(item => item.Product.Id == ProductId)
                    .OrderByDescending(i => i.RegisteredDate)
                    .First();
                ;
                return Data;
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]PriceProduct value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Entry(value.Product).State = EntityState.Modified;
                db.PriceProducts.Add(value);
                db.SaveChanges();
            }
        }

        // POST api/values
        [HttpPost("addPriceGroup")]
        public void addPriceGroup([FromBody]PriceProduct[] values)
        {
            foreach (var value in values)
            {
                if (value.Price > 0)
                {
                    using (var db = new EasyBikeDataContext())
                    {
                        db.Entry(value.Product).State = EntityState.Unchanged;
                        value.RegisteredDate = DateTime.Now;
                        db.PriceProducts.Add(value);
                        db.SaveChanges();
                    }
                }
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]PriceProduct value)
        {
            using (var db = new EasyBikeDataContext())
            {                
                db.Entry(value).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.PriceProducts
                    .Where(item => item.Id == id);

                db.PriceProducts.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

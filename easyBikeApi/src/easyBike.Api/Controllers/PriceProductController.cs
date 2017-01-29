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
    public class PriceProductController : LocalController
    {
        public PriceProductController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<PriceProduct> Get()
        {
            var q = _db.PriceProducts.GroupBy(pp => pp.Product)
           .Select(g => g.OrderByDescending(i => i.RegisteredDate).First())
           .ToList();

            return q;
        }

        // GET api/values/5
        [HttpGet("{ProductId}")]
        public PriceProduct Get(int ProductId)
        {
            var Data = _db.PriceProducts
                .Where(item => item.Product.Id == ProductId)
                .OrderByDescending(i => i.RegisteredDate)
                .First();
            ;
            return Data;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]PriceProduct value)
        {
            _db.Entry(value.Product).State = EntityState.Modified;
            _db.PriceProducts.Add(value);
            _db.SaveChanges();
        }

        // POST api/values
        [HttpPost("addPriceGroup")]
        public void addPriceGroup([FromBody]PriceProduct[] values)
        {
            foreach (var value in values)
            {
                if (value.Price > 0)
                {
                    _db.Entry(value.Product).State = EntityState.Unchanged;
                    value.RegisteredDate = DateTime.Now;
                    _db.PriceProducts.Add(value);
                    _db.SaveChanges();
                }
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]PriceProduct value)
        {
            _db.Entry(value).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.PriceProducts
                .Where(item => item.Id == id);

            _db.PriceProducts.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

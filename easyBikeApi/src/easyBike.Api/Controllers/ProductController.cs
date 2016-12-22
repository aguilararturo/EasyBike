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
    public class ProductController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Products
                    .Include(product => product.Category)                    
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }
        // GET: api/values
        [HttpGet("getByBussiness")]
        public IEnumerable<Product> getByBussiness([FromQuery] Business business)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Products
                    .Where(p => p.Business.Id == business.Id)
                    .Include(product => product.Category)
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Products                    
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // GET api/values/5
        [HttpGet("GetByCategory")]
        public ICollection< Product> GetByCategory([FromQuery] int businessId, [FromQuery] int categoryId)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Products
                    .Where(item => item.Business.Id == businessId && item.Category.Id == categoryId);
                return Data.ToList();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Product value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Entry(value.Business).State = EntityState.Unchanged;
                db.Entry(value.Category).State = EntityState.Unchanged;
                db.Products.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Product value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Products
                    .Where(item => item.Id == id).FirstOrDefault();

                original.BarCode = value.BarCode;
                original.Category = value.Category;
                original.Name = value.Name;
                original.Business = value.Business;
                original.ImageUrl = value.ImageUrl;
                
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
                var Data = db.Products
                    .Where(item => item.Id == id);

                db.Products.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

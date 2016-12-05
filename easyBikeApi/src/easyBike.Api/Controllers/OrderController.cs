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
    public class OrderController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Order> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Orders               
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Order Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Orders
                    .Include(item => item.Client)
                    .Include(item => item.DeliveryAddress)
                    .Include(item => item.OrderProducts)
                    .ThenInclude(op => op.Product)                    
                    .ThenInclude(p => p.Business)                    
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Order value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Orders.Add(value);
                db.SaveChanges();
                return Ok(value);
            }

            return NotFound();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Order value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Orders
                    .Where(item => item.Id == id).FirstOrDefault();

                original.OrderProducts = value.OrderProducts;
                original.DeliveryAddress = value.DeliveryAddress;
                original.Date = value.Date;
                original.Client = value.Client;                

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
                var Data = db.Orders
                    .Where(item => item.Id == id);

                db.Orders.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}
}

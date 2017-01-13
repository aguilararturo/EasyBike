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

        // GET: api/values
        [HttpGet("GetTodayInTransit")]
        public IEnumerable<Order> GetTodayInTransit()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Orders
                    .Where(o => (o.state == OrderState.Transit || o.state == OrderState.Waiting) && o.Date.Date == DateTime.Today)
                    .Include(o => o.Client)
                    .Include(o => o.DeliveryAddress)
                    .Include(o => o.Bike)
                    .ThenInclude(b => b.Driver)
                    .OrderByDescending(o => o.Date)
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
                if (value.Client.Id > 0)
                {
                    db.Entry(value.Client).State = EntityState.Modified;
                }

                decimal orderTotal = 0;

                var configData = db.Configurations.Where(c => c.Id == ConfigurationsNames.DefaultBusiness.ToString()).FirstOrDefault();

                foreach (var op in value.OrderProducts)
                {
                    op.Price = op.Product.Price;
                    op.Total = op.Product.Price * op.Quantity;
                    orderTotal += op.Total;
                    db.Entry(op.Product).State = EntityState.Unchanged;

                    if (configData != null)
                    {
                        if (configData.Name == op.Product.Business.Name)
                        {
                            var stock = new Stock()
                            {
                                Quantity = op.Quantity * -1,
                                Product = op.Product,
                                RegisterDate = DateTime.Now,
                                OrderId = value.Id,
                                OrderProductId = op.Id
                            };
                            db.Entry(stock.Product).State = EntityState.Unchanged;
                            db.Stock.Add(stock);
                        }
                    }
                }

                if (value.DeliveryAddress.Id > 0)
                {
                    db.Entry(value.DeliveryAddress).State = EntityState.Modified;
                }

                if (value.Bike.Id > 0)
                {
                    db.Entry(value.Bike).State = EntityState.Unchanged;
                    value.state = OrderState.Transit;
                }
                else
                {
                    value.Bike = null;
                    value.state = OrderState.Waiting;
                }


                value.Date = DateTime.Now;
                value.Total = orderTotal;
                db.Orders.Add(value);
                db.SaveChanges();
                return Ok(value);
            }

            return NotFound();
        }

        // POST api/values
        [HttpPost("DeliverOrder")]
        public IActionResult DeliverOrder([FromBody] Order value)
        {
            return changeOrderState(value, OrderState.Delivered);
        }

        // POST api/values
        [HttpPost("SetBike")]
        public IActionResult SetBike([FromBody] Order value)
        {
            return changeOrderState(value, OrderState.Transit);
        }

        private IActionResult changeOrderState(Order value, OrderState state)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Entry(value.Client).State = EntityState.Unchanged;

                if (value.OrderProducts != null)
                {
                    foreach (var op in value.OrderProducts)
                    {
                        db.Entry(op.Product).State = EntityState.Unchanged;
                    }
                }

                db.Entry(value.DeliveryAddress).State = EntityState.Unchanged;

                db.Entry(value.Bike).State = EntityState.Unchanged;

                value.state = state;

                switch (state)
                {
                    case OrderState.Delivered:
                        value.DeliverDate = DateTime.Now;
                        break;
                    case OrderState.Transit:
                        value.InTrantirDate = DateTime.Now;
                        break;
                    case OrderState.Waiting:
                        break;
                    case OrderState.Sended:
                        break;
                    default:
                        break;
                }


                db.Entry(value).State = EntityState.Modified;

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


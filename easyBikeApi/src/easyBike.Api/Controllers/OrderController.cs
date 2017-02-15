using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel.DataClasess;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;
using System.Web.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : LocalController
    {
        public OrderController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get([FromUri]int page, [FromUri]int count)
        {
            var Data = _db.Orders
                //.Skip((page - 1) * count)
                //.Take(count)
                .Where(o => o.state == OrderState.Delivered)
                .Include(o => o.Client)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.Bike)
                .ThenInclude(b => b.Driver)
                .OrderByDescending(o => o.Date);
            return Ok(Data.ToList());
        }

        // GET: api/values
        [HttpGet("GetTodayInTransit")]
        public IActionResult GetTodayInTransit()
        {
            var Data = _db.Orders
                .Where(o => (o.state == OrderState.Transit || o.state == OrderState.Waiting) && o.Date.Date == DateTime.Today)
                .Include(o => o.Client)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.Bike)
                .ThenInclude(b => b.Driver)
                .OrderByDescending(o => o.Date)
                .ToList();
            return Ok(Data);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get([FromUri]int id)
        {
            var Data = _db.Orders
                .Include(o => o.Client)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.Bike)
                .ThenInclude(b => b.Driver)
                .Include(item => item.OrderProducts)
                .ThenInclude(op => op.Product)
                .ThenInclude(p => p.Business)
                .Where(item => item.Id == id);
            return Ok(Data.First());
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Order value)
        {
            if (value.Client.Id > 0)
            {
                _db.Entry(value.Client).State = EntityState.Modified;
            }

            decimal orderTotal = 0;

            var configData = _db.Configurations.Where(c => c.Id == ConfigurationsNames.DefaultBusiness.ToString()).FirstOrDefault();

            foreach (var op in value.OrderProducts)
            {
                op.Price = op.Product.Price;
                op.Total = op.Product.Price * op.Quantity;
                orderTotal += op.Total;
                _db.Entry(op.Product).State = EntityState.Unchanged;

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
                        _db.Entry(stock.Product).State = EntityState.Unchanged;
                        _db.Stock.Add(stock);
                    }
                }
            }

            if (value.DeliveryAddress.Id > 0)
            {
                _db.Entry(value.DeliveryAddress).State = EntityState.Modified;
            }

            if (value.Bike.Id > 0)
            {
                _db.Entry(value.Bike).State = EntityState.Unchanged;
                value.state = OrderState.Transit;
            }
            else
            {
                value.Bike = null;
                value.state = OrderState.Waiting;
            }

            if(value.OrderDelivery != null)
            {
                value.OrderType = OrderType.DeliveryOrder;
            }else
            {
                value.OrderType = OrderType.ProductOrder;
            }


            value.Date = DateTime.Now;
            value.Total = orderTotal;
            _db.Orders.Add(value);
            _db.SaveChanges();
            return Ok(value);
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
            _db.Entry(value.Client).State = EntityState.Unchanged;

            if (value.OrderProducts != null)
            {
                foreach (var op in value.OrderProducts)
                {
                    _db.Entry(op.Product).State = EntityState.Unchanged;
                }
            }

            _db.Entry(value.DeliveryAddress).State = EntityState.Unchanged;

            _db.Entry(value.Bike).State = EntityState.Unchanged;

            value.state = state;

            switch (state)
            {
                case OrderState.Delivered:
                    value.DeliverDate = DateTime.Now;
                    break;
                case OrderState.Transit:
                    value.InTransitDate = DateTime.Now;
                    break;
                case OrderState.Waiting:
                    break;
                case OrderState.Sended:
                    break;
                default:
                    break;
            }


            _db.Entry(value).State = EntityState.Modified;

            _db.SaveChanges();
            return Ok(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Order value)
        {
            var original = _db.Orders
                .Where(item => item.Id == id).FirstOrDefault();

            original.OrderProducts = value.OrderProducts;
            original.DeliveryAddress = value.DeliveryAddress;
            original.Date = value.Date;
            original.Client = value.Client;

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.Orders
                .Where(item => item.Id == id);

            _db.Orders.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}


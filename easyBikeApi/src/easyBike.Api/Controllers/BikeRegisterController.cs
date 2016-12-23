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
    public class BikeRegisterController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<BikeRegister> Get(DateTime date)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.RegistredBikes
                    .Where(b => b.Date == date)
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET: api/values
        [HttpGet("GetTodayAvaliable")]
        public IEnumerable<BikeRegister> GetTodayAvaliable()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.RegistredBikes
                    .Where(b => b.Date.Date == DateTime.Today && b.Active)
                   .Include(b => b.Bike)
                   .ThenInclude(b => b.Driver)
                    .OrderByDescending(item => item.Date)                    
                    .ToList();

                return Data;
            }
        }

        // GET: api/values
        [HttpGet("GetTodayAvaliableWithouOrder")]
        public IEnumerable<BikeRegister> GetTodayAvaliableWithouOrder()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.RegistredBikes
                    .Where(b => !db.Orders.Where(o => o.state == OrderState.Transit).Select(o => o.Bike)                    
                    .Contains(b.Bike))
                    .Where(b => b.Date.Date == DateTime.Today && b.Active)                                   
                   .Include(b => b.Bike)
                   .ThenInclude(b => b.Driver)
                    .OrderByDescending(item => item.Date)
                    .ToList();

                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public BikeRegister Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.RegistredBikes
                    .Where(b => b.Id == id)
                    .OrderBy(item => item.Id);                    
                return Data.FirstOrDefault();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]BikeRegister value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var data = db.RegistredBikes
                    .Where(b => b.Date.Date == DateTime.Today
                    && b.Active
                    && b.Bike.Plate == value.Bike.Plate).FirstOrDefault();
                if (null == data)
                {
                    db.Entry(value.Bike).State = EntityState.Unchanged;
                    value.Date = DateTime.Now;
                    value.Active = true;
                    db.RegistredBikes.Add(value);
                    db.SaveChanges();
                }
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]BikeRegister value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.RegistredBikes
                    .Where(item => item.Id == id).FirstOrDefault();

                original.User = value.User;
                original.Bike = value.Bike;
                original.Date = value.Date;
                original.Active = value.Active;

                if (value.User.Id <= 0)
                {
                    db.Entry(value.User).State = EntityState.Unchanged;
                }
                
                db.Entry(original).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("Disable")]
        public void Disable([FromBody]Bike value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var bikes = db.RegistredBikes
                    .Where(b => b.Date.Date == DateTime.Today && b.Bike.Plate == value.Plate)
                //    .Include(b => b.User)
                 //   .Include(b => b.Bike)
                    .ToList();
                foreach (var original in bikes)
                {
                    original.Active = false;

                    //if (original.User.Id <= 0)
                    //{
                    //    db.Entry(original.User).State = EntityState.Unchanged;
                    //}

                    //db.Entry(original.Bike).State = EntityState.Unchanged;
                    db.Entry(original).State = EntityState.Modified;
                }
                db.SaveChanges();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.RegistredBikes
                    .Where(item => item.Id == id);

                db.RegistredBikes.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

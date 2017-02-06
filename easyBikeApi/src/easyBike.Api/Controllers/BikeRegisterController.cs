using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel.DataClasess;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class BikeRegisterController : LocalController
    {
        public BikeRegisterController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<BikeRegister> Get(DateTime date)
        {
            var Data = _db.RegistredBikes
                .Where(b => b.Date == date)
                .OrderBy(item => item.Id)
                .ToList();
            return Data;
        }

        // GET: api/values
        [HttpGet("GetTodayAvaliable")]
        public IEnumerable<BikeRegister> GetTodayAvaliable()
        {
            var Data = _db.RegistredBikes
                .Where(b => b.Date.Date == DateTime.Today.Date && b.Active)
               .Include(b => b.Bike)
               .ThenInclude(b => b.Driver)
                .OrderByDescending(item => item.Date)
                .ToList();

            return Data;
        }

        // GET: api/values
        [HttpGet("GetTodayAvaliableWithouOrder")]
        public IEnumerable<BikeRegister> GetTodayAvaliableWithouOrder()
        {
            var Data = _db.RegistredBikes
                .Where(b => !_db.Orders.Where(o => o.state == OrderState.Transit).Select(o => o.Bike)
                .Contains(b.Bike))
                .Where(b => b.Date.Date == DateTime.Today && b.Active)
               .Include(b => b.Bike)
               .ThenInclude(b => b.Driver)
                .OrderByDescending(item => item.Date)
                .ToList();

            return Data;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public BikeRegister Get(int id)
        {
            var Data = _db.RegistredBikes
                .Where(b => b.Id == id)
                .OrderBy(item => item.Id);
            return Data.FirstOrDefault();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]BikeRegister value)
        {
            var data = _db.RegistredBikes
                .Where(b => b.Date.Date == DateTime.Today
                && b.Active
                && b.Bike.Id == value.Bike.Id).FirstOrDefault();
            if (null == data)
            {
                _db.Entry(value.Bike).State = EntityState.Unchanged;
                _db.Entry(value.Bike.Driver).State = EntityState.Unchanged;                
                _db.Entry(value.User).State = EntityState.Unchanged;
                value.Date = DateTime.Now;
                value.Active = true;
                _db.RegistredBikes.Add(value);
                _db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]BikeRegister value)
        {
            var original = _db.RegistredBikes
                .Where(item => item.Id == id).FirstOrDefault();

            original.User = value.User;
            original.Bike = value.Bike;
            original.Date = value.Date;
            original.Active = value.Active;

            if (!string.IsNullOrEmpty(value.User.Nick))
            {
                _db.Entry(value.User).State = EntityState.Unchanged;
            }

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("Disable")]
        public void Disable([FromBody]Bike value)
        {
            var bikes = _db.RegistredBikes
                .Where(b => b.Date.Date == DateTime.Today && b.Bike.Plate == value.Plate)
                //    .Include(b => b.User)
                //   .Include(b => b.Bike)
                .ToList();
            foreach (var original in bikes)
            {
                original.Active = false;

                //if (original.User.Id <= 0)
                //{
                //    _db.Entry(original.User).State = EntityState.Unchanged;
                //}

                //_db.Entry(original.Bike).State = EntityState.Unchanged;
                _db.Entry(original).State = EntityState.Modified;
            }
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.RegistredBikes
                .Where(item => item.Id == id);

            _db.RegistredBikes.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

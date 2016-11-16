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
    public class BikeController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Bike> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Bikes
                    .Include(bike => bike.Driver)
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Bike Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Bikes
                    .Include(bike => bike.Driver)
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Bike value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Bikes.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Bike value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Bikes
                    .Where(item => item.Id == id).FirstOrDefault();

                original.Code = value.Code;
                original.Driver = value.Driver;
                original.Model = value.Model;
                original.Plate = value.Plate;
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
                var Data = db.Bikes
                    .Where(item => item.Id == id);

                db.Bikes.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

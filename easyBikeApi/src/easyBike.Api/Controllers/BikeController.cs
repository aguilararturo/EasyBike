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
    public class BikeController : LocalController
    {
        public BikeController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Bike> Get()
        {

                var Data = _db.Bikes
                    .Include(bike => bike.Driver)
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Bike Get(int id)
        {
   
                var Data = _db.Bikes
                    .Include(bike => bike.Driver)
                    .Where(item => item.Id == id);
                return Data.First();
            
        }

        // GET api/values/5
        [HttpGet("/api/validateCode/{code}")]
        public bool ValidateCode(string code)
        {
            var exist = _db.Bikes.Any(o => o.Code == code);
            return !exist;
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Bike value)
        {
            if (!_db.Bikes.Any(o => o.Code == value.Code))
            {
                _db.Bikes.Add(value);
                _db.SaveChanges();
                return Ok();
            } else
            {
                return StatusCode(409, "El codigo de la moto ya existe");
            }
            
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Bike value)
        {

                var original = _db.Bikes
                    .Where(item => item.Id == id).FirstOrDefault();

                original.Code = value.Code;
                original.Driver = value.Driver;
                original.Model = value.Model;
                original.Plate = value.Plate;
                _db.Entry(original).State = EntityState.Modified;
                _db.SaveChanges();
            
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

                var Data = _db.Bikes
                    .Where(item => item.Id == id);

                _db.Bikes.Remove(Data.First());
                _db.SaveChanges();
            
        }
    }
}

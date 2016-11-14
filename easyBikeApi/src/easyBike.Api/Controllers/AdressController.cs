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
    public class addressesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Address> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Adresses
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Address Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Adresses
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Address value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Adresses.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Address value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Adresses
                    .Where(item => item.Id == id).FirstOrDefault();

                original.Location = value.Location;
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
                var Data = db.Adresses
                    .Where(item => item.Id == id);

                db.Adresses.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

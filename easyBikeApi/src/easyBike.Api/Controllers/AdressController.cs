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
    public class AddressesController : LocalController
    {
        public AddressesController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Address> Get()
        {
            var Data = _db.Adresses
                .OrderBy(item => item.Id)
                .ToList();
            return Data;

        }
        
        [HttpGet("getSearchable")]
        public IEnumerable<Address> getSearchable()
        {
            var Data = _db.Adresses;
                
            return Data.ToArray();

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Address Get(int id)
        {

            var Data = _db.Adresses
                .Where(item => item.Id == id);
            return Data.First();

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Address value)
        {

            _db.Adresses.Add(value);
            _db.SaveChanges();

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Address value)
        {

            var original = _db.Adresses
                .Where(item => item.Id == id).FirstOrDefault();

            original.Location = value.Location;
            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

            var Data = _db.Adresses
                .Where(item => item.Id == id);

            _db.Adresses.Remove(Data.First());
            _db.SaveChanges();

        }
    }
}

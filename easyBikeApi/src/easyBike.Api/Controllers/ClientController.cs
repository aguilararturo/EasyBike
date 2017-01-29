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
    public class ClientController : LocalController
    {
        public ClientController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Client> Get()
        {
            var data = _db.Clients.Where(c => !_db.Bikes.Select(b => b.Driver).Contains(c))
                .Include(client => client.Addresses)
                .Include(Client => Client.Phones)
                .OrderBy(item => item.Id)
                .ToList();
            return data;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Client Get(int id)
        {
            var Data = _db.Clients
                .Where(item => item.Id == id);
            return Data.First();
        }

        // GET api/values/5
        [HttpGet("GetByPhone/{phoneNumber}")]
        public Client GetByPhone(int phoneNumber)
        {
            var data = _db.Clients
                .Include(client => client.Addresses)
                .Include(Client => Client.Phones)
                .Where(item => item.Phones.Any(phone => phone.Number == phoneNumber));
            return data.FirstOrDefault();
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Client value)
        {
            _db.Clients.Add(value);
            _db.SaveChanges();
            return Ok(value);

            return NotFound();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Client value)
        {
            var original = _db.Clients
                .Where(item => item.Id == id).FirstOrDefault();
            original.Name = value.Name;
            original.Phones = value.Phones;
            original.Addresses = value.Addresses;

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.Clients
                .Where(item => item.Id == id);

            _db.Clients.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

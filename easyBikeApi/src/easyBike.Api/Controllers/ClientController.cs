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
    public class ClientController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Client> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Clients
                    .Include(client => client.Addresses)
                    .Include(Client => Client.Phones)
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Client Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Clients
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // GET api/values/5
        [HttpGet("GetByPhone/{phoneNumber}")]
        public Client GetByPhone(int phoneNumber)
        {               
            using (var db = new EasyBikeDataContext())
            {
                var phoneData = db.Phones.Where(item => item.Number == phoneNumber);
                
                var data = db.Clients
                    .Include(client => client.Addresses)
                    .Include(Client => Client.Phones)
                    .Where(item => item.Phones.Any(phone=> phone.Number == phoneNumber));
                return data.FirstOrDefault();
            }
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Client value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Clients.Add(value);
                db.SaveChanges();
                return Ok(value);
            }

            return NotFound();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Client value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Clients
                    .Where(item => item.Id == id).FirstOrDefault();                
                original.Name = value.Name;
                original.Phones = value.Phones;
                original.Addresses = value.Addresses;               
                
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
                var Data = db.Clients
                    .Where(item => item.Id == id);

                db.Clients.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

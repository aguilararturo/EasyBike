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
        [HttpGet("{phone}")]
        public Client GetByPhone(Phone phone)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Clients
                    .Where(item => item.Phones.Contains(phone));
                return Data.FirstOrDefault();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Client value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Clients.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Client value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Clients
                    .Where(item => item.Id == id).FirstOrDefault();
                original.LastName = value.LastName;
                original.Name = value.Name;
                original.Phones = value.Phones;
                original.Address = value.Address;               
                
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

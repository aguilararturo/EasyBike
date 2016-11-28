using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel;
using easyBike.DataModel.DataClasess;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class BusinessController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Business> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Businesses
                    .Include(item => item.Addresses)
                    .Include(item => item.Phones)
                    .Include(item => item.Categories)
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Business Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Businesses
                    .Include(item => item.Addresses)
                    .Include(item => item.Phones)
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Business value)

        {
            using (var db = new EasyBikeDataContext())
            {
                db.Businesses.Add(value);
                db.SaveChanges();
            }
        }

        [HttpPost("AddBusiness/")]
        public void AddBusiness([FromBody]IEnumerable<Business> values)

        {
            foreach (var item in values)
            {
                item.Id = 0;
                foreach (var phone in item.Phones)
                {
                    phone.Id = 0;
                }
                foreach (var address in item.Addresses)
                {
                    address.Id = 0;
                }
            }
            using (var db = new EasyBikeDataContext())
            {
                db. Businesses.AddRange(values);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Business value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Businesses
                    .Where(item => item.Id == id).FirstOrDefault();

                original.Addresses = value.Addresses;
                original.CodSubfix = value.CodSubfix;
                original.Name = value.Name;
                original.ImageUrl = value.ImageUrl;
                original.Phones = value.Phones;
                original.Categories = value.Categories;
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
                var Data = db.Businesses
                    .Where(item => item.Id == id);

                db.Businesses.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

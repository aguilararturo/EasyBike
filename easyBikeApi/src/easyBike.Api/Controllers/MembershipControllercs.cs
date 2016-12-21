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
    public class MembershipControllercs : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Membership> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Memberships
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Membership Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Memberships
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // GET: api/values
        [HttpGet("GetMountly")]
        public MembershipDetail GetMountly(Business business)
        {
            using (var db = new EasyBikeDataContext())
            {
                var prod = db.Products
                    .Where(p => p.Business.Id == business.Id);

                var orders = db.Orders.Where(o => o.OrderProducts.Any(op => prod.Contains(op.Product)));
                   

                return Data;
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Membership value)
        {
            using (var db = new EasyBikeDataContext())
            {
                db.Memberships.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Membership value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Memberships
                    .Where(item => item.Id == id).FirstOrDefault();
                
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
                var Data = db.Memberships
                    .Where(item => item.Id == id);

                db.Memberships.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

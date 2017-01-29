using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel.DataClasess;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;
using easyBikeApi;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class MembershipControllercs : LocalController
    {
        public MembershipControllercs(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Membership> Get()
        {

            var Data = _db.Memberships
                .OrderBy(item => item.Id)
                .ToList();
            return Data;

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Membership Get(int id)
        {

            var Data = _db.Memberships
                .Where(item => item.Id == id);
            return Data.First();

        }

        // GET: api/values
        [HttpGet("GetMountly")]
        public MembershipDetail GetMountly(Business business)
        {
            var prod = _db.Products
                .Where(p => p.Business.Id == business.Id);

            var orders = _db.Orders.Where(o => o.OrderProducts.Any(op => prod.Contains(op.Product)));


            return null;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Membership value)
        {
            _db.Memberships.Add(value);
            _db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Membership value)
        {
            var original = _db.Memberships
                .Where(item => item.Id == id).FirstOrDefault();

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.Memberships
                .Where(item => item.Id == id);

            _db.Memberships.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

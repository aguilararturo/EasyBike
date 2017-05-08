using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel;
using easyBike.DataModel.DataClasess;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class ElacController : LocalController
    {
        public ElacController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<ElacUser> Get()
        {
            var Data = _db.ElacUsers
                .OrderBy(item => item.RegDate)
                .ToList();
            return Data;

        }

        [HttpGet("/GetImages/")]
        public IEnumerable<string> GetImages()
        {
            return new List<string>();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ElacUser Get(int id)
        {        
            var Data = _db.ElacUsers
                .Where(item => item.Id == id);
            return Data.First();

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]ElacUser value)
        {
            value.RegDate = DateTime.Now;
            _db.ElacUsers.Add(value);
            _db.SaveChanges();

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]ElacUser value)
        {
            var original = _db.ElacUsers
                .Where(item => item.Id == id).FirstOrDefault();

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.ElacUsers
                .Where(item => item.Id == id);

            _db.ElacUsers.Remove(Data.First());
            _db.SaveChanges();

        }
    }
}



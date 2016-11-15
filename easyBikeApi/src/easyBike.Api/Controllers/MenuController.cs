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
    public class MenuController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Menu> Get()
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Menus
                    .OrderBy(item => item.Id)
                    .ToList();
                return Data;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Menu Get(int id)
        {
            using (var db = new EasyBikeDataContext())
            {
                var Data = db.Menus
                    .Where(item => item.Id == id);
                return Data.First();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Menu value)

        {
            using (var db = new EasyBikeDataContext())
            {
                db.Menus.Add(value);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Menu value)
        {
            using (var db = new EasyBikeDataContext())
            {
                var original = db.Menus
                    .Where(item => item.Id == id).FirstOrDefault();

                original.Content = value.Content;
                original.href = value.href;
                original.Name = value.Name;
                original.Order = value.Order;
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
                var Data = db.Menus
                    .Where(item => item.Id == id);

                db.Menus.Remove(Data.First());
                db.SaveChanges();
            }
        }
    }
}

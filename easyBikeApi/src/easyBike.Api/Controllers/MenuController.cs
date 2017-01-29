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
    public class MenuController : LocalController
    {
        public MenuController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet("/CreateDB")]
        public IActionResult CreateDB()
        {
            try
            {
                _db.Database.EnsureCreated();
            }
            catch (Exception ex)
            {
                return StatusCode(404, "Error in cloud - GetPLUInfo" + ex.Message);
            }
                            
            return Ok("Data Base created correctly");
        }

        [HttpGet("/CreateConfiguration")]
        public IActionResult CreateConfiguration()
        {
            try
            {
                ConfigurationData cd = new ConfigurationData();
                cd.Name = "MotoTaxBolivia";
                cd.Id = ConfigurationsNames.DefaultBusiness.ToString();
                _db.Configurations.Add(cd);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(404, "Error in cloud - GetPLUInfo" + ex.Message);
            }

            return Ok("Data Base created correctly");
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Menu> Get()
        {
            var Data = _db.Menus
                .OrderBy(item => item.Order)
                .ToList();
            return Data;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Menu Get(int id)
        {
            var Data = _db.Menus
                .Where(item => item.Id == id);
            return Data.First();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Menu value)

        {
            _db.Menus.Add(value);
            _db.SaveChanges();
        }

        [HttpPost("AddMenus/")]
        public void AddMenus([FromBody]IEnumerable<Menu> values)
        {
            foreach (var item in values)
            {
                item.Id = 0;
            }

            _db.Menus.AddRange(values);
            _db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Menu value)
        {
            var original = _db.Menus
                .Where(item => item.Id == id).FirstOrDefault();

            original.Content = value.Content;
            original.href = value.href;
            original.Name = value.Name;
            original.Order = value.Order;
            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.Menus
                .Where(item => item.Id == id);

            _db.Menus.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

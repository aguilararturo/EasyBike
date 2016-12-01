using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel;
using easyBike.DataModel.DataClasess;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using easyBikeApi.Utils;
using System.IO;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class BusinessController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private const string IMG_DIR = "{0}/images/business{1}.png";

        public BusinessController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Business> Get()
        {
            return getBusinesses(false);
        }

        // GET: api/values
        [HttpGet("GetWithCategories")]
        public IEnumerable<Business> GetWithCategories()
        {
            return getBusinesses(true);
        }

        private IEnumerable<Business> getBusinesses(bool withCategories)
        {
            List<Business> Data;
            using (var db = new EasyBikeDataContext())
            {
                Data = db.Businesses
                    .Include(item => item.Addresses)
                    .Include(item => item.Phones)
                    .Include(item => item.BusinesCategories)
                    .ThenInclude(p => p.ProductCategory)
                   .ToList();
            }

            if (withCategories)
            {
                foreach (var row in Data)
                {
                    row.Categories = row.BusinesCategories.Select(bc => bc.ProductCategory).ToList();
                    row.BusinesCategories = null;
                }
            }

            return Data;
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
            var imagePath = string.Format(IMG_DIR,_hostingEnvironment.ContentRootPath, Path.GetRandomFileName());
            var imageString = value.ImageUrl;
            value.ImageUrl = imagePath;

            using (var db = new EasyBikeDataContext())
            {
                value.BusinesCategories = new List<BusinessCategory>();
                foreach (var item in value.Categories)
                {
                    if (item.Id > 0)
                    {                       
                        db.ProductCategories.Attach(item);
                        db.Entry(item).State = EntityState.Unchanged;
                    }
                    var busCat = new BusinessCategory()
                    {
                        Bussiness = value,
                        BussinessId = value.Id,
                        ProductCategory = item,
                        ProductCategoryId = item.Id
                    };
                    value.BusinesCategories.Add(busCat);
                }
                
                db.Businesses.Add(value);
                db.SaveChanges();                               
            }

            ImageUtility.SaveImage(imagePath, imageString);
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

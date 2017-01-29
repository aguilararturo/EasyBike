using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel;
using easyBike.DataModel.DataClasess;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using easyBike.Api;
using easyBikeApi.Utils;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProductCategoryController : LocalController
    {
        public ProductCategoryController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<ProductCategory> Get()
        {
            var Data = _db.ProductCategories
                .OrderBy(item => item.Id)
                .ToList();
            return Data;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ProductCategory Get(int id)
        {
            var Data = _db.ProductCategories
                .Where(item => item.Id == id);
            return Data.First();
        }

        // GET: api/values
        [HttpGet("GetDefaultCategories")]
        public IEnumerable<ProductCategory> GetDefaultCategories()
        {
            var Data = _db.ProductCategories
                .OrderBy(item => item.Id)
                .Where(item => item.Default == true)
                .ToList();
            return Data;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]ProductCategory value)
        {
            var imageString = value.ImageUrl;
            var imageUrls = HttpHelper.getImageName("prodCat");
            value.ImageUrl = imageUrls.imageUrl;

            _db.ProductCategories.Add(value);
            _db.SaveChanges();

            ImageUtility.SaveImage(imageUrls.imageDir, imageString);
        }

        [HttpPost("AddCategories/")]
        public void AddCategories([FromBody]IEnumerable<ProductCategory> values)
        {
            foreach (var item in values)
            {
                item.Id = 0;
                Post(item);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]ProductCategory value)
        {
            var original = _db.ProductCategories
                .Where(item => item.Id == id).FirstOrDefault();

            original.Name = value.Name;
            original.ImageUrl = value.ImageUrl;

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.ProductCategories
                .Where(item => item.Id == id);

            _db.ProductCategories.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

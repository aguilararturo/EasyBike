using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using easyBike.DataModel.DataClasess;
using easyBike.DataModel;
using Microsoft.EntityFrameworkCore;
using System.Web.Http;
using System.Net.Http;
using System.Net;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace easyBike.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : LocalController
    {
        public ProductController(EasyBikeDataContext context) : base(context)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            var Data = _db.Products
                .Include(product => product.Category)
                .OrderBy(item => item.Id)
                .ToList();
            return Data;
        }
        // GET: api/values
        [HttpGet("getByBussiness")]
        public IEnumerable<Product> getByBussiness([FromQuery] Business business)
        {
            var Data = _db.Products
                .Where(p => p.Business.Id == business.Id)
                .Include(product => product.Category)
                .OrderBy(item => item.Id)
                .ToList();
            return Data;
        }

        // GET: api/values
        [HttpGet("getStockProducts")]
        public IEnumerable<Product> getStockProducts()
        {
            var ss = ConfigurationsNames.DefaultBusiness.ToString();
            var configData = _db.Configurations.Where(c => c.Id == ConfigurationsNames.DefaultBusiness.ToString()).FirstOrDefault();

            if (configData == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Default Business not exists", System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.NotFound

                };

                throw new HttpResponseException(response);
            }

            var Data = _db.Products
                .Where(p => p.Business.Name == configData.Name)
                .Include(product => product.Category)
                .OrderBy(item => item.Id)
                .ToList();
            return Data;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            var Data = _db.Products
                .Where(item => item.Id == id);
            return Data.First();
        }

        // GET api/values/5
        [HttpGet("GetByCategory")]
        public ICollection<Product> GetByCategory([FromQuery] int businessId, [FromQuery] int categoryId)
        {
            var Data = _db.Products
                .Where(item => item.Business.Id == businessId && item.Category.Id == categoryId)
                .ToList();

            foreach (var item in Data)
            {
                var priceProduct = _db.PriceProducts.Where(pp => pp.Product.Id == item.Id).OrderByDescending(pp => pp.RegisteredDate).FirstOrDefault();
                if (priceProduct != null)
                {
                    item.Price = priceProduct.Price;
                }
            }
            return Data.ToList();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Product value)
        {
            _db.Entry(value.Business).State = EntityState.Unchanged;
            _db.Entry(value.Category).State = EntityState.Unchanged;
            _db.Products.Add(value);
            if (value.Price > 0)
            {
                PriceProduct pp = new PriceProduct();
                pp.Price = value.Price;
                pp.Product = value;
                pp.RegisteredDate = DateTime.Now;
                _db.PriceProducts.Add(pp);
            }
            _db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Product value)
        {
            var original = _db.Products
                .Where(item => item.Id == id).FirstOrDefault();

            original.BarCode = value.BarCode;
            original.Category = value.Category;
            original.Name = value.Name;
            original.Business = value.Business;
            original.ImageUrl = value.ImageUrl;

            _db.Entry(original).State = EntityState.Modified;
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var Data = _db.Products
                .Where(item => item.Id == id);

            _db.Products.Remove(Data.First());
            _db.SaveChanges();
        }
    }
}

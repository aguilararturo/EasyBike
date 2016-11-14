using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace easyBike.DataModel
{
    public class EasyBikeDataContext : DbContext
    {
        public EasyBikeDataContext()
        { }
        public DbSet<Address> Adress { get; set; }
        public DbSet<Client> Clients { get; set; }       
        public DbSet<Menbership> Menberships { get; set; }        
        public DbSet<MenbershipType> MenbershipTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Restorant> Restorants { get; set; }
        
    }
}


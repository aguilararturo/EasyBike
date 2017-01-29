using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using easyBike.DataModel.DataClasess;

namespace easyBike.DataModel
{
    public class EasyBikeDataContext : DbContext
    {
        public EasyBikeDataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Address> Adresses { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<MembershipType> MembershipTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<Bike> Bikes { get; set; }
        public DbSet<BusinessCategory> BusinessCategories { get; set; }
        public DbSet<BikeRegister> RegistredBikes { get; set; }
        public DbSet<Stock> Stock{ get; set; }
        public DbSet<ConfigurationData> Configurations { get; set; }
        public DbSet<PriceProduct> PriceProducts{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessCategory>()
                .HasKey(bc => new { bc.BussinessId, bc.ProductCategoryId });

            modelBuilder.Entity<BusinessCategory>()
                .HasOne(bc => bc.Bussiness)
                .WithMany(b => b.BusinesCategories)
                .HasForeignKey(bc => bc.BussinessId);

            modelBuilder.Entity<BusinessCategory>()
                .HasOne(bc => bc.ProductCategory)
                .WithMany(c => c.BusinesCategories)
                .HasForeignKey(bc => bc.ProductCategoryId);
        }

    }
}


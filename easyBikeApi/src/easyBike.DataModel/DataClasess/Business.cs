using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace easyBike.DataModel.DataClasess
{
    public class Business
    {
        public int Id { get; set; }
        public string CodSubfix { get; set; }
        public string Name { get; set; }
        public List<Address> Addresses { get; set; }
        public List<Phone> Phones { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<BusinessCategory> BusinesCategories { get; set; }
        [NotMapped]
        public List<ProductCategory> Categories { get; set; }
        public User User { get; set; }
        [NotMapped]
        public bool DefaultBussines { get; set; }
    }
}
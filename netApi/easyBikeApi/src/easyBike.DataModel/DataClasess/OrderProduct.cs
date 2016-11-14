namespace easyBike.DataModel
{
    public class OrderProduct
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Product Product { get; set; }
    }
}
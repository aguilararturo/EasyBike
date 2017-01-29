namespace easyBike.DataModel.DataClasess
{
    public class MembershipType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Percentage { get; set; }
        public User User { get; set; }
    }
}
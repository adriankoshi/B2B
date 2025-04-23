namespace B2B.Server.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public string? Address2 { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string? BusinessNo { get; set; }
        public string? BusinessName { get; set; }
    }
}

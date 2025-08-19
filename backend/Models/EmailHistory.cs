namespace AIEmailGeneratorBackend.Models
{
    public class EmailHistory
    {
        public int Id { get; set; }
        public string GeneratedEmail { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}

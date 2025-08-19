using AIEmailGeneratorBackend.Data;
using AIEmailGeneratorBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AIEmailGeneratorBackend.Services
{
    public class EmailHistoryService : IEmailHistoryService
    {
        private readonly AppDbContext _context;

        public EmailHistoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SaveEmailAsync(int userId, string emailContent)
        {
            var emailHistory = new EmailHistory
            {
                UserId = userId,
                GeneratedEmail = emailContent,
                CreatedAt = DateTime.UtcNow,
            };
            _context.EmailHistories.Add(emailHistory);
            await _context.SaveChangesAsync();
        }

        public async Task<List<EmailHistory>> GetUserHistoryAsync(int userId)
        {
            return await _context
                .EmailHistories.Where(eh => eh.UserId == userId)
                .OrderByDescending(eh => eh.CreatedAt)
                .ToListAsync();
        }
    }
}

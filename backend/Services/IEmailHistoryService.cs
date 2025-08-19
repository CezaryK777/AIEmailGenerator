using AIEmailGeneratorBackend.Models;

namespace AIEmailGeneratorBackend.Services
{
	public interface IEmailHistoryService
	{
		Task SaveEmailAsync(int userId, string emailContent);
		Task<List<EmailHistory>> GetUserHistoryAsync(int userId);
	}
}

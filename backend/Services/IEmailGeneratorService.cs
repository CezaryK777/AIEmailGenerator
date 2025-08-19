using AIEmailGeneratorBackend.models;

namespace AIEmailGeneratorBackend.Services
{
	public interface IEmailGeneratorService
	{
		Task<string> GenerateEmailAsync(EmailRequest emailRequestBody);
	}
}

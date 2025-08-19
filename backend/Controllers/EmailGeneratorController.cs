using System.Security.Claims;
using AIEmailGeneratorBackend.models;
using AIEmailGeneratorBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace AIEmailGeneratorBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailGeneratorController : Controller
    {
        private readonly IEmailGeneratorService _emailGeneratorService;
        private readonly IEmailHistoryService _emailHistoryService;

        public EmailGeneratorController(
            IEmailGeneratorService emailGeneratorService,
            IEmailHistoryService emailHistoryService
        )
        {
            _emailGeneratorService = emailGeneratorService;
            _emailHistoryService = emailHistoryService;
        }

        [HttpPost("generate-email")]
        public async Task<IActionResult> GenerateEmail([FromBody] EmailRequest emailRequest)
        {
            var generatedEmail = await _emailGeneratorService.GenerateEmailAsync(emailRequest);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            await _emailHistoryService.SaveEmailAsync(userId, generatedEmail);

            return Ok(new { EmailContent = generatedEmail });
        }
    }
}

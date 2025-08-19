using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using AIEmailGeneratorBackend.models;

namespace AIEmailGeneratorBackend.Services
{
    public class EmailGeneratorService : IEmailGeneratorService
    {
        private readonly HttpClient _httpClient;

        public EmailGeneratorService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GenerateEmailAsync(EmailRequest emailRequestBody)
        {
            string endpoint = "https://openwebui.ai.godeltech.com/api/chat/completions";
            string bearerToken = Environment.GetEnvironmentVariable("Ai_Api_Key")!;
            string model = "mistral:7b";

            var payload = new
            {
                messages = new[]
                {
                    new { role = "system", content = "" },
                    new
                    {
                        role = "user",
                        content = $"Write me an email body of this subject: {emailRequestBody.EmailSubject} in this style: {(emailRequestBody.IsFormalStyle ? "formal" : "in-formal")}, pls write only email, without any additional sentences from you, here are aditional details that should be considered during email creation: {emailRequestBody.EmailAditionalDetails}",
                    },
                },
                model,
                temperature = 1.0,
                top_p = 1.0,
            };

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                bearerToken
            );
            _httpClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json")
            );

            var content = new StringContent(
                Newtonsoft.Json.JsonConvert.SerializeObject(payload),
                Encoding.UTF8,
                "application/json"
            );

            HttpResponseMessage response = await _httpClient.PostAsync(endpoint, content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"AI API error: {response.StatusCode}");
            }

            var responseString = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseString);
            var result = doc
                .RootElement.GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return result ?? string.Empty;
        }
    }
}

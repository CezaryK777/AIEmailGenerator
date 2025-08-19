namespace AIEmailGeneratorBackend.models
{
	public class EmailRequest
	{
		public string EmailSubject
		{
			get; set;
		}
		public bool IsFormalStyle
		{
			get; set;
		}
		public string EmailAditionalDetails
		{
			get; set;
		}
	}
}

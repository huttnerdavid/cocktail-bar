namespace Backend.Data.Contracts;

public record AuthResponse(string Email, string UserName, string Token, string Id);
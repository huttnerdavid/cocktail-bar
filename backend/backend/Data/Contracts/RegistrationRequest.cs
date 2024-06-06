using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Contracts;

public record RegistrationRequest(
    [Required]string Email, 
    [Required]string Username, 
    [Required]string Password);
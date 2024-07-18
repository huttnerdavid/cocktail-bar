using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class FavoriteDto
{
    [Required]
    public string? Email { get; init; }
    [Required]
    public int CocktailId { get; init; }
    public string? CocktailName { get; set; }
    public string? CocktailImg { get; set; }
}
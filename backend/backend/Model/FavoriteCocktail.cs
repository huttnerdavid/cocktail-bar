namespace backend.Model;

public class FavoriteCocktail
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public int CocktailId { get; set; }
    public string? CocktailName { get; set; }
    public string? CocktailImg { get; set; }
}
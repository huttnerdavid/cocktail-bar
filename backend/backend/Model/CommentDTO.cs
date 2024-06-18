using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class CommentDTO
{
    [Required]
    public int CocktailId { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string CommentText { get; set; }
}
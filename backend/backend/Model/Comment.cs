namespace backend.Model;

public class Comment
{
    public int Id { get; init; }
    public int cocktailId { get; init; }
    public string UserName { get; init; }
    public string Text { get; init; }
}
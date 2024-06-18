using System.ComponentModel.DataAnnotations;
using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly ApiContext _dbContext;
    
    public CommentController(ApiContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("GetCommentsById")]
    public ActionResult<Comment[]> GetCommentsById([Required] int cocktailId)
    {
        var cocktails = _dbContext.Comments.Where(comment => comment.cocktailId == cocktailId);
        return Ok(cocktails);
    }

    [HttpPost("PostComment")]
    public async Task<ActionResult<string>> PostComment([Required] int cocktailId, [Required] string userName,
        [Required] string commentText)
    {
        try
        {
            _dbContext.Comments.Add(new Comment{cocktailId = cocktailId, Text = commentText, UserName = userName});
            await _dbContext.SaveChangesAsync();

            return Ok("Comment added");

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }
    }
}
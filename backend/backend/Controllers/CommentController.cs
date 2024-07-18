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
        var cocktails = _dbContext.Comments.Where(comment => comment.CocktailId == cocktailId);
        return Ok(cocktails);
    }

    [HttpPost("PostComment")]
    public async Task<ActionResult<string>> PostComment([FromBody] CommentDto commentDto)
    {
        try
        {
            if (ModelState.IsValid)
            {
                _dbContext.Comments.Add(new Comment
                {
                    CocktailId = commentDto.CocktailId,
                    Text = commentDto.CommentText,
                    UserName = commentDto.UserName
                });
                await _dbContext.SaveChangesAsync();

                return Ok("Comment added");
            }

            return BadRequest(ModelState);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("An error occurred!");
        }
    }
}
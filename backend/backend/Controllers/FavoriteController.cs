using System.ComponentModel.DataAnnotations;
using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FavoriteController : ControllerBase
{
    private readonly ApiContext _dbContext;
    
    public FavoriteController(ApiContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("AddFavorite")]
    public async Task<ActionResult<string>> AddFavorite([FromBody] FavoriteDto favoriteDto)
    {
        try
        {
            if (ModelState.IsValid)
            {
                _dbContext.Add(new FavoriteCocktail
                {
                    Email = favoriteDto.Email,
                    CocktailId = favoriteDto.CocktailId,
                    CocktailImg = favoriteDto.CocktailImg,
                    CocktailName = favoriteDto.CocktailName
                });
                await _dbContext.SaveChangesAsync();
                
                return Ok("Cocktail added!");
            }
            
            return BadRequest(ModelState);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("An error occurred!");
        } 
    }

    [HttpDelete("DeleteFavorite/{email}/{cocktailId}")]
    public async Task<ActionResult<string>> DeleteFavorite([Required] string email, [Required] int cocktailId)
    {
        try
        {
            _dbContext.Remove(_dbContext.Favorites.Single(favorite => favorite.Email == email && favorite.CocktailId == cocktailId));
            await _dbContext.SaveChangesAsync();
            return Ok("Cocktail removed!");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound("Cocktail couldn't be removed!");
        }
    }

    [HttpGet("GetFavoritesByEmail/{email}")]
    public ActionResult<FavoriteCocktail[]> GetFavoritesByEmail([Required] string email)
    {
        var favorites = _dbContext.Favorites.Where(favorite => favorite.Email == email);
        return Ok(favorites);
    }

    [HttpGet("GetFavoriteById/{email}/{cocktailId}")]
    public ActionResult<bool> GetFavoriteById([Required] string email, [Required] int cocktailId)
    {
        var favoriteExists = _dbContext.Favorites.FirstOrDefault(favorite => favorite.Email == email && favorite.CocktailId == cocktailId);
        if (favoriteExists != null)
        {
            return Ok(true);
        }
        return NotFound(false);
    }
}
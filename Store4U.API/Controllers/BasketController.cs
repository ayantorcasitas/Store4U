using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Store4U.API.Data;
using Store4U.API.DTOs;
using Store4U.API.Entities;

namespace Store4U.API.Controllers
{
    public class BasketController : BaseApiController
    {
        //private readonly ILogger<BasketController> _logger;
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            this._context = context;

        }

        // public BasketController( ILogger<BasketController> logger)
        // {
        //     _logger = logger;
        // }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            //create basket
            //get product
            //add item
            //save changes
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            //remove item or reduce quantity
            //save changes
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                    .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                    .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }


        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30), SameSite = SameSiteMode.None };
            Response.Cookies.Append("buyerId", buyerId);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }


    }
}
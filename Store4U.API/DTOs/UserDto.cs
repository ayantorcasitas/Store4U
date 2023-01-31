using Store4U.API.Entities;

namespace Store4U.API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public BasketDto Basket { get; set; }

    }
}
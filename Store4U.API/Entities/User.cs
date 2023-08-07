using Microsoft.AspNetCore.Identity;

namespace Store4U.API.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}
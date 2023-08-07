using Store4U.API.Entities.OrderAggregate;

namespace Store4U.API.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }

    }
}
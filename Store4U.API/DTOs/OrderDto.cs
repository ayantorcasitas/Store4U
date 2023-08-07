using System;
using System.Collections.Generic;
using Store4U.API.Entities.OrderAggregate;

namespace Store4U.API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItemDto> OrderItems { get; set; }
        public long SubTotal { get; set; }
        public long DeliveryFee { get; set; }
        public string OrderStatus { get; set; }
        public long Total { get; set; }

    }
}
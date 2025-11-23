"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { env } from "@/env";

interface OrderItem {
  productId: string;
  variantKey?: string;
  weight?: string;
  quantity: number;
  price: number;
}

interface CreateOrderParams {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
}

export async function createOrder(orderData: CreateOrderParams) {
  const token = env.SANITY_API_TOKEN;

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  try {
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const result = await client.create({
      _type: "order",
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items.map((item) => ({
        _key: Math.random().toString(36).substring(7),
        product: {
          _type: "reference",
          _ref: item.productId,
        },
        variantKey: item.variantKey,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: orderData.totalAmount,
      status: "pending",
      orderDate: new Date().toISOString(),
    });

    return { success: true, orderId: result._id, orderNumber };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

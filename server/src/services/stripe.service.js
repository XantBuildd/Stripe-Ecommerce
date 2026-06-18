import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (order) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: order.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    metadata: {
      orderId: order._id.toString(),
      userId: order.user.toString(),
    },
  });

  return session;
};

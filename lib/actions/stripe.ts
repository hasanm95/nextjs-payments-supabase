"use server";
import Stripe from "stripe";
import { STRIPE_PRICE_IDS, StripePriceIds } from "../stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function checkout(
	email: string,
	priceId: StripePriceIds,
	redirectTo: string
) {
	return JSON.stringify(
		await stripe.checkout.sessions.create({
			success_url: redirectTo || process.env.NEXT_PUBLIC_APP_URL,
			cancel_url: process.env.NEXT_PUBLIC_APP_URL,
			customer_email: email,
			line_items: [{ price: STRIPE_PRICE_IDS[priceId], quantity: 1 }],
			mode: "subscription",
		})
	);
}
export async function manageBilling(customer_id: string) {
	return JSON.stringify(
		await stripe.billingPortal.sessions.create({
			customer: customer_id,
			return_url: process.env.NEXT_PUBLIC_APP_URL,
		})
	);
}
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY

export const STRIPE_PRICE_IDS = {
    premium: "price_1SSwk4CcXttdjzOzUdewm7pu",
    pro: "price_1SSwkQCcXttdjzOzvdLnIoOn"
} as const

export type StripePriceIds = typeof STRIPE_PRICE_IDS
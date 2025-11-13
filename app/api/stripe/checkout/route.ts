import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { priceId } = await request.json()
        if (!priceId || !(priceId in STRIPE_PRICE_IDS)) {
            return NextResponse.json({ error: "Invalid price ID" }, { status: 400 })
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: STRIPE_PRICE_IDS[priceId as keyof typeof STRIPE_PRICE_IDS],
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/dashboard`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/pricing`,
            metadata: {
                userId: "user.id",
                priceId,
            },
        })

        console.log(checkoutSession.url)

        return NextResponse.json({ url: checkoutSession.url })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: `Internal server error ${error}`,
            status: 500
        })
    }
}
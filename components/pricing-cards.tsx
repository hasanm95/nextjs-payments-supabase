"use client"
import { useRouter } from "next/navigation"
import React from "react"

interface Tier {
  name: string
  price: string
  priceId: string | null
  features: string[]
  buttonText: string
}

interface PricingCardsProps {
  tiers: Tier[]
}

const PricingCards: React.FC<PricingCardsProps> = ({
  tiers,
}) => {
//   const router = useRouter()
  const handleSubscripe = async (priceId: string) => {
    if (!priceId) return

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error("No checkout url")
      }
    } catch (error) {
      console.error("Error creating checkout session: ", error)
      alert("Error creating checkout session")
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl text-black font-semibold mb-4">{tier.name}</h2>
            <p className="text-3xl text-black font-bold mb-6">{tier.price}</p>
            <ul className="mb-6 space-y-2">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  <span className="text-black">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleSubscripe(tier.priceId!)}
            className="px-4 py-2 rounded-lg transition-colors bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
          >
            {tier.buttonText}
          </button>
        </div>
      ))}
    </div>
  )
}

export default PricingCards
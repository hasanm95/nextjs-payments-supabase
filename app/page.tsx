"use client"

import Price from "@/components/subscription/price"
import useUser from "./hook/useUser";

const PricingPage = () => {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return <></>;
  }

  const isActive = !user?.subscription?.end_at ? false : new Date(user.subscription.end_at) > new Date();

  return (
    <div className="min-h-screen by-gray-50 flex flex-col items-center py-12 px-4">
      {isActive ? 
      (
        <p>This is protected data</p>
      ) : (
        <>
            <h1 className="text-4xl font-bold mb-8">You need to subscribe to see data</h1>
            <Price />
        </>
      )}
    </div>
  )
}

export default PricingPage
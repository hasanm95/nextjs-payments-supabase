"use client"

import Price from "@/components/subscription/price"
import useUser from "./hook/useUser";
import Todo from "@/components/todo/todo";

const PricingPage = () => {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return <></>;
  }

  const isActive = !user?.subscription?.end_at ? false : new Date(user.subscription.end_at) > new Date();

  return (
    <div className="min-h-screen by-gray-50 flex flex-col items-center py-12 px-4">
      {isActive ? <Todo/> : <Price />}
    </div>
  )
}

export default PricingPage
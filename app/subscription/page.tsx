import Price from "@/components/subscription/price"


const PricingPage = () => {
  return (
    <div className="min-h-screen by-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Pricing Plans</h1>
      <Price />
    </div>
  )
}

export default PricingPage
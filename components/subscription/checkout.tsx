"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import useUser from "@/app/hook/useUser";
import { redirect, useRouter } from "next/navigation";
import { checkout } from "@/lib/actions/stripe";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { StripePriceIds } from "@/lib/stripe";

export default function Checkout({ priceId, amount }: { priceId?: StripePriceIds, amount: number }) {
	const { data: user } = useUser();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCheckout = async () => {
        if(!priceId) redirect("/profile")

        try {
            if (user?.id) {
                setLoading(true);
                const data = JSON.parse(
                    await checkout(
                        user.email,
                        priceId,
                        location.origin + `/payment-success?amount=${amount}`
                    )
                );
                
                const {url} = data

                if (url) {
                    window.location.href = url
                } else {
                    throw new Error("No checkout url")
                }

            } else {
                router.push("/auth?next=" + location.pathname);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }


	};

	return (
		<Button
			className="w-full flex items-center gap-2"
			onClick={handleCheckout}
		>
			Getting Started{" "}
			<AiOutlineLoading3Quarters
				className={cn(" animate-spin", loading ? "block" : "hidden")}
			/>
		</Button>
	);
}
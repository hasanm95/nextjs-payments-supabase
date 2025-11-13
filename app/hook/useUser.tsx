"use client";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const initUser = {
	created_at: "",
	name: "",
	email: "",
	id: "",
	image_url: "",
	subscription: {
		created_at: "",
		customer_id: "",
		email: "",
		end_at: "",
		subscription_id: "",
	},
};

export default function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const supabase = createClient();
			const { data } = await supabase.auth.getSession();
			if (data.session?.user) {
				// fetch user information profile
				const { data: user } = await supabase
					.from("profile")
					.select("*,subscription(*)")
					.eq("id", data.session.user.id)
					.single();

				return user;
			}
			return initUser;
		},
	});
}
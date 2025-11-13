import { Suspense } from "react";
import AuthComponent from "@/components/auth-component";

export default function page() {
	return (
		<Suspense>
			<AuthComponent />
		</Suspense>
	);
}
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SWAPI",
    description: "A Star Wars search app built with Next.js and TypeScript",
};

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

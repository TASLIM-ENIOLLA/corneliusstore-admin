export const routes: RouteType [] = [
	{
		name: "home",
		title: "find what you need",
		icon: "bi-house-door",
		color: "bg-green-600",
		href: "/admin",
	},
	{
		name: "products",
		title: "view and modify all products",
		icon: "bi-bag-check",
		color: "bg-pink-600",
		href: "/admin/products",
	},
	{
		name: "categories",
		title: "view and modify all categories",
		icon: "bi-grid-1x2",
		color: "bg-yellow-600",
		href: "/admin/categories",
	},
	// {
	// 	name: "orders",
	// 	title: "view all orders",
	// 	icon: "bi-box",
	// 	color: "bg-purple-600",
	// 	href: "/admin/orders",
	// },
	{
		name: "payments",
		title: "view and accept payments",
		icon: "bi-cash-stack",
		color: "bg-teal-600",
		href: "/admin/payments",
	},
	{
		name: "logout",
		title: "logout and clear user data",
		icon: "bi-power",
		color: "bg-red-600",
		href: "/admin/logout",
	}
];

export type RouteType = {
	name: string,
	title: string,
	icon: string,
	color: string,
	href: string,
}
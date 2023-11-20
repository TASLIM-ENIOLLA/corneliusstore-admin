import Link from "next/link";
import Image from "next/image";

export default function Component({ id, name, categoryName, typeName, price }) {
	return (
		<article className="border rounded-md overflow-hidden">
			<div className="h-[120px] relative bg-gray-50">
				<Image
					fill={true}
					src="/favicon.ico"
					alt={`Product image for ${name}`}
					style={{ objectFit: "cover" }}
					className="border-none bg-transparent block outline-none"
				/>
			</div>
			<div className="p-3 space-y-5">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<span title={name} className="font-bold capitalize one-line">{name}</span>
						<span title={categoryName} className="font-medium text-gray-600 text-sm leading-4 capitalize one-line">{categoryName}</span>
					</div>
					<div className="flex flex-col items-end">
						<span className="font-bold capitalize one-line">NGN</span>
						<span title={`NGN ${new Intl.NumberFormat().format(price)}`} className="font-medium text-gray-600 text-sm leading-4 capitalize one-line">
							{new Intl.NumberFormat().format(price)}
						</span>
					</div>
				</div>
				<div>
					<Link href={`/admin/products/${id}`} className="block p-2 text-sm text-white rounded-md shadow font-bold capitalize bg-gray-600 w-full text-center">view more</Link>
				</div>
			</div>
		</article>
	);
}
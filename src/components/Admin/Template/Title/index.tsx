export default function Component({ title, subtitle }: TitlePropsType) {
	return (
		<section className="pt-7 md:pt-10">
			<div className="container">
				<div className="text-xl md:text-3xl font-bold capitalize">{title}</div>
				<div className="text-sm md:text-base text-gray-600 font-medium sentence">{subtitle}</div>
			</div>
		</section>
	);
}

export type TitlePropsType = { 
	title: string,
	subtitle: string
}
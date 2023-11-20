import { Fragment } from "react";

import Header from "./Header";
import Title from "./Title";

export default function Component({ children }: TemplatePropsType) {
	return (
		<Fragment>
			<Header />
			{children}
		</Fragment>
	);
}

type TemplatePropsType = {
	children: React.ReactNode
}
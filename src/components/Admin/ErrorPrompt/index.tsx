export default function ErrorPrompt({ message }: ErrorPromptPropType) {
	return (
		<div className="text-white rounded sentence p-3 bg-red-400">
			<div className="flex items-center gap-5">
				<div>
					<span className="bi-exclamation-circle text-xl"></span>
				</div>
				<div className="flex-1">
					<div className="sentence font-medium">
						{message}
					</div>
				</div>
			</div>
		</div>
	);
}

type ErrorPromptPropType = {
  message: string
}
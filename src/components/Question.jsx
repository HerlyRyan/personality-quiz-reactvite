export default function Question({ question, options, onAnswer }) {
	return (
		<div>
			<h2>{question}</h2>
			{options.map((option) => {
				return (
					<button
                        className="btn-question"
						key={option}
                        type="button"
						onClick={()=>{
                            onAnswer(option)
                        }}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}

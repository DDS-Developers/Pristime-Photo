// Dependencies
import { HashLoader } from "react-spinners";

function LoadingSpinner() {
	return (
		<div className="my-5">
			<HashLoader
				cssOverride={{
					display: "block",
					margin: "0 auto",
				}}
				color="#2ABDB2"
			/>
		</div>
	);
}

export default LoadingSpinner;

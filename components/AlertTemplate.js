// Dependencies
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertTemplate({ style, message, close }) {
	return (
		<Alert variant="success" style={style}>
			{message}
			<Button variant="success" className="ms-2" onClick={close}>
				X
			</Button>
		</Alert>
	);
}

export default AlertTemplate;

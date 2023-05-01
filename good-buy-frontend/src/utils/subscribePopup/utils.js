import axios from "axios";

export const handleClose = (setOpen, onClose) => {
	setOpen(false);
	onClose();
};

export const handleEmailChange = (event, setEmail) => {
	setEmail(event.target.value);
};

export const handleSubscribe = async (email) => {
	try {
		await axios.post(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Production/email/subscribe-user",
			{
				"email": email
			}
		);
		handleClose();
	} catch (error) {
		console.error(error);
	}
};
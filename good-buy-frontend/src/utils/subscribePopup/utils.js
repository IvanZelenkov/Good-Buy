import axios from "axios";

export const handlePopupClose = (setOpen) => {
	setOpen(false);
	localStorage.setItem("showSubscribePopup", JSON.stringify(false));
	setTimeout(() => {
		localStorage.removeItem("showSubscribePopup");
	}, 1800000); // 30 minutes

	window.addEventListener("beforeunload", () => {
		localStorage.removeItem("showSubscribePopup");
	});
};

export const handleEmailChange = (event, setEmail) => {
	setEmail(event.target.value);
};

export const handleSubscribe = async (email, setOpen) => {
	try {
		await axios.post(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Production/email/subscribe-user",
			{
				"email": email
			}
		);
		handlePopupClose(setOpen)
	} catch (error) {
		console.error(error);
	}
};
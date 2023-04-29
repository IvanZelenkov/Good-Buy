import { Auth } from "aws-amplify";

export const handleResendClick = async (setIsResending, username) => {
	setIsResending(true);
	try {
		await Auth.resendSignUp(username);
	} catch (error) {
		console.log(`Error resending verification code: ${error.message}`);
	} finally {
		setIsResending(false);
	}
};
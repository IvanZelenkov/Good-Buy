import { Auth } from "aws-amplify";

export const handleResendClick = async (username) => {
	try {
		await Auth.resendSignUp(username);
	} catch (error) {
		console.log(`Error resending verification code: ${error.message}`);
	}
};

export const confirmSignUp = async (authenticationState, setAuthenticationState) => {
	const { username, authCode } = authenticationState.formState;
	if (!(/\S+@\S+\.\S+/.test(username)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
	if (!(/^[0-9]{6}$/.test(authCode)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidAuthCodeMessage: "The activation code must be 6 digits."
		}));

	try {
		await Auth.confirmSignUp(username, authCode);

		setAuthenticationState(prevState => ({
			...prevState,
			formState: {
				...authenticationState.formState,
				formType: "signIn"
			}
		}));
	} catch (error) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidAuthCodeMessage: "Invalid email address or activation code."
		}));
	}
};
import { Auth } from "aws-amplify";

export const handleForgotPasswordSendCode = async (authenticationState, setAuthenticationState) => {
	const { username } = authenticationState.formState;

	if (!(/\S+@\S+\.\S+/.test(username))) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
		return;
	}

	try {
		await Auth.forgotPassword(username);
		setAuthenticationState(prevState => ({
			...prevState,
			formState: {
				...authenticationState.formState,
				formType: "forgotPassword-setNewPassword"
			}
		}));
	} catch (error) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "The email is either incorrect or the account does not exist."
		}));
	}
}
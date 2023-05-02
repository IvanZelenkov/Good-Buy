import { Auth } from "aws-amplify";

export const handleForgotPasswordSetNewPassword = async (authenticationState, setAuthenticationState) => {
	const { username, authCode, newPassword } = authenticationState.formState;

	if (!(/\S+@\S+\.\S+/.test(username))) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
		return;
	}

	const passwordRegex = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;

	if (!passwordRegex.test(newPassword)) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidNewPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals."
		}));
		return;
	}

	try {
		await Auth.forgotPasswordSubmit(username, authCode, newPassword);
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
			invalidNewPasswordMessage: "Invalid email address or activation code."
		}));
	}
};
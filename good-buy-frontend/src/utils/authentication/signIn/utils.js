import { Auth } from "aws-amplify";
import { checkUser } from "../utils";

export const signInInstead = (authenticationState, setAuthenticationState) => {
	setAuthenticationState(prevState => ({
		...prevState,
		formState: {
			...authenticationState.formState,
			formType: "signIn"
		}
	}));
}

export const forgotPasswordInstead = (authenticationState, setAuthenticationState) => {
	setAuthenticationState(prevState => ({
		...prevState,
		formState: {
			...authenticationState.formState,
			formType: "forgotPassword-sendCode"
		}
	}));
}

export const signIn = async (updateUser, authenticationState, setAuthenticationState) => {
	const { username, password } = authenticationState.formState;

	const emailRegex = /\S+@\S+\.\S+/;
	const passwordRegex = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;

	if (!emailRegex.test(username)) {
		setAuthenticationState(prevState => ({ ...prevState, invalidEmailMessage: "Invalid email address." }));
		return;
	}

	if (!passwordRegex.test(password)) {
		setAuthenticationState(prevState => ({ ...prevState, invalidPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals." }));
		return;
	}

	try {
		await Auth.signIn(username, password);
		setAuthenticationState(prevState => ({ ...prevState, formState: { ...authenticationState.formState, formType: "signedIn" } }));
		await checkUser(updateUser, authenticationState, setAuthenticationState);
	} catch (error) {
		setAuthenticationState(prevState => ({ ...prevState, invalidPasswordMessage: "Wrong password. Try again or click Forgot Password to reset it." }));
		checkUser(updateUser, authenticationState, setAuthenticationState);
	}
};
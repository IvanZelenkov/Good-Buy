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

export const signIn = async (updateUser, authenticationState, setAuthenticationState) => {
	const { username, password } = authenticationState.formState;
	if (!(/\S+@\S+\.\S+/.test(username)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
	if (!(/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/).test(password))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals."
		}));
	else {
		await Auth.signIn(username, password).catch(() => {
			setAuthenticationState(prevState => ({
				...prevState,
				invalidPasswordMessage: "Wrong password. Try again or click Forgot Password to reset it."
			}));
			checkUser();
		});
		setAuthenticationState(prevState => ({
			...prevState,
			formState: {
				...authenticationState.formState,
				formType: "signedIn"
			}
		}));
		await checkUser(updateUser, authenticationState, setAuthenticationState);
	}
};
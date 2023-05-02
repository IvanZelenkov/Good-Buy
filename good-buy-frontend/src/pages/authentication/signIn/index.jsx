import { motion } from "framer-motion";
import { CheckBox as CheckBoxIcon, LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { muiTextFieldCSS } from "../../../theme";
import Copyright from "../../../components/authentication/Copyright";
import { onChange } from "../../../utils/authentication/utils";
import { forgotPasswordInstead, signIn } from "../../../utils/authentication/signIn/utils";
import { signUpInstead } from "../../../utils/authentication/signUp/utils";

const SignIn = ({ updateUser, authenticationState, setAuthenticationState, customColors }) => {
	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			<Container
				maxWidth="xs"
				sx={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)"
				}}
			>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Avatar sx={{ margin: 1, backgroundColor: customColors[6] }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography
						sx={{
							fontSize: "20px",
							fontFamily: "Montserrat",
							color: customColors[6]
						}}
					>
						Sign In
					</Typography>
					<Box sx={{ marginTop: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Email Address"
							name="username"
							autoComplete="email"
							autoFocus
							error={authenticationState.invalidEmailMessage !== ""}
							helperText={authenticationState.invalidEmailMessage}
							onChange={(event) => {
								onChange(event, authenticationState, setAuthenticationState)
							}}
							sx={muiTextFieldCSS(customColors[6])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							error={authenticationState.invalidPasswordMessage !== ""}
							helperText={authenticationState.invalidPasswordMessage}
							onChange={(event) => {
								onChange(event, authenticationState, setAuthenticationState)
							}}
							sx={muiTextFieldCSS(customColors[6])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<FormControlLabel
							control={<Checkbox
								value="remember"
								style={{ color: customColors[6] }}
								checkedIcon={<CheckBoxIcon sx={{ color: customColors[6] }}/>}
							/>}
							label={
								<Typography style={{
									color: customColors[6],
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Remember me
								</Typography>
							}
							sx={{ color: customColors[6] }}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={() => signIn(updateUser, authenticationState, setAuthenticationState)}
							sx={{
								fontFamily: "Montserrat",
								fontWeight: "600",
								letterSpacing: "1px",
								marginTop: 3,
								marginBottom: 2,
								backgroundColor: customColors[6],
								color: customColors[1],
								":hover": {
									backgroundColor: customColors[5],
									color: customColors[1]
								}
							}}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									onClick={() => forgotPasswordInstead(authenticationState, setAuthenticationState)}
									variant="body2"
									sx={{
										color: customColors[6],
										textDecorationColor: customColors[6],
										cursor: "pointer",
										fontFamily: "Montserrat"
									}}
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									onClick={() => signUpInstead(authenticationState, setAuthenticationState)}
									variant="body2"
									sx={{
										color: customColors[6],
										textDecorationColor: customColors[6],
										cursor: "pointer",
										fontFamily: "Montserrat"
									}}
								>
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright textdecorationcolor={customColors[6]}/>
			</Container>
		</Box>
	);
}

export default SignIn;
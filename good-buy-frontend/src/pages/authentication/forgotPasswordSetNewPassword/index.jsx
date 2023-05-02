import { motion } from "framer-motion";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { muiTextFieldCSS } from "../../../theme";
import Copyright from "../../../components/authentication/Copyright";
import { onChange } from "../../../utils/authentication/utils";
import { handleForgotPasswordSetNewPassword } from "../../../utils/authentication/forgotPasswordSetNewPassword/utils";
import { handleForgotPasswordSendCode } from "../../../utils/authentication/forgotPasswordSendCode/utils";

const ForgotPasswordSetNewPassword = ({ authenticationState, setAuthenticationState, customColors }) => {
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
						Reset Password
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
							label="Confirmation Code"
							name="authCode"
							error={authenticationState.invalidAuthCodeMessage !== ""}
							helperText={authenticationState.invalidAuthCodeMessage}
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
							label="New Password"
							name="newPassword"
							type="password"
							error={authenticationState.invalidNewPasswordMessage !== ""}
							helperText={authenticationState.invalidNewPasswordMessage}
							onChange={(event) => {
								onChange(event, authenticationState, setAuthenticationState)
							}}
							sx={muiTextFieldCSS(customColors[6])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={() => handleForgotPasswordSetNewPassword(authenticationState, setAuthenticationState)}
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
							Reset
						</Button>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Link
								variant="body2"
								sx={{
									color: customColors[6],
									textDecorationColor: customColors[6],
									cursor: "pointer"
								}}
								onClick={() => handleForgotPasswordSendCode(authenticationState, setAuthenticationState)}
							>
								Didn't receive a code? Resend
							</Link>
						</Box>
					</Box>
				</Box>
				<Copyright textdecorationcolor={customColors[6]}/>
			</Container>
		</Box>
	);
}

export default ForgotPasswordSetNewPassword;
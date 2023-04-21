import { motion } from "framer-motion";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Container,
	Link,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { muiTextFieldCSS, tokens } from "../../../theme";
import Copyright from "../../../components/authentication/Copyright";

const SignUp = ({ onInputChange, signUp, signInInstead, invalidEmailMessage, invalidUsernameMessage, invalidPasswordMessage }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

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
					<Avatar sx={{ margin: 1, backgroundColor: colors.customColors[6] }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography
						sx={{
							fontSize: "20px",
							fontFamily: "Montserrat",
							color: colors.customColors[6]
						}}
					>
						Sign Up
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
							error={invalidEmailMessage !== ""}
							helperText={invalidEmailMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS(colors.customColors[6])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Username"
							name="name"
							autoComplete="name"
							error={invalidUsernameMessage !== ""}
							helperText={invalidUsernameMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS(colors.customColors[6])}
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
							error={invalidPasswordMessage !== ""}
							helperText={invalidPasswordMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS(colors.customColors[6])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<Button
							fullWidth
							variant="contained"
							onClick={signUp}
							sx={{
								fontFamily: "Montserrat",
								fontWeight: "600",
								letterSpacing: "1px",
								marginTop: 3,
								marginBottom: 2,
								backgroundColor: colors.customColors[6],
								color: colors.customColors[1],
								":hover": {
									backgroundColor: colors.customColors[5],
									color: colors.customColors[1]
								}
							}}
						>
							Sign Up
						</Button>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Link
								onClick={signInInstead}
								variant="body2"
								sx={{
									color: colors.customColors[6],
									textDecorationColor: colors.customColors[6],
									fontFamily: "Montserrat",
									cursor: "pointer"
								}}
							>
								Already have an account? Sign In
							</Link>
						</Box>
					</Box>
				</Box>
				<Copyright sx={{ marginTop: 8, marginBottom: 4 }} textdecorationcolor={colors.customColors[1]}/>
			</Container>
		</Box>
	);
}

export default SignUp;
import {
	Avatar,
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	useTheme
} from "@mui/material";
import { CheckBox as CheckBoxIcon, LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import Copyright from "../../../components/Copyright";
import { muiTextFieldCSS, tokens } from "../../../theme";
import { motion } from "framer-motion";

const SignIn = ({ onInputChange, signIn, signUpInstead, invalidEmailMessage, invalidPasswordMessage }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<motion.div exit={{ opacity: 0 }}>
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
					<Avatar sx={{ margin: 1, backgroundColor: "black" }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5" color="black">
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
							error={invalidEmailMessage !== ""}
							helperText={invalidEmailMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS}
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
							sx={muiTextFieldCSS}
						/>
						<FormControlLabel
							control={<Checkbox
								value="remember"
								sx={{ color: "black" }}
								checkedIcon={<CheckBoxIcon sx={{ color: "black" }}/>}
							/>}
							label="Remember me"
							sx={{ color: "black" }}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={signIn}
							sx={{
								marginTop: 3,
								marginBottom: 2,
								color: "white",
								backgroundColor: "black"
							}}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2" sx={{ color: "black", textDecorationColor: "black" }}>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									onClick={signUpInstead}
									variant="body2"
									sx={{
										color: "black",
										textDecorationColor: "black",
										cursor: "pointer"
									}}
								>
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright/>
			</Container>
		</motion.div>
	);
}

export default SignIn;
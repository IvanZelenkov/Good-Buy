import {
	Avatar,
	Button,
	TextField,
	Link,
	Box,
	Typography,
	Container,
	useTheme
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import Copyright from "../../components/Copyright";
import { muiTextFieldCSS, tokens } from "../../theme";
import { motion } from "framer-motion";

const SignUp = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Container
				maxWidth="xs"
				sx={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)'
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
						Sign Up
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ marginTop: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							sx={muiTextFieldCSS}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="first name"
							label="First Name"
							name="first name"
							autoComplete="first name"
							sx={muiTextFieldCSS}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="last name"
							label="Last Name"
							name="last name"
							autoComplete="last name"
							sx={muiTextFieldCSS}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							sx={muiTextFieldCSS}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="repeat password"
							label="Repeat Password"
							type="password"
							id="password"
							sx={muiTextFieldCSS}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								marginTop: 3,
								marginBottom: 2,
								color: "white",
								backgroundColor: "black"
							}}
						>
							Sign Up
						</Button>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Link href="#" variant="body2" sx={{ color: "black", textDecorationColor: "black" }}>
								Already have an account? Sign In
							</Link>
						</Box>
					</Box>
				</Box>
				<Copyright sx={{ marginTop: 8, marginBottom: 4 }}/>
			</Container>
		</motion.div>
	);
}

export default SignUp;
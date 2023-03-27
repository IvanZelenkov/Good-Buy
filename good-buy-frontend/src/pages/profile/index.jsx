import { motion } from "framer-motion";
import { Box, Button, Container, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const Profile = ({ user }) => {

	console.log(user)

	if (user === null) {
		return (
			<motion.div exit={{ opacity: 0 }}>
				<Box margin="1.5vh">
					<Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
						<UseAnimations animation={loading} size={50} fillColor={"#e92a2a"} strokeColor={"#e92a2a"}/>
					</Box>
				</Box>
			</motion.div>
		);
	}
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
					<Typography component="h1" variant="h5" color="black">
						Welcome {user.attributes.name} {user.attributes.email}!
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={() => {
							Auth.signOut();
						}}
						sx={{
							marginTop: 3,
							marginBottom: 2,
							color: "white",
							backgroundColor: "black"
						}}
					>
						Sign Out
					</Button>
				</Box>
			</Container>
		</motion.div>
	);
}

export default Profile;
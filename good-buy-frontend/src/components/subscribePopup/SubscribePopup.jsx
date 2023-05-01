import { useState } from "react";
import {
	Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
	Button, TextField, InputAdornment, IconButton, Zoom
} from "@mui/material";
import { Email as EmailIcon } from '@mui/icons-material';
import { muiTextFieldCSS } from "../../theme";
import { handleClose, handleEmailChange, handleSubscribe } from "../../utils/subscribePopup/utils";

const SubscribePopup = ({ onClose }) => {
	const [open, setOpen] = useState(true);
	const [email, setEmail] = useState("");

	return (
		<Dialog open={open} onClose={() => handleClose(setOpen, onClose)} TransitionComponent={Zoom} TransitionProps={{ timeout: 1500 }}>
			<DialogTitle
				className="subscribe-popup-title-background-gradient"
				sx={{ fontSize: "1.5vh", fontFamily: "Montserrat", color: "white", textAlign: "center" }}
			>
				Subscribe to Email Notifications
			</DialogTitle>
			<DialogContent sx={{
				background: "white",
				padding: "1vh 1.5vh",
				textAlign: "center"
			}}>
				<DialogContentText sx={{
					fontSize: "1.3vh",
					fontFamily: "Montserrat",
					padding: "1vh",
					color: "black"
				}}>
					Don't miss out on our latest deals and updates. Enter your email address below to subscribe to our email notifications today!
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					label="Email"
					type="email"
					value={email}
					onChange={(event) => handleEmailChange(event, setEmail)}
					fullWidth
					sx={muiTextFieldCSS("black")}
					InputProps={{
						style: { fontFamily: "Montserrat", color: "black" },
						startAdornment: (
							<InputAdornment position="start">
								<IconButton edge="start">
									<EmailIcon style={{ color: "#0095FF" }}/>
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
				<DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
					<Button onClick={() => handleClose(setOpen, onClose)} sx={{
						borderRadius: "5px",
						background: "linear-gradient(to right, #00C6FF, #0072FF)",
						color: "white",
						fontSize: "1vh",
						fontFamily: "Montserrat",
						fontWeight: "600",
						textTransform: "uppercase",
						boxShadow: "0px 13px 13px rgba(0, 0, 0, 0.3)",
						transition: "all 0.3s ease",
						"&:hover": {
							transform: "translateY(10px)",
							boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.5)"
						},
						marginBottom: "1vh"
					}}>
						Not Now
					</Button>
					<Button onClick={() => handleSubscribe(email)} sx={{
						borderRadius: "5px",
						background: "linear-gradient(to right, #FF6969, #F90A0A)",
						color: "white",
						fontSize: "1vh",
						fontFamily: "Montserrat",
						fontWeight: "600",
						textTransform: "uppercase",
						boxShadow: "0px 13px 13px rgba(0, 0, 0, 0.3)",
						transition: "all 0.3s ease",
						"&:hover": {
							transform: "translateY(10px)",
							boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.5)"
						},
						marginBottom: "1vh"
					}}>
						Subscribe
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default SubscribePopup;

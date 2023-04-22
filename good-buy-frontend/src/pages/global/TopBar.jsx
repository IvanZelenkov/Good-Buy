import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import { AccountCircle as AccountCircleIcon, Menu as MenuIcon, SettingsOutlined as SettingsOutlinedIcon } from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { motion } from "framer-motion";
import { ColorModeContext } from "../../theme";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const pages = [
	{ "pageName": "Home", "route": "/" },
	{ "pageName": "Products", "route": "/products" },
	{ "pageName": "Deals", "route": "/deals" },
	{ "pageName": "Google Maps", "route": "/google-maps" },
	{ "pageName": "Shopping List", "route": "/shopping-list" },
	{ "pageName": "Shopping Cart", "route": "/shopping-cart" }
];

const TopBar = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="sticky" sx={{ backgroundColor: colors.customColors[6] }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontSize: "1.5vh",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: colors.customColors[1],
							textDecoration: "none",
							fontFamily: "Montserrat",
							cursor: "pointer"
						}}
						onClick={() => navigate("/")}
					>
						GOOD BUY
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							sx={{
								color: colors.customColors[1],
								":hover": {
									color: colors.customColors[2]
								}
							}}
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
							keepMounted
							transformOrigin={{ vertical: "top", horizontal: "left" }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" }}}
						>
							{pages.map((page, id) => (
								<MenuItem
									key={id}
									onClick={handleCloseNavMenu}
									component={Link}
									to={page.route}
								>
									<Typography sx={{ textAlign: "center", fontFamily: "Montserrat"}}>
										{page.pageName}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					
					<Typography
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "Montserrat",
							fontWeight: 700,
							color: colors.customColors[1],
							letterSpacing: "0.3rem",
							textDecoration: "none"
						}}
					>
						GOOD BUY
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page, id) => (
							<Button
								component={Link}
								to={page.route}
								key={id}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontWeight: "900",
									fontFamily: "Montserrat",
									color: colors.customColors[1],
									letterSpacing: "1px",
									":hover": {
										color: colors.customColors[2]
									}
								}}
							>
								{page.pageName}
							</Button>
						))}
					</Box>

					<Box sx={{ display: "flex", flexGrow: 0, flexDirection: "row" }}>
						<motion.div whileHover={{ scale: 1.2 }}>
							{theme.palette.mode === "dark" ? (
								<Tooltip title="Light Theme" placement="bottom">
									<IconButton
										onClick={colorMode.toggleColorMode}
										sx={{ marginRight: "1vw" }}
									>
										<LightModeOutlinedIcon sx={{
											color: colors.customColors[1],
											":hover": {
												color: colors.customColors[2]
											}
										}}/>
									</IconButton>
								</Tooltip>
							) : (
								<Tooltip title="Dark Theme" placement="bottom">
									<IconButton
										onClick={colorMode.toggleColorMode}
										sx={{ marginRight: "1vw" }}
									>
										<DarkModeOutlinedIcon sx={{
											color: colors.customColors[1],
											":hover": {
												color: colors.customColors[2]
											}
										}}/>
									</IconButton>
								</Tooltip>
							)}
						</motion.div>
						<motion.div whileHover={{ scale: 1.2 }}>
							<Tooltip title="Settings" placement="bottom">
								<IconButton component={Link} to="/settings" sx={{ marginRight: "1vw" }}>
									<SettingsOutlinedIcon
										sx={{
											color: colors.customColors[1],
											":hover": {
												color: colors.customColors[2]
											}
										}}
									/>
								</IconButton>
							</Tooltip>
						</motion.div>
						<motion.div whileHover={{ scale: 1.2 }}>
							<Tooltip title="Profile" placement="bottom">
								<IconButton
									component={Link}
									to="/authentication"
									sx={{ marginRight: "1vw" }}
								>
									<AccountCircleIcon
										sx={{
											color: colors.customColors[1],
											":hover": {
												color: colors.customColors[2]
											}
										}}
									/>
								</IconButton>
							</Tooltip>
						</motion.div>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default TopBar;
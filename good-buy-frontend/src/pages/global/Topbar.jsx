import { useState, useContext } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
	useTheme
} from "@mui/material";
import {
	Menu as MenuIcon,
	Adb as AdbIcon,
	SettingsOutlined as SettingsOutlinedIcon,
	AccountCircle as AccountCircleIcon
} from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { motion } from "framer-motion";
import { ColorModeContext } from "../../theme";
import { Link } from "react-router-dom";

const pages = [
	{ "pageName": "Home", "route": "/" },
	{ "pageName": "Products", "route": "/products" },
	{ "pageName": "Deals", "route": "/deals" },
	{ "pageName": "Google Maps", "route": "/google-maps" },
	{ "pageName": "Shopping List", "route": "/shopping-list" },
	{ "pageName": "Shopping Cart", "route": "/shopping-cart" }
];

function Topbar() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "black" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						GOOD BUY
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page, id) => (
								<MenuItem
									key={id}
									onClick={handleCloseNavMenu}
									component={Link}
									to={page.route}
								>
									<Typography textAlign="center">{page.pageName}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, id) => (
							<Button
								component={Link}
								to={page.route}
								key={id}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: "custom.customColorD",
									":hover": {
										color: "custom.customColorE",
									},
									display: 'flex',
									justifyContent: "center",
									alignItems: "center",
									fontWeight: "900"
								}}
							>
								{page.pageName}
							</Button>
						))}
					</Box>

					<Box sx={{ display: "flex", flexGrow: 0, flexDirection: "row" }}>
						<motion.div whileHover={{ scale: 1.2 }}>
							<IconButton
								onClick={colorMode.toggleColorMode}
								sx={{ marginRight: "1vw" }}
							>
								{theme.palette.mode === "dark" ? (
									<DarkModeOutlinedIcon sx={{
										color: "custom.customColorD",
										":hover": {
											color: "custom.customColorE",
										}
									}}/>
								) : (
									<LightModeOutlinedIcon sx={{
										color: "custom.customColorA",
										":hover": {
											color: "custom.customColorE"
										}
									}}/>
								)}
							</IconButton>
						</motion.div>
						<motion.div whileHover={{ scale: 1.2 }}>
							<IconButton component={Link} to="/settings" sx={{ marginRight: "1vw" }}>
								<SettingsOutlinedIcon
									sx={{
										color: "custom.customColorD",
										":hover": {
											color: "custom.customColorE",
										}
									}}
								/>
							</IconButton>
						</motion.div>
						<motion.div whileHover={{ scale: 1.2 }}>
							<IconButton
								component={Link}
								to="/authentication"
								sx={{ marginRight: "1vw" }}
							>
								<AccountCircleIcon
									sx={{
										color: "custom.customColorD",
										":hover": {
											color: "custom.customColorE",
										}
									}}
								/>
							</IconButton>
						</motion.div>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Topbar;
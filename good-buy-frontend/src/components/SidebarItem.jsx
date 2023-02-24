import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { MenuItem } from "react-pro-sidebar";
import { Link as SidebarLink } from "react-router-dom";

const SidebarItem = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.customColors[4]
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography fontWeight="bold" fontSize="1.3vh">{title}</Typography>
			<SidebarLink to={to}/>
		</MenuItem>
	);
};

export default SidebarItem;
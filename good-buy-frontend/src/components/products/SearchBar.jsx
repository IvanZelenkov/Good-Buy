import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { handleKeyDown } from "../../utils/home/utils";

const SearchBar = ({ state, setState, mode, customColors }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				padding: "10px",
				backgroundColor: mode === "dark" ? customColors[6] : customColors[6],
				borderRadius: "10px"
			}}
		>
			<SearchIcon sx={{ fontSize: "28px", color: customColors[1] }}/>
			<InputBase
				sx={{
					marginLeft: 2,
					flex: 1,
					fontFamily: "Montserrat",
					fontSize: "16px",
					fontWeight: "900",
					color: mode === "dark" ? customColors[1] : customColors[1],
					"&::placeholder": {
						color: mode === "dark" ? customColors[1] : customColors[1],
						opacity: "0.6"
					}
				}}
				placeholder="Search for products"
				onKeyDown={(event) => {
					handleKeyDown(event, state, setState);
				}}
				inputlabelprops={{ style: { fontFamily: "Montserrat" } }}
			/>
		</Box>
	);
}

export default SearchBar;
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { filterSearch, handleKeyDown } from "../../utils/home/utils";

const SearchBar = ({ state, setState, navigate, mode, customColors}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				width: "100%"
			}}
		>
			<SearchIcon sx={{ fontSize: "2.5vh", color: customColors[1] }} />
			<InputBase
				sx={{
					marginLeft: 2,
					flex: 1,
					fontFamily: "Montserrat",
					fontSize: "1.3vh",
					fontWeight: "900",
					color: mode === "dark" ? customColors[1] : customColors[1],
					"&::placeholder": {
						color: mode === "dark" ? customColors[1] : customColors[1],
						opacity: "0.6"
					}
				}}
				placeholder="Search for products"
				onKeyDown={(event) => {
					handleKeyDown(event, state, setState, navigate, filterSearch);
				}}
				inputlabelprops={{ style: { fontFamily: "Montserrat" } }}
			/>
		</Box>
	);
}

export default SearchBar;
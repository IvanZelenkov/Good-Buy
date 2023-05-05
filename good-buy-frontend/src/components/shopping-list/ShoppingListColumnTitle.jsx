import { TableCell } from "@mui/material";

const ShoppingListColumnTitle = ({ title, customColors }) => (
	<TableCell
		sx={{
			color: customColors[6],
			fontSize: "18px",
			fontFamily: "Montserrat",
			textAlign: "center",
			fontWeight: "600"
		}}
		align="center"
	>
		{title}
	</TableCell>
);

export default ShoppingListColumnTitle;
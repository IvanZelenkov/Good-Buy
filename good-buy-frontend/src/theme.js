import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

// Color design tokens
export const tokens = (mode) => ({
	...(mode === "dark"
		? {
			customColors: {
				1: "#1C2A33",
				2: "#2c3b50",
				3: "#96ABB7",
				4: "#ACBAC3",
				5: "#DBE2E7",
				6: "#FFFFFF"
			}
		}
		: {
			customColors: {
				1: "#FFFFFF",
				2: "#DBE2E7",
				3: "#ACBAC3",
				4: "#96ABB7",
				5: "#2c3b50",
				6: "#1C2A33"
			}
		})
});

// MUI theme settings
export const themeSettings = (mode) => {
	const colors = tokens(mode);
	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
					// palette values for dark mode
					custom: {
						customColorA: colors.customColors[1],
						customColorB: colors.customColors[2],
						customColorC: colors.customColors[3],
						customColorD: colors.customColors[4],
						customColorE: colors.customColors[5],
						customColorF: colors.customColors[6]
					},
					background: {
						default: colors.customColors[1]
					}
				}
				: {
					// palette values for light mode
					custom: {
						customColorA: colors.customColors[6],
						customColorB: colors.customColors[5],
						customColorC: colors.customColors[4],
						customColorD: colors.customColors[3],
						customColorE: colors.customColors[2],
						customColorF: colors.customColors[1]
					},
					background: {
						default: colors.customColors[1]
					}
				})
		},
		typography: {
			fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 40
			},
			h2: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 32
			},
			h3: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 24
			},
			h4: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 20
			},
			h5: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 16
			},
			h6: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 14
			}
		},
	}
};

// Context for color mode
export const ColorModeContext = createContext({
	toggleColorMode: () => {}
});

export const useMode = () => {
	const [mode, setMode] = useState("light");

	// Setting local storage for theme mode
	useEffect(() => {
		const theme = JSON.parse(localStorage.getItem("theme"));
		if (theme)
			setMode(theme);
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(mode));
	}, [mode]);

	const colorMode = useMemo(() => ({
			toggleColorMode: () =>
				setMode((prev) => (prev === "light" ? "dark" : "light")),
		}),
		[]
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return [theme, colorMode];
};

export function muiTextFieldCSS(themeColor) {
	return {
		"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: themeColor
		},
		"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: themeColor
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: themeColor
		},
		"& .MuiOutlinedInput-input": {
			color: themeColor
		},
		"&:hover .MuiOutlinedInput-input": {
			color: themeColor
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
			color: themeColor
		},
		"& .MuiInputLabel-outlined": {
			color: themeColor
		},
		"&:hover .MuiInputLabel-outlined": {
			color: themeColor
		},
		"& .MuiInputLabel-outlined.Mui-focused": {
			color: themeColor
		}
	}
}

export function muiPaginationCSS(themeColor1, themeColor2) {
	return {
		"& .MuiPaginationItem-root": {
			color: themeColor1,
			marginRight: "2vw",
			'&:hover, &:focus': {
				backgroundColor: themeColor1,
				color: themeColor2
			}
		},
		"& .Mui-selected": {
			color: themeColor2,
			backgroundColor: themeColor1,
			"&:hover &:focus": {
				backgroundColor: themeColor1,
				filter: "brightness(0.75)"
			}
		},
		"& .MuiPaginationItem-page:not(.Mui-selected)": {
			backgroundColor: themeColor2,
			"&:hover": {
				color: themeColor2,
				backgroundColor: themeColor1
			}
		},
		'& .Mui-selected:not(:focus)': {
			backgroundColor: themeColor1,
			color: themeColor2,
			"&:hover": {
				backgroundColor: themeColor1,
				filter: "brightness(0.75)"
			}
		}
	}
}
export const itemData = [
	{
		img: "https://image.api.playstation.com/vulcan/ap/rnd/202302/1623/430628d4872bbaef36b5458880a609af5094ff976778252b.png?w=440&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/156/127/e98c4015-3c83-4363-9af5-a757fad811e1.png?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/156/131/b5bb550a-43da-4561-976d-0791045c928c.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/141/335/e36c6aff-a702-4cdb-a9d3-9218bacfffcd.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/150/222/1d799854-0029-4fc4-a47b-0aea17de4662.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/142/225/b8c9c8a9-ce45-4ec5-bdc0-0ee27ee951b9.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/vulcan/ap/rnd/202211/3017/Oo1B84A7BLCT157YFSxjtwG0.png?w=440&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/141/335/e36c6aff-a702-4cdb-a9d3-9218bacfffcd.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/150/222/1d799854-0029-4fc4-a47b-0aea17de4662.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/142/225/b8c9c8a9-ce45-4ec5-bdc0-0ee27ee951b9.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/vulcan/ap/rnd/202211/3017/Oo1B84A7BLCT157YFSxjtwG0.png?w=440&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/vulcan/ap/rnd/202211/2222/l8QTN7ThQK3lRBHhB3nX1s7h.png?w=440&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/pr/bam-art/142/225/b8c9c8a9-ce45-4ec5-bdc0-0ee27ee951b9.jpg?w=620&thumb=false"
	},
	{
		img: "https://image.api.playstation.com/vulcan/ap/rnd/202303/0712/7719871c99576b38d737dacbcd513359a2f7c187b370e424.png?w=440&thumb=false"
	}
];

export const stores = {
	recommended: [
		{
			name: "Walmart",
			address: "6000 Bullard Ave, New Orleans",
			distance: "19 min (3.1 mi)",
			logo: "walmart-logo.png"
		},
		{
			name: "Walmart",
			address: "8101 W Judge Perez Dr, Chalmette",
			distance: "22 min (3.6 mi)",
			logo: "walmart-logo.png"
		},
		{
			name: "Rouses",
			address: "701 Baronne St, New Orleans",
			distance: "30 min (5 mi)",
			logo: "rouses-logo.png"
		}
	],
	alternate: [
		{
			name: "Winn-Dixie",
			address: "8101 W Judge Perez Dr, Chalmette",
			distance: "22 min (3.6 mi)",
			logo: "winn-dixie-logo.png"
		}
	]
};

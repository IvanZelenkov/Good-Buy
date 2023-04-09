import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

// Color design tokens
export const tokens = (mode) => ({
	...(mode === "dark"
		? {
			grey: {
				100: "#e0e0e0",
				200: "#c2c2c2",
				300: "#a3a3a3",
				400: "#858585",
				500: "#666666",
				600: "#525252",
				700: "#3d3d3d",
				800: "#292929",
				900: "#141414"
			},
			primary: {
				100: "#d0d1d5",
				200: "#a1a4ab",
				300: "#727681",
				400: "#1F2A40",
				500: "#141b2d",
				600: "#101624",
				700: "#0c101b",
				800: "#080b12",
				900: "#040509"
			},
			customColors: {
				1: "#1C2A33",
				2: "#1b2838",
				3: "#96ABB7",
				4: "#DBE2E7",
				5: "#FFFFFF",
				6: "#ACBAC3",
				7: "#ccba7c"
			}
		}
		: {
			grey: {
				100: "#1E1E1E",
				200: "#292929",
				300: "#3d3d3d",
				400: "#525252",
				500: "#666666",
				600: "#858585",
				700: "#a3a3a3",
				800: "#c2c2c2",
				900: "#e0e0e0"
			},
			primary: {
				100: "#040509",
				200: "#080b12",
				300: "#0c101b",
				400: "#f2f0f0",
				500: "#141b2d",
				600: "#1F2A40",
				700: "#727681",
				800: "#a1a4ab",
				900: "#d0d1d5"
			},
			customColors: {
				1: "#FFFFFF",
				2: "#1b2838",
				3: "#96ABB7",
				4: "#FFFFFF",
				5: "#2a475e",
				6: "#ACBAC3",
				7: "#ccba7c"
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
					primary: {
						main: colors.grey[100]
					},
					secondary: {
						main: colors.grey[900]
					},
					custom: {
						customColorA: colors.customColors[1],
						customColorB: colors.customColors[2],
						customColorC: colors.customColors[3],
						customColorD: colors.customColors[4],
						customColorE: colors.customColors[5],
						customColorF: colors.customColors[6],
						customColorG: colors.customColors[7]
					},
					background: {
						default: "#DBE2E7"
					}
				}
				: {
					// palette values for light mode
					primary: {
						main: colors.grey[100]
					},
					secondary: {
						main: colors.grey[900]
					},
					custom: {
						customColorA: colors.customColors[4],
						customColorB: colors.customColors[4],
						customColorC: colors.customColors[4],
						customColorD: colors.customColors[2],
						customColorE: colors.customColors[5],
						customColorF: colors.customColors[6],
						customColorG: colors.customColors[7]
					},
					background: {
						default: colors.customColors[5]
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
	const [mode, setMode] = useState("dark");

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

export const muiPaginationCSS = {
	"& .MuiPaginationItem-root": {
		color: "#1C2A33",
		marginRight: "2vw",
		'&:hover, &:focus': {
			backgroundColor: '#1C2A33',
			color: '#DBE2E7'
		}
	},
	"& .Mui-selected": {
		color: "#DBE2E7",
		backgroundColor: "#1C2A33",
		"&:hover &:focus": {
			backgroundColor: "#1C2A33",
			filter: "brightness(0.75)"
		}
	},
	"& .MuiPaginationItem-page:not(.Mui-selected)": {
		backgroundColor: "#FFFFFF",
		"&:hover": {
			color: "#DBE2E7",
			backgroundColor: "#1C2A33"
		}
	},
	'& .Mui-selected:not(:focus)': {
		backgroundColor: '#1C2A33',
		color: '#FFFFFF',
		"&:hover": {
			backgroundColor: "#1C2A33",
			filter: "brightness(0.75)"
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


export const itemData1 = [
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
	}
];

export const itemData2 = [
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
];

export const itemData3 = [
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
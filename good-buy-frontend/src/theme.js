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
				3: "#2a475e",
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
				3: "#2a475e",
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
		}
	};
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

export const muiTextFieldCSS = {
	"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
		borderColor: "#1C2A33"
	},
	"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
		borderColor: "#1C2A33"
	},
	"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "#1C2A33"
	},
	"& .MuiOutlinedInput-input": {
		color: "#1C2A33"
	},
	"&:hover .MuiOutlinedInput-input": {
		color: "#1C2A33"
	},
	"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
		color: "#1C2A33"
	},
	"& .MuiInputLabel-outlined": {
		color: "#1C2A33"
	},
	"&:hover .MuiInputLabel-outlined": {
		color: "#1C2A33"
	},
	"& .MuiInputLabel-outlined.Mui-focused": {
		color: "#1C2A33"
	}
}
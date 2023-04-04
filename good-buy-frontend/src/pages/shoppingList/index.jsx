import { motion } from "framer-motion";
import * as React from 'react';
// import React, { Component } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ShoppingList = () => {
	return (
		<div
			className = "List-Container"
			>
				
			<h2 style = {{color:"black", textAlign: "center", fontSize: 50}}>ShoppingList</h2>	

			<Grid container spacing={5}
				justifyContent = "center"
				display = "flex"
				alignItems = "stretch"
				direction = "row">
  				<Grid item xs={1}>
				  	<Box style = {{color: "black"}}>itemname</Box>

  				</Grid>
  				<Grid item xs={4.5}>
    				<Box style = {{color: "black"}}>itemname</Box>
  				</Grid>
  				<Grid item xs ={1}>
    				<Box style = {{color: "black"}}>checkbox</Box>
  				</Grid>
				<Grid item xs ={4.5}>
					<Box style = {{color: "black"}}>itemname</Box>
				</Grid>
			</Grid>

			<div>
				<Checkbox {...label} defaultChecked />
				<Checkbox {...label} />
				<Checkbox {...label} disabled />
				<Checkbox {...label} disabled checked />
			</div>

		</div>



	);
}

export default ShoppingList;
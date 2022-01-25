import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordComponent = ({ title, label, setPassword }) => {
	const [values, setValues] = useState({
		password: "",
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		setPassword(event.target.value);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	return (
		<div>
			<FormControl variant="outlined" className="passwordComponent__password">
				<InputLabel htmlFor="outlined-adornment-password">{title}</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type={values.showPassword ? "text" : "password"}
					value={values.password}
					onChange={handleChange("password")}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{values.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					label={label}
				/>
			</FormControl>
		</div>
	);
};

export default PasswordComponent;

import React, { useState } from "react";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const AddCar = (props) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "", 
        registerNumber: "",  
        year: "",  
        price: ""
      });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleClickSave = () => {
        props.addCar(car);
        handleClickClose();
    }

    const handleChange = (event) =>{
        setCar({...car, [event.target.name]: event.target.value})
    }
    

    return (
        <div style={{marginTop: "50px"}}>
            <Button variant="contained" onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>New car</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Brand" name="brand" autoFocus variant="standard" value={car.brand} onChange={handleChange}/>
                    <TextField label="Model" name="model" autoFocus variant="standard" value={car.model} onChange={handleChange}/> 
                    <TextField label="Color" name="color" autoFocus variant="standard" value={car.color} onChange={handleChange}/> 
                    <TextField label="Year" name="year" autoFocus variant="standard" value={car.year} onChange={handleChange}/> 
                    <TextField label="Price" name="price" autoFocus variant="standard" value={car.price} onChange={handleChange}/>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClickClose}>Cancel</Button>
                <Button onClick={handleClickSave}>Save</Button>
            </DialogActions>
            </Dialog>            
      </div>
    )
}

export default AddCar
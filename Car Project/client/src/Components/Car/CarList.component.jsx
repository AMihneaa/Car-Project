import React, { useEffect, useState } from "react";
 
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from "@mui/x-data-grid";

import { Stack } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete"

import { SERVER_URL } from "../Scripts/constant";
import AddCar from "./AddCar.component";
import EditCar from "./EditCar.component";

const CarList = () =>{

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const token = sessionStorage.getItem("jwt");

    if (token == null){
        window.location.replace("/login");
    }

    const getCars = async () =>  {
        try{
            const token = await sessionStorage.getItem("jwt");
            const response = await fetch(SERVER_URL + 'api/cars',{
                    headers: { 'Authorization' : token }
                }
            );
            const data = await response.json();
            
            setCars(data._embedded.cars);
        }catch ( error ){
            alert(error);
        }
    }

    useEffect( () => {
        getCars();
    }, [])


    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'year', headerName: 'Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =><EditCar data={row} updateCar={updateCar} />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =><IconButton onClick={() => onDeleteClick(row.id)}><DeleteIcon color="error" /></IconButton>
        }
    ];

    const onDeleteClick = async (url) => {

        try {
            if (window.confirm("Are you sure?")) {
                const token = await sessionStorage.getItem("jwt");
                const response = await fetch(url, { method: 'DELETE', headers: { 'Authorization' : token } });
        
                if (response.ok) {
                    getCars();
                    setOpen(true);
                }
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            alert(error);
        }
        
    }

    const addCar = async (car) => {
        try{
            const token = await sessionStorage.getItem("jwt");
            const response = await fetch(SERVER_URL + 'api/cars',
                                {
                                     method: 'POST',
                                      headers: 
                                                {
                                                    'Content-Type':'application/json',
                                                    'Authorization' : token,
                                                },
                                body: JSON.stringify(car)
                                }
                                
            );

            if(response.ok){
                getCars();
            }
            else{
                throw new Error("Something went wrong. You can't add a car at the moment. Please try again later.")
            }

        }catch ( error ){
            alert(error);
        }
    }

    const updateCar = async (car, link) => {
        try {
            const token = await sessionStorage.getItem("jwt");
            const response = await fetch(link, 
                {
                    method: "PUT",
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization' : token
                    },
                    body: JSON.stringify(car)
                }
            );

            if (response.ok){
                getCars();
            }
            else {
                throw new Error("Something went wrong. You can't modify the car at the moment. Please try again later.");
            }
        } catch (error) {
            alert(error);
        }
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <React.Fragment >
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar} />
            </Stack>
            <div style={{ height: 500, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px' }}>
                <DataGrid 
                rows={cars} 
                columns={columns} 
                disableSelectionOnClick={true}
                getRowId={row => row._links.self.href}
                components={{Toolbar: CustomToolbar}}
                />
                <Snackbar
                    open = {open}
                    autoHideDuration = {2000}
                    onClose = {() => setOpen(false)}
                    message = "Car deleted"
                />
            </div>
        </React.Fragment>
    );
    
}

export default CarList;

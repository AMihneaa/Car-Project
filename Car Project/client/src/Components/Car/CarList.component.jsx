import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import Snackbar from '@mui/material/Snackbar';

import { SERVER_URL } from "../Scripts/constant";

const CarList = () =>{

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    const getCars = async () =>  {
        const response = await fetch(SERVER_URL + 'api/cars');
        const data = await response.json();
        
        console.log(data._embedded.cars);
        setCars(data._embedded.cars);
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
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
            <button
            onClick={() => onDeleteClick(row.id)}>Delete
            </button>
        }
    ];

    const onDeleteClick = async (url) => {

        if (window.confirm("Are you sure?")) {
            const response = await fetch(url, {method: 'DELETE'})

            if (response) {
                getCars(); 
                setOpen(true);
        }
     }

    }



    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid 
            rows={cars} 
            columns={columns} 
            disableSelectionOnClick={true}
            getRowId={row => row._links.self.href}
            />
            <Snackbar
                open = {open}
                autoHideDuration = {2000}
                onClose = {() => setOpen(false)}
                message = "Car deleted"
             />
            {/* <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Car deleted"
            /> */}
      </div>
    );
    
}

export default CarList;

import React, { useState } from "react";

import { SERVER_URL } from "../Scripts/constant";
import { Stack, TextField, Button } from "@mui/material";

const Register = () => {

    const [user, setUser] = useState(
        {
            username: "",
            password: ""
        }
    );

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
      }

    const handleRegister = async () => {
        try{
            const response = await fetch (SERVER_URL + 'api/register', {
                method: "POST",
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(user)
            })

            if (response.status === 400) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            if (!response.ok){
                throw new Error("Unfortunately, you cannot register an account at this time. Please try again later!");
            }

            window.location.replace("/login");
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <Stack spacing={2} mt={2} alignItems="center">
                <TextField label="Username" name="username" onChange={handleChange}/>
                <TextField label="Password" name="password" onChange={handleChange}/>
                <Button variant="outline" color="primary" onClick={handleRegister}>Register</Button>
            </Stack>
        </div>
    );

}

export default Register;
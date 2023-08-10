import React, {useState} from "react";

import { SERVER_URL } from "../Scripts/constant";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Login = () => {

    const [user, setUser] = useState(
        {
            username: "",
            password: ""
        }
    );

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
      }

    const handleLogin = async () => {
        try{

            const response = await fetch(SERVER_URL + 'login', 
                    {
                        method: 'POST',
                        headers: { 'Content-Type':'application/json' },
                        body: JSON.stringify(user)
                    }
            )
            
            if (!response.ok){
                throw new Error("Authorization denied");
            }

            const jwtToken = await response.headers.get("Authorization");

            const tokenWithoutBearer = jwtToken.split(" ")[1];
            if (jwtToken != null){
                sessionStorage.setItem("jwt", tokenWithoutBearer);
                setIsAuthenticated(true);
            }
            else{
                throw new Error("Login failed");
            }

        }catch(error){
            alert(error);
        }
    }

    const handleRedirectRegister = () => {
        window.location.replace("/register");
    }

    if (isAuthenticated){
        window.location.replace("/");
    }
    else{
    
        return (
            <div>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField name="username" label="Username" onChange={handleChange}/>
                    <TextField name="password" label="Password" onChange={handleChange}/>
                    <Button variant="outline" color="primary" onClick={handleLogin}>Login</Button>
                    <Button variant="outline" color="primary" onClick={handleRedirectRegister}>Register</Button>
                </Stack>
            </div>
        )

    }

}

export default Login;
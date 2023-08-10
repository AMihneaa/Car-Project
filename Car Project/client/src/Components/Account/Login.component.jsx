import React, {useState} from "react";

import { SERVER_URL } from "../Scripts/constant";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CarList from "../Car/CarList.component";

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

            const jwtToken = await response.headers.get("Authorization");

            const tokenWithoutBearer = jwtToken.split(" ")[1];
            if (jwtToken != null){
                sessionStorage.setItem("jwt", tokenWithoutBearer);
                setIsAuthenticated(true);
            }
            else{
                throw new Error("Authorization denied");
            }

        }catch(error){
            alert(error);
        }
    }
    
    if (isAuthenticated){
        return <CarList />
    }
    else{
    
        return (
            <div>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField name="username" label="Username" onChange={handleChange}/>
                    <TextField name="password" label="Password" onChange={handleChange}/>
                
                    <Button variant="outline" color="primary" onClick={handleLogin}>Login</Button>
                </Stack>
            </div>
        )

    }

}

export default Login;
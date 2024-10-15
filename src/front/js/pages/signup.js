import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";


export const SignUp = () => {
	const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ pw, setPw ] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpointUrl = `${process.env.BACKEND_URL}/api/signup`
    
        const serverResponse = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: pw
            })
        });

        const jsonResult = await serverResponse.json();
        console.log("El servidor ha respondido");
        console.log(jsonResult);
    }
    
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const handleChangePw = (event) => {
        setPw(event.target.value);
    }

	return (
		<div className="text-center mt-5">
			<form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your email address..." value={email} onChange={handleChangeEmail} />
                <input type="password" placeholder="Enter your password..." value={pw} onChange={handleChangePw} />
                <input type="submit" value="SignUp" />
            </form>
		</div>
	);
};

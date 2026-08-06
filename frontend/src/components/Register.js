import { useState } from "react";
import { registerUser } from "../api";

// this is the register component
function Register() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    // shows success or error message
    const [message, setMessage] = useState("");

    function handleRegister(event) {

        // stop page refresh
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        // call backend register api
        registerUser(user)

            .then(function (response) {

                setMessage(response.data);

                setUsername("");

                setPassword("");

            })

            .catch(function (error) {

                console.log(error);

                if (error.response) {

                    setMessage(error.response.data);

                } else {

                    setMessage("Registration Failed");

                }

            });

    }

    return (

        <div className="card">

            <h2>Register</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={function (event) {
                        setUsername(event.target.value);
                    }}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={function (event) {
                        setPassword(event.target.value);
                    }}
                    required
                />

                <button type="submit">

                    Register

                </button>

            </form>

            <p className="message">

                {message}

            </p>

        </div>

    );

}

export default Register;

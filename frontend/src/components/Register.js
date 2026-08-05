import { useState } from "react";
import { loginUser } from "../api";

// this is the login component
function Login({ setLoggedIn }) {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    // for success or error messages
    const [message, setMessage] = useState("");

    function handleLogin(event) {

        // stop the page from refreshing when we click submit
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        // calling the backend api here
        loginUser(user)

            .then(function (response) {

                // saving token to local storage so we stay logged in
                localStorage.setItem("token", response.data.token);

                setMessage("Login Successful");

                setLoggedIn(true);

            })

            .catch(function () {

                // error handling
                setMessage("Invalid Username or Password");

            });

    }

    return (

        <div className="card">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

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

                    Login

                </button>

            </form>

            <p className="message">

                {message}

            </p>

        </div>

    );

}

export default Login;
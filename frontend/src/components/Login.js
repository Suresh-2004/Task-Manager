import { useState } from "react";
import { loginUser } from "../api";

function Login({ setLoggedIn }) {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    function handleLogin(event) {

        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        loginUser(user)

            .then(function (response) {

                localStorage.setItem("token", response.data.token);

                setMessage("Login Successful");

                setLoggedIn(true);

            })

            .catch(function () {

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
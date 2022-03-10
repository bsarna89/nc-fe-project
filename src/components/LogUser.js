import React from 'react';
import { useContext, useState, useEffect } from "react";
import { userContext } from '../context/Context';
import { fetchUser } from '../utils/api';
import Loader from './Loader';

const LogUser = () => {

    const { loggedInUser } = useContext(userContext);
    const { setLoggedInUser } = useContext(userContext);

    const [userLogged, setUserLogged] = useState(loggedInUser.username);

    const [validUser, setValidUser] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [defaultUser, setDefaultUser] = useState("grumpy19");
    const [defaultPassword, setDefaultPassword] = useState("password");

    const [userExists, setUserExists] = useState(false);
    const [signUpIvnalid, setSignUpInvalid] = useState(false);
    const [deafultSignupUsername, setDefaultSignupUsername] = useState("username");
    const [deafultSignupPassword, setDefaultSignupPassword] = useState("your password");
    const [deafultSignupName, setDefaultSignupName] = useState("your full name");

    const [logInButton, setLogInButton] = useState(false);
    const [signUpButton, setSignUpButton] = useState(false);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => { },
        [
            userLogged,
            validUser,
            validPassword,
            userExists,
            signUpIvnalid,
            isLoading,
        ])


    const handleLogInButton = (event) => {

        setLogInButton(true);
        setSignUpButton(false);
        setSignUpInvalid(false);
    }

    const handleSignUpButton = (event) => {

        setSignUpButton(true);
        setLogInButton(false);
        setValidUser(true);
        setValidPassword(true);
    }

    const handleLogOutButton = (event) => {

        setLoggedInUser({});
        setUserLogged();
        setValidPassword(true);
        setValidUser(true);
    }

    const handleTryAgainButton = () => {

        setValidPassword(true);
        setValidUser(true);
        setUserExists(false);
        setSignUpInvalid(false);
    }

    const handleLogInSubmit = (event) => {

        event.preventDefault();
        setLoading(true);
        const userName = event.target[0].value;
        const password = event.target[1].value;


        fetchUser(userName).then(({ user }) => {

            if (password !== "password") {
                setValidPassword(false);
                setLoading(false);
                return;
            }

            setLoggedInUser(user);
            setUserLogged(user.username);
            setSignUpButton(false);
            setLogInButton(false);
            setLoading(false);
        }).catch((err) => {

            setValidUser(false);
            setLoading(false);
        })

        event.target[0].value = "";
        event.target[1].value = "";
    }

    const handleSignUpSubmit = (event) => {

        event.preventDefault();
        console.log(event, "sign up submit");
        setLoading(true);

        const params = []
        for (let i = 0; i < 4; i++) {
            params.push(event.target[i].value);
        }

        fetchUser(params[0]).then((user) => {
            setUserExists(true);
            setLoading(false);
        }).catch((err) => {

            console.log(params, "error when user does no exist");
            if (!params[0] || !params[1] || !params[3]) {
                setSignUpInvalid(true);
            } else {
                //posting new user, BE endpoint needs to be implemented
            }
            setLoading(false);

        })
    }

    const handleChange = (event) => {
        if (event.target.id === "username") setDefaultUser(event.target.value);
        if (event.target.id === "password") setDefaultPassword(event.target.value);
    }

    const handleSignUpChange = (event) => {

        if (event.target.id === "username_signup") setDefaultSignupUsername(event.target.value);
        if (event.target.id === "password_signup") setDefaultSignupPassword(event.target.value);
        if (event.target.id === "name_signup") setDefaultSignupName(event.target.value);
    }

    if (isLoading) return (<Loader> </Loader>);

    return (
        <div>

            {userLogged &&
                <div>
                    <button onClick={handleLogOutButton}> Log Out </button>
                    <p> Hello {loggedInUser.name} </p>
                    <div >
                        <img className='user_img' src={loggedInUser.avatar_url} alt="avatar_img"></img>
                    </div>
                </div>
            }

            {!userLogged &&
                <div>
                    <button onClick={handleLogInButton}> Log In </button>
                    <button onClick={handleSignUpButton}> Sign up </button>
                </div>
            }

            {logInButton && !userLogged &&

                <div>
                    <form onSubmit={handleLogInSubmit}>
                        <legend> Username </legend>
                        <input onChange={handleChange} value={defaultUser || ""} type="text" id="username"></input>
                        <legend>Password</legend>
                        <input onChange={handleChange} value={defaultPassword || ""} type="password" id="password"></input>
                        <br></br><button type="submit"> Submit </button>
                    </form>

                    {!validUser &&
                        <div>
                            <p> User does not exists </p>
                            <button onClick={handleTryAgainButton}> Clear</button>
                        </div>

                    }
                    {!validPassword &&
                        <div>
                            <p> Not valid password </p>
                            <button onClick={handleTryAgainButton}> Clear</button>
                        </div>

                    }
                </div>
            }
            {signUpButton && !userLogged &&
                // not working not BE endpoint needs to be implemented
                <div>
                    <form onSubmit={handleSignUpSubmit}>
                        <legend> Username * </legend>
                        <input onChange={handleSignUpChange} value={deafultSignupUsername || ""} type="text" id="username_signup"></input>
                        <legend> Name * </legend>
                        <input onChange={handleSignUpChange} value={deafultSignupName || ""} type="text" id="name_signup"></input>
                        <legend> Avatar Url </legend>
                        <input type="text" id="avatar_url"></input>
                        <legend>Password *</legend>
                        <input onChange={handleSignUpChange} value={deafultSignupPassword || ""} type="password" id="password_signup"></input>
                        <br></br><button type="submit"> Submit </button>
                    </form>
                    {userExists &&
                        <div>
                            <p> User already exists </p>
                            <button onClick={handleTryAgainButton}> Try again</button>
                        </div>
                    }
                    {signUpIvnalid &&
                        <div>
                            <p> Plese fill required fileds (*) </p>
                            <button onClick={handleTryAgainButton}> Try again</button>
                        </div>
                    }
                </div>
            }

        </div>
    );
};

export default LogUser;
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

    const [userExists, setUserExists] = useState(false);
    const [signUpIvnalid, setSignUpInvalid] = useState(false);

    const [logInButton, setLogInButton] = useState(false);
    const [signUpButton, setSignUpButton] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {

        if (userLogged) {
            console.log("user logged");
        }
        else {
            console.log("user not logged");
        }

    }, [userLogged, validUser, validPassword, userExists, signUpIvnalid, isLoading])


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

            if (!params[0] || !params[1] || !params[3]) {
                setSignUpInvalid(true);
            } else {

            }
            setLoading(false);
            console.log(params, "error");
        })
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
                        <input type="text" id="username"></input>
                        <legend>Password</legend>
                        <input type="password" id="password"></input>
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

                <div>
                    <form onSubmit={handleSignUpSubmit}>
                        <legend> Username * </legend>
                        <input type="text" id="username"></input>
                        <legend> Name * </legend>
                        <input type="text" id="name"></input>
                        <legend> Avatar Url </legend>
                        <input type="text" id="avatar_url"></input>
                        <legend>Password *</legend>
                        <input type="password" id="password_sign_up"></input>
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
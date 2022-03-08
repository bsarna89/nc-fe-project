import React from 'react';

const ErrorComp = (error) => {
    console.log(error);

    const len = Object.keys(error).length;
    const status = (len > 0) ? error.message.err.response.status : "Can't find resource";
    const message = (len > 0) ? error.message.err.response.statusText : "You requested";

    return (
        <div>
            <p> Ouups something gone wrong</p>
            <p> {status}  {message} </p>
        </div>
    );
};

export default ErrorComp;
import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../util/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const _login = {
    username: "Lambda School",
    password: "i<3Lambd4"
  }
  const [creds, setCreds] = useState(_login)
  const history = useHistory()

  const logMeIn = e => {
    e.preventDefault()
    axiosWithAuth().post('/api/login', creds)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
      history.push('/bubbles')
      })
      .catch(err => {
        console.log(err, "incorrect login")
      })
  }

  const handleEvent = e => {
    e.persist()
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="login">
        <form onSubmit={logMeIn}>
          <input
            type="text"
            name="username"
            value={creds.username}
            onChange={handleEvent}
            placeholder="Lambda School"
          />
          <input
            type="password"
            name="password"
            value={creds.password}
            onChange={handleEvent}
            placeholder="i<3Lambd4"
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;

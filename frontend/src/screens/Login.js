import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  let navigate = useNavigate();

  const [credentials, setCredential] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    // console.log(json);

    if (json.success) {
      // console.log("inside login");
      // console.log(json.bookmark);
      localStorage.setItem('bookmark', JSON.stringify(json.bookmark));
      localStorage.setItem('userId', JSON.stringify(json.id));
      navigate('/');
    } else {
      alert("Enter Correct Credentials");
    }

  };

  const onchange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/Signup" className='m-3 btn btn-danger'>I'm a new User</Link>
        </form>
      </div>
    </div>
  )
}

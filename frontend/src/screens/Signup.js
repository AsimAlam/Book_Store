import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

  let navigate = useNavigate();

  const [crendential, setCredential] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: crendential.name, email: crendential.email, password: crendential.password })

    });

    const res = await response.json();
    // console.log(res);

    if(res.userExist){
      alert("User Already Exist");
    }else if (!res.success) {
      alert("Enter Correct Credentials");
    } else {
      // console.log("inside signup");
      navigate("/login");
    }

  };

  const onChange = (e) => {
    setCredential({ ...crendential, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={crendential.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={crendential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={crendential.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/Login" className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </div>
  )
}

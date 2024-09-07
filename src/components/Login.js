import React , { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Login() {
  const [x, setX] = useState({ name: "", email: "", password: ""});
  const onChange = (event) => {
    setX({ ...x, [event.target.name]: event.target.value })
  }
  const navigate=useNavigate();
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:x.email,password:x.password})
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail",x.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }
  return (
    <div className='container'>
      <h2 style={{textAlign:"center",paddingTop:"100px",color:'yellow',marginBottom:"30px"}}>Login</h2>
      <div className='loginBox'>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <div>
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={x.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" style={{display:"block",width:"300px"}}/>
            </div>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={x.password} onChange={onChange} id="exampleInputPassword1" style={{display:"block",width:"300px"}}/>
          </div>
          <Link to="/signup" className='m-3 btn' style={{color:'grey'}}>I am a new user</Link>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
         
        </form>
      </div>
    </div>
  )
}

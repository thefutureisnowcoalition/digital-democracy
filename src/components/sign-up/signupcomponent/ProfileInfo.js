import React from 'react';
import axios from "axios";

function ProfileInfo({user, setUser, page, setPage}){
    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
        ...user,//spread operator 
        [name]:value
        })
    };

    const signup = ()=>{
      const {name,email,password, address, interests} = user
      if (name && email && password){
        axios.post("http://localhost:8000/signup",user )
        .then(res=>console.log(res))
        setPage(page + 1)
      }
      else{
          alert("invalid input")
      }
      setPage(page + 1)
    };

    return ( 
        <div class="row text-center">
            <div class="col-md-12">
                Create a new account
            </div>
            <span class="col-md-12">
                Already have an account?
                <a href="/login" class="link-primary">
                    Login
                </a>
            </span>
            <div class="col-md-12">
                <form action="#">
                    <div class="container w-25">
                        <div class="input-group">
                            <input type="text" class="form-control" name="name" value={user.name} onChange={handleChange} placeholder="Full Name"/>
                        </div>
                      </div>
                      <div class="container w-25">
                        <div class="input-group">
                          <input type="text" class="form-control" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>
                        </div>
                      </div>
                      <div class="container w-25">
                        <div class="input-group">
                          <input type="password" class="form-control" name="password" value={user.password} onChange={handleChange} placeholder="password"/>
                        </div>
                      </div>
                      <div class="container">
                        <button type="submit" onClick={signup} >
                          Sign up
                        </button>
                      </div>
                </form>
      
      
            </div>
        </div>
      
        )
        } 

export default ProfileInfo

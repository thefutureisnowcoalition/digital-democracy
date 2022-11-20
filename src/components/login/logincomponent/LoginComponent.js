import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function LoginComponent ({setLoginUser}) {
    const navigate = useNavigate()
    const [user,setUser] = useState({
        name:"",
        password: ""
    })
    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
        ...user,//spread operator 
        [name]:value
        })
    };

    const navigateToHome = ()=>{
        navigate('/')
    };        

    const login =()=>{
        axios.post("http://localhost:8000/login",user)
        .then(res=>{
            alert(res.data.message);
            setLoginUser(res.data.user);
            navigateToHome();
        })
    };

    return (
        <div class="row text-center">
            <div class="col-md-12">
                Login To Your Account
            </div>
            <div class="form-group row">
                <form action="#" autoComplete="off">
                    <div class= "container w-25">
                        <div class="input-group col-xs-4">
                            <input type="text" class="form-control" name="email" value={user.email}  onChange={handleChange} placeholder="Your email"/>
                        </div>
                    </div>
                    <div class="container w-25">
                        <div class="input-group col-xs-4">
                            <input type="password" class="form-control" name="password" value={user.password}  onChange={handleChange} placeholder="Your password"/>
                        </div>
                    </div>
                    <div class="container">
                        <div class="container">
                            <a href="#" class="link-primary">
                                Forgot Your Password?
                            </a>
                        </div>
                    </div>
                    <div class="container">
                        <button type="submit" onClick={() => login()}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-md-12">
                <button type="button" class="btn btn-link" onClick={() => navigate('/signup')}>
                    Don't have an account?
                </button>
            </div>
        </div>
    )
    }
export default LoginComponent
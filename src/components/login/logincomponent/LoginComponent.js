import React,{useState, useRef} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLoginComponent from '../../sign-up/signupcomponent/GoogleLogin';

function LoginComponent ({setLoginUser}) {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"",
        password: ""
    });
    const recaptchaRef = useRef(null);

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
        ...user,//spread operator 
        [name]:value
        });
    }

    const navigateToHome = ()=>{
        navigate('/');
    }
    
    const handleRecaptcha = async (e) => {
        e.preventDefault();
        const token = await recaptchaRef.current.executeAsync();
        console.log(token);
        recaptchaRef.current.reset();
        await axios.post("http://localhost:8000/recaptcha", {token})
        .then(res =>  console.log(res))
        .catch((error) => {
        console.log(error);
        })
    }

    const login =()=>{
        console.log("logging in");
        axios.post("http://localhost:8000/login",user)
        .then(res=>{
            alert(res.data.message);
            if (res.status === 200){
                setLoginUser(res.data.user);
                navigateToHome();
            }
            })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    return (
        <div className="row text-center">
            <div className="col-md-12">
                Login To Your Account
            </div>
            <div className="container w-25" >
                <GoogleLoginComponent setLoginUser={setLoginUser}>
                </GoogleLoginComponent>
            </div>
            <div className="form-group row">
                <form action="#" autoComplete="off">
                    <p>
                        Or enter email and password
                    </p>
                    <div className= "container w-25">
                        <div className="input-group col-xs-4">
                            <input type="text" autoComplete="email" className="form-control" name="email" value={user.email}  onChange={handleChange} placeholder="Your email"/>
                        </div>
                    </div>
                    <div className="container w-25">
                        <div className="input-group col-xs-4">
                            <input type="password" autoComplete="current-password" className="form-control" name="password" value={user.password}  onChange={handleChange} placeholder="Your password"/>
                        </div>
                    </div>
                    <div className="container">
                        <div className="container">
                            <a href="#" className="link-primary">
                                Forgot Your Password?
                            </a>
                        </div>
                    </div>
                    <div className="container">
                        <ReCAPTCHA
                            size="invisible"
                            sitekey="6Lf02yQjAAAAACG2joKuBxO9nGQBjTvBmHpU4AY_"
                            ref={recaptchaRef}
                            onChange={login}
                        />
                        <button type="submit" onClick={handleRecaptcha}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-md-12">
                <button type="button" className="btn btn-link" onClick={() => navigate('/signup')}>
                    Don't have an account?
                </button>
            </div>
        </div>
    )
    }
export default LoginComponent
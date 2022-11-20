import React, { useEffect } from 'react';
import axios from "axios";

function Interests({user, setUser, page, setPage}){
    const handleChange = () => {
        console.log("handle change")
        var array = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        setUser({
            ...user,//spread operator 
            interests: array
            })
    }
    
    const updateInfo = () => {
        const {name,email,password, address, interests} = user
        if (name && email && password){
          axios.put("http://localhost:8000/user",user )
          .then(res=>console.log(res))
        }
        else{
            alert("invalid input")
        }
    }

    const previous = () => {
        setPage(page - 1)
    };


    const interestOptions = ['technology', 'economy', 'environment'];

    useEffect(() => {
        const interests = document.getElementById('interests')
        if (interests.children.length=== 0){
            for (var i = 0; i < interestOptions.length; i++){
                var x = document.createElement("INPUT");
                x.setAttribute("type", "checkbox");
                x.setAttribute('class', 'btn-check');
                x.value = interestOptions[i];
                x.id = 'checkbox-' + interestOptions[i];
                x.addEventListener('click',handleChange);
                var y = document.createElement('LABEL');
                y.textContent = interestOptions[i];
                y.setAttribute('class', 'btn btn-primary');
                y.setAttribute('for', x.id);
                interests.appendChild(x);
                interests.appendChild(y);
            }
        }
        console.log('added buttons')
    });

    return ( 
        <div class="row text-center">
            <div class="col-md-12">
                Interests
            </div>
            <div class="col-md-12">
                <form action="#">
                      <div class="input-group d-inline-flex flex-column w-25" id="interests">
                      </div>
                      <div>
                        Checked interests: {user.interests.toString()}
                      </div>
                      <div class="container">
                        <button type="submit" onClick={previous} >
                          Previous
                        </button>
                        <button type="submit" onClick={updateInfo} >
                          Finish
                        </button>
                      </div>
                </form>
            </div>
        </div>
      
        )  
}

export default Interests
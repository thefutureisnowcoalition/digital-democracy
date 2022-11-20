import React from 'react';
import "./Address.css";

function Address({user, setUser, page, setPage}){

    function setSuggestions(input) {

        clearSuggestions();
        const storeSuggestions = function (predictions, status) {
            if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
              alert(status);
              return;
            }
        
            const dropdownlist = document.getElementById('dropdownlist')
            predictions.forEach((prediction) => {
                var item = document.createElement('li')
                item.setAttribute('class', 'list-group-item');
                item.addEventListener('click',handleSelection);
                item.appendChild(document.createTextNode(prediction.description))
                dropdownlist.appendChild(item)
            });
          };

        const autocomplete = new window.google.maps.places.AutocompleteService();
        autocomplete.getPlacePredictions({ input: input, types: ["address"] }, storeSuggestions);
        
        console.log('added dropdown')
    }

    function clearSuggestions() {
        const dropdownlist = document.getElementById('dropdownlist')
        while (dropdownlist.firstChild) {
            dropdownlist.removeChild(dropdownlist.firstChild);
        }
    }

    function deployDropdown() {
        console.log("Showing Dropdown");
        var dropdown = document.getElementById("suggestions");
        dropdown.classList.add("show");
        dropdown.classList.remove("hide");
      }
    function hideDropdown() {
        console.log("Hiding Dropdown");
        var dropdown = document.getElementById("suggestions");
        dropdown.classList.add("hide");
        dropdown.classList.remove("show");
      }

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
        ...user,//spread operator 
        [name]:value
        });
        if (name == "address"){
            if (value == ""){
                clearSuggestions();
            }
            else {
            setSuggestions(value);
            }
        };
        
    };

    const handleClick = e => {
        const {name,value} = e.target;
        if (name == "address"){
            setUser({
                ...user,//spread operator 
                zipcode: ""
                });
            deployDropdown();
        }
        if (name == "zipcode"){
            clearSuggestions();
            setUser({
                ...user,//spread operator 
                address: ""
                })
        }
    };

    const handleSelection = e => {
        const value = e.target.textContent;
        setUser({
        ...user,//spread operator 
        address:value
        });
        console.log("selection made")
    }


    window.onclick = e => {
        const {name,value} = e.target;
        if (name == "address"){
            return;
        }
        else {
            hideDropdown();
        }
      };
    
    const next = () => {
        if (user.address || user.zipcode){
            setPage(page + 1)
        }
        else {
            alert("Invalid input")
        }
    };
    const previous = () => {
        setPage(page - 1)
    };

    return ( 
        <div class="row text-center">
            <div class="col-md-12">
                <form action="#">
                    <div class="container w-25 position-relative">
                        <div>
                            Full Street Address
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" name="address" value={user.address} onClick={handleClick} onChange={handleChange} placeholder="Street Address"/>
                        </div>
                        <div id="suggestions" class="position-absolute w-100">
                            <ul id="dropdownlist" class="list-group">
                            </ul>
                        </div>
                        <div>
                            Or ZIP Code only for limited features
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" name="zipcode" value={user.zipcode} onClick={handleClick} onChange={handleChange} placeholder="ZIP Code"/>
                        </div>
                      </div>
                      <div class="container">
                        <button type="submit" onClick={previous} >
                          Previous
                        </button>
                        <button type="submit" onClick={next} >
                          Next
                        </button>
                        
                      </div>
                </form>
            </div>
        </div>
      
        )  
}

export default Address
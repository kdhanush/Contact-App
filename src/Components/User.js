 import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./User.css";
// import Createprofile from "./Createprofile";

 function User(){

    // const [newInput,setNewInput] = useState([]);


    // function addInput(event){
    //     setNewInput(prevInput => {
    //         return [...prevInput, input];
    //       });
          
    //       event.preventDefault();
    //       setInput({
    //         name:"",
    //         email:"",
    //         phone:"",
    //         address:""
    //       })

    // }


     return(
         <div className="details">
        <p>Dhanush</p>
        <p>dhanushk1998@gmail.com</p>
        <div className='User-Icons'>
            <button className='pen-icon'>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <button
                className='trash-icon'
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
         </div>
     );
 }

 export default User;
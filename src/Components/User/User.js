import React from "react";
import "./userprofile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope, faPhoneAlt, faUser, faVenusMars } from '@fortawesome/free-solid-svg-icons';

// import Createprofile from "./Createprofile";




function User(props) {

    return (
        <div className="background" style={{display:"flex",flexDirection:"column"}} >
            <div style={{margin:"30px 20px 10px auto"}}><button className="closebtn" onClick={props.showDetails}>X</button></div>
            <div className="Main-container">
                <div className="header-box" >
                    <div className="profile-image">
                        {props.passedItem.imageUrl?<img className="profileImage" src={props.passedItem.imageUrl} alt="Image not found" width="150px" height="150px" ></img>:<i className="fa fa-9x fa-user defaultImage" aria-hidden="true" ></i>}
                    </div>
                    <div className="user-name">
                        <p>{props.passedItem.name}</p>
                    </div>
                </div>
                <div className="border-line"></div>
                <div className="footer">
                    <div className="detail-container">
                        <div className="title-name"><p>Contact Details</p></div>
                        <div className="phone-no"><p><FontAwesomeIcon className="phone-icon" icon={faPhoneAlt} />  {props.passedItem.phone}</p></div>
                        <div className="mailid"><p> <FontAwesomeIcon className="mail-icon" icon={faEnvelope} />  {props.passedItem.email}</p></div>
                        <div className="address"><p><FontAwesomeIcon className="user-icon" icon={faAddressCard} /> {props.passedItem.address}</p></div>
                        <div className="gender"><p><FontAwesomeIcon className="user-icon" icon={faVenusMars} /> {props.passedItem.gender}</p></div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default User;
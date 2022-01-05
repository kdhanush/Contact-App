import React, { useState, useEffect } from "react";
import '../app.css';
// import User from "./User";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./User.css";
import Modal from "./Modal"
// import Createprofile from "./Createprofile";


const getLocalItems = () => {
    let localContactItems = localStorage.getItem('Details');

    if (localContactItems) {
        return JSON.parse(localStorage.getItem('Details'));
    }
    else {
        return [];
    }
}



function UserList() {


    const [items, setItems] = useState(getLocalItems());
    // const [openModal, setOpenModal] = useState(false);
    // const [todelete, setTODelete] = useState(false);
    const [popup, setPopup] = useState({
        show: false,
        id: null,
    });




    //Search Conatct details
    function getSearchTerm(event) {
        const { name, value } = event.target;
        if (value && value.length > 0) {
            let searchResult = items.filter((elem) => elem && elem.name.toLowerCase().includes(value.toLowerCase()));
            setItems(searchResult);
        }
        else {
            setItems(getLocalItems());
        }
    }
    //Edit contact details

    function editItems(id) {
        window.open(`http://localhost:3000/adduser/${id}`, "_self")
    }


    //Delete contact details

    function deleteHandler(id){
        setPopup({
            show: true,
            id,
        });
    };

    // This will perform the deletion and hide the Confirmation Box

    const handleDeleteTrue = () => {
        if (popup.show && popup.id>=0) {
            console.log(popup.id, "deleted");
            let newItems = items.filter((data, index) => data && index !== popup.id)
            setItems(newItems);
            localStorage.setItem("Details", JSON.stringify(newItems));
            setPopup({
                show: false,
                id: null,
            });
        }
    };
    // This will just hide the Confirmation Box when user clicks "No"/"Cancel"
    const handleDeleteFalse = () => {
        setPopup({
            show: false,
            id: null,
        });
    };


    // function deleteHandler(id) {
    //     setOpenModal(true);
    //     if (todelete) {
    //         console.log(id, "deleted");
    //         let newItems = items.filter((data, index) => data && index !== id)
    //         setItems(newItems);
    //         localStorage.setItem("Details", JSON.stringify(newItems));
    //     }

    // }


    return (
        <div>
            {items.length > 0 ? <div>
                <div className="master">
                    <p style={{ fontSize: "24px", fontWeight: "400", color: "gray" }}>Contacts</p>
                    <div>
                        <input type="text" className="search-box" name="search" placeholder=" Search..." value={items.term} onChange={getSearchTerm}></input>
                        <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }} >
                    <div className="header" >
                        <button className="addcontactbtn" onClick={() => {
                            window.open("http://localhost:3000/adduser", "_self");
                        }}>+ Create Contact</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ borderBottom: "1px solid black", minWidth: "800px" }}>

                            <div className="userdetails" style={{ display: "flex" }}>
                                <p style={{ minWidth: "250px" }}>Name</p>
                                <p style={{ minWidth: "250px" }} className="mailid">Email</p>
                            </div>
                        </div>

                        {items.map((item, i) => {

                            return <div key={item.id} className="userdetails" style={{}}>

                                <p style={{ display: "flex", alignItems: "center", minWidth: "250px", columnGap: "20px" }}>{item.imageUrl?.length ? <img alt="not found" style={{ height: "40px", width: "40px", borderRadius: "50%" }} src={item.imageUrl} /> : <i className="fa fa-2x fa-user default-icon" aria-hidden="true" ></i>}{item?.name}</p>
                                <p style={{ minWidth: "250px" }}>{item?.email}</p>
                                <>
                                    <div className='User-Icons' style={{ marginLeft: "auto" }}>
                                        <button style={{ border: "none", backgroundColor: "white" }} className='pen-icon' onClick={() => {
                                            editItems(item.id)
                                        }}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button style={{ border: "none", backgroundColor: "white" }}
                                            className='trash-icon' onClick={() => {
                                                deleteHandler(i)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </>
                            </div>

                        })}

                    </div>
                </div>
            </div> :
                <div className="contacts-empty">
                    <h1>No Contacts Yet</h1>
                    <button className="addcontactbtn" onClick={() => {
                        window.open("http://localhost:3000/adduser", "_self");
                    }}>+ Create Contact</button>
                </div>}

            {popup.show && <Modal
                // deleteData={setTODelete}
                // closeModal={setOpenModal}
                handleDeleteTrue={handleDeleteTrue}
                handleDeleteFalse={handleDeleteFalse}

            />}



        </div>


    )
}

export default UserList;
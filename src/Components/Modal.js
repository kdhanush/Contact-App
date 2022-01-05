import React from 'react'
import "./modal.css";

function Modal({ handleDeleteTrue,handleDeleteFalse }) {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='titleCloseBtn'>
                    <button onClick={
                        // closeModal(false);
                        // deleteData(false);
                        handleDeleteFalse}
                    >X</button>
                </div>
                <div className='title'>
                    <h1>Are u sure you want to delete?</h1>
                </div>
                <div className='footer'>
                    <button  id ="cancelBtn" onClick={
                        handleDeleteFalse}>Cancel</button>
                    <button onClick={
                        handleDeleteTrue}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Modal

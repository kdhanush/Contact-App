import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../app.css";
import "./form.css";
import { Upload, message } from "antd";

const getLocalItems = () => {
  let localContactItems = localStorage.getItem("Details");

  if (localContactItems) {
    return JSON.parse(localStorage.getItem("Details"));
  } else {
    return [];
  }
};

function Createprofile() {
  let { id } = useParams();
  const [imageData, setImageData] = useState("");
  const [errors, seterrors] = useState({});
  const [newInput, setNewInput] = useState(getLocalItems());
  const [input, setInput] = useState({
    id: new Date().getTime(),
    imageUrl: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "male",
  });
//get id and setinput to edit the data
  function getDataFromId() {
    if (id) {
      let _newEditItem = newInput.filter((elem) => elem && elem.id == id);
      if (_newEditItem && _newEditItem.length > 0) {
        let newEditItem = _newEditItem[0];
        setInput(newEditItem);
      }
    }
    // localStorage.setItem("editdetails",JSON.stringify(newEditItem));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
//Submit form after validation

  function submitForm(event) {
    event.preventDefault();
    if (validate(input).isValid) {
      if (id && newInput.filter((elem) => elem && elem.id == id).length > 0) {
        let indexToReplace = newInput.findIndex(
          (elem) => elem && elem.id == id
        );
        newInput[indexToReplace] = input;
        setNewInput(newInput);
        localStorage.setItem("Details", JSON.stringify(newInput));
        setInput({
          id: new Date().getTime(),
          imageUrl: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          gender: "male",
        });
        seterrors({});
        window.open("http://localhost:3000", "_self");
      } else {
        let newArray = [...newInput, input];

        setNewInput(newArray);
        localStorage.setItem("Details", JSON.stringify(newArray));

        setInput({
          id: new Date().getTime(),
          imageUrl: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          gender: "male",
        });
        seterrors({});
        window.open("http://localhost:3000", "_self");
      }
    } else {
      seterrors(validate(input).error);
    }
  }

  //form validation
  const validate = (values) => {
    let isValid = true;
    const error = {};
    const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phregex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

    if (!values.name) {
      error.name = "Name is required!";
    }
    if (!values.email) {
      error.email = "Email is required!";
    } else if (!emailregex.test(values.email)) {
      error.email = "This is not a valid email!";
    }
    if (!values.phone) {
      error.phone = "Phone number is required!";
    } else if (!phregex.test(values.phone)) {
      error.phone = "This is not a valid Phone number!";
    }
    if (!values.address) {
      error.address = "Address is required!";
    }

    if (Object.keys(error).length != 0) {
      isValid = false;
    }
    return {
      error,
      isValid,
    };
  };

  //Image upload
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function selectImage(info) {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setImageData(imageUrl));
    }
  }
  useEffect(() => {
    setInput({ ...input, ["imageUrl"]: imageData });
  }, [imageData]);

  useEffect(() => {
    getDataFromId();
  }, []);

  return (
    <div className="mastercontainer">
      <div className="master">
        <p style={{ fontSize: "24px", fontWeight: "400", color: "gray" }}>
          Contacts
        </p>
      </div>
      <div className="image-upload">
        <div>
          {imageData ? (
            <>
              <img src={imageData} alt="avatar" className="img-upload" />{" "}
              <button
                style={{ border: "none", backgroundColor: "white" }}
                className="trash-icon"
                onClick={() => {
                  setImageData("");
                }}
              >
                {" "}
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ) : (
            <>
              <Upload
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                //  beforeUpload={beforeUpload}
                onChange={selectImage}
              >
                <div>
                  <i
                    className="fa fa-9x fa-user"
                    style={{ color: "Grey" }}
                    aria-hidden="true"
                  ></i>
                </div>
              </Upload>
            </>
          )}
        </div>
        <button onClick={submitForm}>Save</button>
      </div>
      <div className="form">
        <form className="forminput">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input.name}
            onChange={handleChange}
          />
          <p className="errors">{errors.name}</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          />
          <p className="errors">{errors.email}</p>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={input.phone}
            onChange={handleChange}
          />
          <p className="errors">{errors.phone}</p>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={input.address}
            onChange={handleChange}
          />
          <p className="errors">{errors.address}</p>
          <div style={{ marginRight: "auto", color: "grey" }}>
            Gender :
            <select
              name="gender"
              value={input.gender}
              id="Gender"
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createprofile;

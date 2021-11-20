import React, { useState, useRef, useEffect } from "react";
import Message from "../Message/Message";
import AuthService from "../../Services/AuthService";
import UserUpdateService from "../../Services/UserUpdateService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import styles from "./UpdateProfile.module.css"
import LoginGoogle from "../LoginGoogle/LoginGoogle";
import cx from "classnames";
import { Card } from "react-bootstrap";

const UpdateProfile = (props) => {
  const [user, setUser] = useState({
    bio: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    religion: '',
    caste: '',
    motherTounge: '',
    state:'',
    city: '',
    country: '',
    height: '',
    martialStatus: '',
    food_type: '',
    smoker: '',
    drinker: '',
    profile_for: ''
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(user)
    console.log("test");
    setIsLoading(true);
    e.preventDefault();
    UserUpdateService.updateProfile(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          setIsLoading(false);
          props.history.push("/login");
        }, 2000);
      } else setIsLoading(false);
    });
  };

  const resetForm = () => {
    setUser({
      bio: '',
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      religion: '',
      caste: '',
      motherTounge: '',
      state:'',
      city: '',
      country: '',
      height: '',
      martialStatus: '',
      food_type: '',
      smoker: '',
      drinker: '',
      profile_for: ''
    });
  };

  return (
    <Card className={cx("container", styles.container)} 
    style = {{
      width: '25rem',
      marginTop: '3rem'
    }}>
      {isLoading ? (
        <div className={styles.loadingPage}>
          <p>
            <FontAwesomeIcon icon={faCircleNotch} spin /> Creating Your Account
            and Redirecting...
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className={styles.form}>
          <h3>Update Profile</h3>
          <label htmlFor="firstname" className="sr-only">
            First Name:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="firstName"
            value={user.firstName}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter FirstName..."
          />
          <label htmlFor="lastname" className="sr-only">
            Last Name:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="lastName"
            value={user.lastName}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter LastName..."
          />

          <label htmlFor="profile_for" className="sr-only">
            Created By:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="profile_for"
            value={user.profile_for}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter profile_for..."
          />
          <label htmlFor="gender" className="sr-only">
            Gender:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="gender"
            value={user.gender}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Gender..."
          />

          <label htmlFor="caste" className="sr-only">
            Caste:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="caste"
            value={user.caste}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Caste..."
          />

          <label htmlFor="mother_tounge" className="sr-only">
            Mother Tounge:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="motherTounge"
            value={user.motherTounge}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Mother Tounge..."
          />

          <label htmlFor="dob" className="sr-only">
          Date Of Birth:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="dob"
            value={user.dob}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Date Of Birth..."
          />

          <label htmlFor="country" className="sr-only">
          Country:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="country"
            value={user.country}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter country..."
          />

          <label htmlFor="state" className="sr-only">
          State:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="state"
            value={user.state}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter State..."
          />


          <label htmlFor="city" className="sr-only">
          City:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="city"
            value={user.city}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter city..."
          /> 



          <label htmlFor="height" className="sr-only">
          Height:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="height"
            value={user.height}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter height..."
          />  


          <label htmlFor="religion" className="sr-only">
          religion:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="religion"
            value={user.religion}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter religion..."
          /> 

          <label htmlFor="martialStatus" className="sr-only">
          Martial Status:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="martialStatus"
            value={user.martialStatus}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter martialStatus..."
          /> 


          <label htmlFor="food_type" className="sr-only">
          Food:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="food_type"
            value={user.food_type}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter food_type..."
          />  
              
          
          <label htmlFor="smoker" className="sr-only">
          Smoke:{" "}
          </label>
          <input
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="smoker"
            value={user.smoker}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter smoker..."
          />

          <label htmlFor="Drinker" className="sr-only">
            Drinker:{" "}
          </label>
          <input 
             style={{
              marginBottom:'1rem'
            }} 
            required
            name="drinker"
            value={user.drinker}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Drinker..."
          />
          <label htmlFor="bio" className="sr-only">
            Bio:{" "}
          </label>
          <input
             style={{
              marginBottom:'1rem'
            }} 
            name="bio"
            value={user.bio}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Your bio..."
          />
          {/* <label htmlFor="role" className="sr-only">
            Role:{" "}
          </label>
          <input
             style={{
              marginBottom:'1rem'
            }} 
            
            name="role"
            value={user.role}
            type="text"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Role (Admin/User)"
          /> */}
          {/* <label className={styles.radioButtons}>
            <input value="user" type="radio" name="role" checked />
            User
          </label>
          <label className={styles.radioButtons}>
            <input value="admin" type="radio" name="role" disabled />
            Admin
          </label> */}

          <button
            className={cx(styles.loginbtn, "btn btn-primary btn-block")}
            type="submit"
          >
            Update Profile
          </button>
        </form>
      )}
      {/* <span className={styles.googleloginbtn}>
        OR <LoginGoogle />
      </span> */}
      {message ? <Message message={message} /> : null}
    </Card>
  );
};

export default UpdateProfile;

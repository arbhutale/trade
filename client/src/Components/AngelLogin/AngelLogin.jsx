import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AngelAuthService from "../../Services/AngelAuth";
import styles from "./AngelLogin.module.css";
import cx from "classnames";
import { Card } from "react-bootstrap";
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();
const AngelLogin = (props) => {
  const [angel_user, setAngelUser] = useState({ clientcode: "", password: "" });

  const onChange = (e) => {
    setAngelUser({ ...angel_user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-UserType': 'USER',
      'X-SourceID': 'WEB',
      'X-ClientLocalIP': '192.168.29.48',
      'X-ClientPublicIP': '49.37.151.146',
      'X-MACAddress': 'ab-cd-ef-12-34-56',
      'X-PrivateKey': 'yAbjB34C '
    }
    axios.post(`https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword`, angel_user, {
      headers: headers
    }).then(res => {
        cookies.set('jwttokenangel', res.data.data.jwtToken, { path: '/' });
        console.log(res);
        console.log(res.data);
        props.history.push("/trade");
      })
      onGetProfile();
  };
  const onGetProfile = (e) => {
    //e.preventDefault();
  
    const headers = {
      'Authorization' : 'Bearer ' + cookies.get('jwttokenangel'),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-UserType': 'USER',
      'X-SourceID': 'WEB',
      'X-ClientLocalIP': '192.168.29.48',
      'X-ClientPublicIP': '49.37.151.146',
      'X-MACAddress': 'ab-cd-ef-12-34-56',
      'X-PrivateKey': 'yAbjB34C '
    }
    axios.get(`https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile`, {
      headers: headers
    }).then(res => {
        cookies.set('clientid', res.data.data.clientcode, { path: '/' });
        cookies.set('clientname', res.data.data.name, { path: '/' });
        console.log(res);
        console.log(res.data);
      })
  };

  return (
    <Card className={cx("container", styles.container)} 
    style={{ 
      width: '25rem',
      marginTop: '3rem'
      }}>
      <form onSubmit={onSubmit}>
        <h3>Angel Login In</h3>
        <label htmlFor="clientcode" className="sr-only">
          Client ID:{" "}
        </label>
        <input style={{
          marginBottom:'1rem'
        }} 
          name="clientcode"
          type="text"
          onChange={onChange}
          className="form-control" 
          placeholder="Enter Username..."
        />
        <label htmlFor="password" className="sr-only">
          Client Password:{" "}
        </label>
        <input style={{
          marginBottom:'1rem'
        }}
          name="password"
          type="password"
          onChange={onChange}
          className="form-control"
          placeholder="Enter Password..."
        />
        <button
          className={cx(styles.loginbtn, "btn btn-primary ")}
          type="submit"
        >
          Login
        </button>
      </form>
      <button
          className={cx(styles.loginbtn, "btn btn-primary ")}
          type="button"
          onClick={onGetProfile}
        >
          Get Profile
        </button>
    </Card>
  );
};

export default AngelLogin;

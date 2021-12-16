import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AngelService from "../../Services/AngelService";
import styles from "./AngelLogin.module.css";
import cx from "classnames";
import { Card } from "react-bootstrap";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const AngelLogin = (props) => {
  const [angel_user, setAngelUser] = useState({ clientcode: "", password: "" });
  const onChange = (e) => {
    setAngelUser({ ...angel_user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    AngelService.login(angel_user).then((res) => {
      console.log(res)
      cookies.set('jwttokenangel', res.data.data.jwtToken, { path: '/' });
      onGetProfile()
    })
  };
  const onGetProfile = () => {
    AngelService.getProfile().then((res) => {
      console.log(res)
      cookies.set('clientid', res.data.data.clientcode, { path: '/' });
      cookies.set('clientname', res.data.data.name, { path: '/' });
      setTimeout(function () {
        props.history.push("/trade");
      }, 500);
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
          marginBottom: '1rem'
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
          marginBottom: '1rem'
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

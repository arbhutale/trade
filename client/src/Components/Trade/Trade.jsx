import React, { useState, useContext,useEffect } from "react";
import styles from "./Trade.css";
import cx from "classnames";
import { Card, Form} from "react-bootstrap";
import Cookies from 'universal-cookie';
import Select from 'react-select';
import AngelAuthService from "../../Services/AngelAuth"
var json = require("../../OpenAPIScripMaster.json"); 

const cookies = new Cookies();
const Trade = (props) => {
  const handleKey = selectedOption => {
    var test = loadOptions(selectedOption.target.value)
  };
  const handleChange = selectedOption => {
 
  };
  var options = [
   
  ];
  
  // // // load options using API call
  const loadOptions = (inputValue) => {
    if(inputValue.length > 1){
      AngelAuthService.getNseData(inputValue).then((data) =>{
        console.log(data.data)
        var array1 = data.data;
        array1.forEach(element =>{
          if(options.indexOf(element) === -1) {
            options.push(element);
            console.log(options);
        }
          
        });
      });
    }
    console.log(options)
    
    
  };

  return (
    <Card className={cx("container", styles.container)} 
    // style={{ 
    //   width: '',
    //   marginTop: '3rem'
    //   }}
      >
        <h5>Welcome {cookies.get('clientname')} and Client Id : {cookies.get('clientid')}</h5>
       
        <Select
        //value={selectedOption}
        onChange={handleChange}
        onKeyDown={handleKey}
        options={options}
      />
        </Card>
        
  );
};

export default Trade;

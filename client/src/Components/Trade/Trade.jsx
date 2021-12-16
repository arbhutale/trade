import React, { useState, useContext,useEffect } from "react";
import AngelService from "../../Services/AngelService";
import styles from "./Trade.css";
import { Card, Form} from "react-bootstrap";
import Cookies from 'universal-cookie';
import Select from 'react-select';
import AngelAuthService from "../../Services/AngelAuth"

const cookies = new Cookies();
const Trade = (props) => {
  const [funds, setFunds] = useState([]);
  const [holding, setHoldeings] = useState([]);
  //const [avg, setAvg] = useState(0);
  var avg  = 0 
  var curr  = 0 
  var day = 0
  useEffect(() => {
    AngelService.getFundsMargins().then((res) => {
      setFunds(res.data.data)
    });
    AngelService.getHoldings().then((res) => {
      console.log(res.data.data)
      setHoldeings(res.data.data)
    });

    
  }, []);

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
    <Card className={"container "+ styles.container} 
      >
        <h5>Welcome {cookies.get('clientname')} and Client Id : {cookies.get('clientid')}  A Cash: {Number(funds.availablecash).toFixed(2)} Net Cash: {Number(funds.net).toFixed(2)}</h5>
        <Select
        //value={selectedOption}
        onChange={handleChange}
        onKeyDown={handleKey}
        options={options}
      />


<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Exchange</th>
      <th scope="col">Avg Price</th>
      <th scope="col">Close Price</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Day %</th>
      <th scope="col">Day P/L</th>
      <th scope="col">Overall %</th>
      <th scope="col">Overall P/L</th>
    </tr>
  </thead>
  <tbody>
  {holding.map(( listValue, index ) => {
    avg = avg +( listValue.averageprice * listValue.quantity )
    curr = curr +( listValue.ltp * listValue.quantity )
    day = day + (listValue.ltp-listValue.close )* listValue.quantity
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{listValue.tradingsymbol}</td>
              <td>{listValue.exchange}</td>
              <td>{Number(listValue.averageprice).toFixed(2)}</td>
              <td>{Number(listValue.close).toFixed(2)}</td>
              <td>{Number(listValue.ltp).toFixed(2)}</td>
              <td>{listValue.quantity}</td>
              <td>{ (((listValue.ltp-listValue.close)/ listValue.close) * 100).toFixed(2)}</td>
              <td>{Number((listValue.ltp-listValue.close )* listValue.quantity).toFixed(2)}</td>
              <td>{ (((listValue.ltp-listValue.averageprice)/ listValue.averageprice) * 100).toFixed(2)}</td>
              <td>{Number((listValue.ltp-listValue.averageprice)* listValue.quantity).toFixed(2)}</td>
            </tr>
          );
        })}
        <tr key={99}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{ (((day)/ avg) * 100).toFixed(2)}</td>
              <td> {Number(day).toFixed(2)}</td>
              <td>{ (((curr-avg)/ avg) * 100).toFixed(2)} <br></br></td>
              <td>{Number(curr-avg).toFixed(2)}</td>
            </tr>
        
  </tbody>
  
</table>
<p  class={styles.floatRight + " tww"}>Total Invested: {Number(avg).toFixed(2)}  </p>
<p className={styles.floatLeft}>  Current Value: {Number(curr).toFixed(2)}</p>
  
        </Card>
        
  );
};

export default Trade;

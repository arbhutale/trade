import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();
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
const headersWithAuth = {
  'Authorization': 'Bearer ' + cookies.get('jwttokenangel'),
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-UserType': 'USER',
  'X-SourceID': 'WEB',
  'X-ClientLocalIP': '192.168.29.48',
  'X-ClientPublicIP': '49.37.151.146',
  'X-MACAddress': 'ab-cd-ef-12-34-56',
  'X-PrivateKey': 'yAbjB34C '
}


const url = "https://apiconnect.angelbroking.com/rest/secure/angelbroking"

export default {
  login: (angel_user) => {
    return axios.post(`https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword`, angel_user, {
      headers: headers
    }).then(response => {
      if (response.status !== 401) {
        return response
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },


  getProfile: () => {
    return axios.get(url + `/user/v1/getProfile`, {
      headers: headersWithAuth
    }).then(response => {
      if (response.status !== 401) {
        return response
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },

  getFundsMargins: () => {
    return axios.get(url + `/user/v1/getRMS`, {
      headers: headersWithAuth
    }).then(response => {
      if (response.status !== 401) {
        return response
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },

  getHoldings: () => {
    return axios.get(url + `/portfolio/v1/getHolding`, {
      headers: headersWithAuth
    }).then(response => {
      if (response.status !== 401) {
        return response
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },


};

export default {
    getNseData: (data) => {
      console.log(data)
      console.log("testffff")
        return fetch("/nseWeb/data/" + data).then((response) => {
          console.log(response)
          return response.json().then((data1) => data1);
          
          // if (response.status !== 401) {
          //   return response.json().then((data) => data);
          // } else {
          //   return response.json({
          //     message: { msgBody: "Unauthorized", msgError: true },
          //   });
          // }
        });
      },
}
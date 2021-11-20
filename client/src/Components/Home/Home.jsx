import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNode, faEnvelope } from "@fortawesome/free-brands-svg-icons";
import styles from "./Home.module.css";
function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const elements = ['one', 'two', 'three'];
  const elements1 = ['one', 'two', 'three','one', 'two', 'three','one', 'two', 'three','one', 'two', 'three'];
  const items = []
  const filtera = []


  for (const [index, value] of elements1.entries()) {
    filtera.push(
    <div className={styles.filtera}>
        filter1
    </div>
      )
  }


  for (const [index, value] of elements.entries()) {
    items.push(

<div className= {styles.profilecard}>
          <div className={"row " + styles.page}>
            <div className={"col-4 " + styles.pro_img_col}>
              <img className= {styles.pro_image} src="https://pbs.twimg.com/profile_images/1238150135177072641/cIbNQJ3V_400x400.jpg"/>
            </div>
            <div className={"col-7 " + styles.pro_details_col}>
              <p class= {styles.username}>Anil Kumar</p>
              <p className={styles.dottedline}></p>
              <div className="row">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-7">
                        <p className={styles.user_info}>Age:</p>
                        <p className={styles.user_info}>Height:</p>
                        <p className={styles.user_info}>State:</p>
                        <p className={styles.user_info}>City:</p>
                        <p className={styles.user_info}>Mother tounge:</p>
                        <p className={styles.user_info}>Religion:</p>
                        
                      </div>
                      <div className="col-sm-5">
                        <p className={styles.user_info}>27</p>
                        <p className={styles.user_info}>6.2</p>
                        <p className={styles.user_info}>Telangana</p>
                        <p className={styles.user_info}>Hyderabad</p>
                        <p className={styles.user_info}>Marathi</p>
                        <p className={styles.user_info}>Hindu</p>
                      </div>
                    </div>
                    </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-7">
                          <p className={styles.user_info}>Caste:</p>
                          <p className={styles.user_info}>H. Qualification:</p>
                          <p className={styles.user_info}>Occupation:</p>
                          <p className={styles.user_info}>Income:</p>
                          <p className={styles.user_info}>Martial Status:</p>
                        </div>
                        <div className="col-sm-5">
                          <p className={styles.user_info}>Maratha</p>
                          <p className={styles.user_info}>27</p>
                          <p className={styles.user_info}>6.2</p>
                          <p className={styles.user_info}>Telangana</p>
                          <p className={styles.user_info}>Hyderabad</p>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className = {"col-1 " + styles.user_details_back}>
              <span ><i class="fa fa-envelope" aria-hidden="true"></i></span>
              <img src="https://www.linkpicture.com/q/call_9.png" type="image"/>
              <a href='https://www.linkpicture.com/view.php?img=LPic6198f3ff65af31104344416'><img src='https://www.linkpicture.com/q/chat_3.png' type='image'/></a>
              <a href='https://www.linkpicture.com/view.php?img=LPic6198f3ff65af31104344416'><img src='https://www.linkpicture.com/q/mail_10.png' type='image'/></a>
              <a href='https://www.linkpicture.com/view.php?img=LPic6198f3ff65af31104344416'><img src='https://www.linkpicture.com/q/message_2.png' type='image'/></a>
            </div>
          </div>
        </div>


    )
  }

  return (
    
   <div className="container">
     <div className="row">
      <div className="col-md-2">
          {filtera}
      </div>
      <div className="col-md-8">
      {items}
      </div>
     </div>

   </div>
  );
}

export default Home;

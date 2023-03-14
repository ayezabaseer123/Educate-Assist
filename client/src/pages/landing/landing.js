import React from 'react';
import smLogo from "../../assets/chat.png";
import heroimg from "../../assets/chat.png";
import Lstyle from "./landing.css";
import { Link, useLocation,useHistory } from "react-router-dom";
import { Row,Col,Button } from 'reactstrap';
import {useEffect} from 'react'

function Landing() {
    const navigate = useHistory()
 

   

    const showMobilemenu = () => {
        
        document.getElementById(".toggleMenu").classList.toggle("active");
      };
      let location = useLocation();
  
  return (
    <div>
      <body className="body-hero">
    <header className="row container">
        <a href="/" className="logo row">
            <img src={smLogo} alt=""/>
        </a>
       
    </header>

    <section className="hero row container">
        <div>
            <h1 style={{color:'#ebebeb'}}>Lets build the future together</h1>
            <p className="hero-p" style={{color:'#ebebeb'}}>Advanced Ultrasound Training using Modern Technology</p>
           
            <div className="button-group">
                <Button href="/login" className="btn" color="primary" >
                  DOCTOR
                </Button>
                <Button href="/studentlogin" className="btn" color="primary" >
                  STUDENT
                </Button>
                <Button href="/adminlogin" className="btn" color="primary" >
                    ADMIN  
                </Button>
              </div>
            
        </div>
        <div class="row">
            <img src={heroimg} alt=""/>
        </div>
    </section>
    <footer class="footer-distributed">

        <div class="footer-right">

            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-github"></i></a>

        </div>

        <div class="footer-left">

            <p class="footer-links">
                <a class="link-1" href="#">Home</a>

                <a href="#">Blog</a>

                <a href="#">Pricing</a>

                <a href="#">About</a>

                <a href="#">Faq</a>

                <a href="#">Contact</a>
            </p>

            <p>Company Name &copy; 2015</p>
        </div>

    </footer>
    
</body>
    </div>
  )
}

export default Landing
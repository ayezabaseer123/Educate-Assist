'use strict' ;
const dotenv= require('dotenv' ) ;
const assert=require('assert') ;

dotenv.config();

const{
PORT,
HOST,
HOST_URL,
JWT_KEY,
API_KEY,
AUTH_DOMAIN,

PROJECT_ID,
STORAGE_BUCKET,
MESSAGING_SENDER_ID,
APP_ID } =process.env;


assert(PORT, 'port is required') ;
assert(HOST, 'host is required') ;

module.exports = { 
     port:PORT, 
   host:HOST, 
   url:HOST_URL, 
   jwt_key:JWT_KEY,
   firebaseConfig: {
    // apiKey: API_KEY,
    // authDomain: AUTH_DOMAIN,
    // projectId: PROJECT_ID,
    // appId: APP_ID,
    // storageBucket: STORAGE_BUCKET,
    // messagingSenderId: MESSAGING_SENDER_ID,

  
    type: "service_account",
    projectId: "nodewithfirebase-5b93b",
    privateKeyId: "e886295772c2b47c26d740b3d92f64681f1d3d31",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8keER/2qrXBHJ\njIa8IRzo8bIhA50qLOK6fU8cqzeLXzlTq4EahnOBUvFBe36UfwTIgRCfejMdlTkP\n3F+2sd1VdPPWz5H9HYPqj7SfkJZrR+q1yqSgMDPLdsHhOrm8bA8Cp4PogmVmq9mn\nK/kSsma0JrEmugC7m7LS9/l3rL0FJV2gxnaWl7hwkxAKGFQwvMcllyCDTKCrHsLn\nYoXPfCjWlzwJzbzSib1WUuc50wuKWuKLPePOkK2XuXQL8G4EjkAviwYEc+R8zZ+5\nz4WfiU7TOkmmFjCnIqbudmzFGueNDKPjt9Ocx1L4j0bksDol/7Ynje7jhMgsgAaS\nmoLrCmTxAgMBAAECggEAIUq2DFnmSMO0Bjvvq7ZC5uOJGegL7t7G1rr55StbXplc\nwydj3z1+lgYBPxjhA7GbNBUJTMaj0KTAUssLAPPNCmHgDPxPn3r/B8IAVy2NSPqE\n9zyELR3lfxYD69JU6W3AhqzxjnK7GVHc1vVd/42MsWClZRtwtq6p9zI9koHmS0p8\nO/6ck98MyucLh3L8YWH0lcMsIszwZvOIjuzCGFgm2WxvYrTrHAZ8qPbJyqKoYArr\nA3lopBacoPNA9L79s7AJEumpxSiERbZQCSsJkfPL6vxO1bzfmnihOLMnyN18JOoz\nD91NOTncQGS4Q9nv7Prq2ZUsLLZir8AHItf3GkViWwKBgQDs+6awBUJU5lXNymr2\nOWbt0yOCmCMO9D5es/AJB+CClugsoC0tkI5rX9GiZCWHaHQN9ccgnw+xkPNIWPYv\nAQ+C98XJsQpAI2jbqxZ7+37i0luVyhisGSKojcPsOIPvzpGaWRMWOMIi2H0kmYvq\n5W2uWlbLIkAylSJsSKDewQnDVwKBgQDLs6zEYLA7PWyQZSsH9QyMefCBRzDMtrZG\nnAEKM7IDhBmNnJ5+tZV8FFHhzce7+69WzeVi1IqaqbqibFJfQdmL3mEXwbvZjikR\nBUM81ruJiMqSlPxe7FCO9XWA00YcYrsRdgPG3BS7QRI9t1c/Lhlt+ddrk3TO+yr1\n5r3CsRD09wKBgBBFp0hm1AsoVbPvtjB5+ItT+Bg7ggzA0JeIG29DTzMoUYDe7rs2\nNdFBnw9beQg3L+DVg3rF8TnsDghls2G+3OXNRZN3yJBm3ghXUw/oUOoaL5e1bMRE\nZZDVSyKpLsYElRLYEutvskTaQJ2GvYi/gCx8n4ELNQVEIDz3L7Sb5KO5AoGBAK4c\noLKl9lxcTzxIzPQbN6Om4rSNdh+0mK5Xz+e5chHhSropQawKZ4BMGgUIkA2UvjVS\n/htwkhxKsTT9o5a6QUl1RcY5mOgGxAFBX0xUOq3/Fy8dW22DTgQzuEDp1UaT+VOe\nbPH/0VSQ9Rd9a3ycWa4P3FqeCjyUoQ7YMCCGmnjXAoGBAIuVihZlOLl3e0Mh8ty9\n/LtsEWhuAnVb4lsj949qTyoIaQhKWeoJRxIkCDa7Y9nur8pxkYt4mOO0upCdmlVJ\nHRtrcMv8xUKEdd4AmZevAK3Qtzus7km2DSwNhL3mX5KBQkJNUcPuz97nj0y386qE\n9XHtv6lo+OA3WWySWACcbjHX\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-b7qvy@nodewithfirebase-5b93b.iam.gserviceaccount.com",
    clientId: "104778647976121395834",
    authUri: "https://accounts.google.com/o/oauth2/auth",
    tokenUri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b7qvy%40nodewithfirebase-5b93b.iam.gserviceaccount.com"
  
  
   }
  }
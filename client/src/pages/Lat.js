
import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';

export default function FindLatLong () {

  Geocode.setApiKey('AIzaSyC7r1m7_hl5-wUbzRpwVVJFqyhoIg_TWkI'); //Insert your Google Maps API here
  Geocode.enableDebug();

  var address = 'House no 320, Street 34 E, I9/4 Islamabad';

  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  useEffect(() => {
    Geocode.fromAddress('House no 320, Street 34 E, I9/4 Islamabad').then(
      response => {
          console.log(response.results[0].geometry.location.lat)
        setLat(response.results[0].geometry.location.lat);
        setLong(response.results[0].geometry.location.lng);
      }
    )}, []
  )

  return(
    <div>
      <p>Address: {address}</p>
      <p>Lat: {lat}</p>
      <p>long: {long}</p>
    </div>
  )
}
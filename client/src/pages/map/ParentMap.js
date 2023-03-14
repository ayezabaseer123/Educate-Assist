import React from "react";
import ReactDOM from "react-dom";


import Map from "./Map1";

const places = [
  {
    name: "Newcastle",
    title: "Newcastle",
    lat: -33.0029954,
    lng: 147.204751,
    id: 1,
    visible: true
  },
  {
    name: "Sydney",
    title: "Sydney",
    lat: -33.847927,
    lng: 150.6517938,
    id: 2,
    visible: true
  },
  {
    name: "Melbourne",
    title: "Melbourne",
    lat: -37.9722342,
    lng: 144.7729561,
    id: 3,
    visible: true
  },
  {
    name: "Perth",
    title: "Perth",
    lat: -31.9546904,
    lng: 115.8350292,
    id: 4,
    visible: true
  }
];

 const ParentMap = () => {
  return (
    <div>
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key="
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: -33.8665433, lng: 151.1956316 }}
        zoom={4}
        places={places}
      />
    </div>
  );
};

export default ParentMap;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

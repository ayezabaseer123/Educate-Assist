import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from "axios";
import "./style.css";
import {URL} from '../../constants'
import { AuthContext } from "../../context/AuthContext";

let teachers;
const getTeachers= async () => {
    try {
       let res=await axios({
        method: "GET",
        url: `http://${URL}:4000/user/getAllTeacher`,
       
      })
       teachers=res.data
        
       
    }
    catch (err) {
        console.log(err)
    }
}


getTeachers()

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : teachers.filter(teacher =>
    teacher.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.



//the value that will be dislplayd when clicked in suggestion
const getSuggestionValue = suggestion =>
     suggestion.name;
    
 


// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class Example extends React.Component {
  
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  

  onChange = (event, { newValue }) => {
      console.log(newValue)
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
      console.log("dd",value)
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected = (e, { suggestion }) => {
    this.props.setSearchIdCom(suggestion.id)
   
   
    
  };

  render() {
    const { value, suggestions } = this.state;
    console.log("sig",suggestions)

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a  name',
      value,
      
      onChange: this.onChange
    };

    // Finally, render it!
    
    return (
      
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected = {this.onSuggestionSelected}
        
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
       
      />
      
    );
  }
}
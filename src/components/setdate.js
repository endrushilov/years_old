import React, { Component } from 'react';
import '../App.css';


class Setdate extends Component {
	constructor(props){
		super(props);
		this.data = new Date(); 
    this.thisDay = this.data.getDate();
    this.thisYear = this.data.getFullYear();
    this.thisMonth = this.data.getMonth() + 1;
	}
	validateDate = (e) => {
		e.preventDefault();
		if(this.state.day && this.state.month && this.state.year){
		  if(Number(this.state.month) === 2 && (Number(this.state.year) % 4) === 0 && Number(this.state.day) > 29){
		  	this.setState({
					validDate: false 
				});
				e.target.reset();
      }
      else if(Number(this.state.month) === 2 && Number(this.state.day > 28) && (Number(this.state.year) % 4) !== 0){
				this.setState({
					validDate: false
				});
				e.target.reset();
      }
      else if(Number(this.state.day) > this.thisDay && Number(this.state.month) >= this.thisMonth && Number(this.state.year) >= this.thisYear){
				this.setState({
					validDate: false 
				});
				e.target.reset(); 
      }
      else if(Number(this.state.year) > this.thisYear){
				this.setState({
					validDate: false 
				});
				e.target.reset(); 
      }
      else if(Number(this.state.month) === 4 || Number(this.state.month) === 6 ||  Number(this.state.month) === 9 || Number(this.state.month) === 11){
      	if(this.state.day > 30){
      		this.setState({
						validDate: false
					});
					e.target.reset();
      	}
      	else {
      		this.props.loadCalculate(this.state.year, this.state.month, this.state.day);
      		this.setState({
						validDate: true
					}) 
      	}
      }
      else{
      	this.props.loadCalculate(this.state.year, this.state.month, this.state.day);
      	this.setState({
					validDate: true
				})
      }
		}
		else{
			this.setState({
				validDate: false
			});
			e.target.reset();
		}
	}
  setDay = (elem) => {
  	if(Number(elem.target.value)){
  			if(elem.target.value > 0 && elem.target.value < 32){
  				this.setState({
		  			day: elem.target.value
		  		})
  			}
  			else{
  				this.setState({
		  			day: null
		  		})
  			}
  	}
  	else{
  		this.setState({
  			day: null
  		})
  	}
	}
	setMonth = (elem) => {
		if(Number(elem.target.value)){
			if(elem.target.value > 0 && elem.target.value < 13){
				this.setState({
	  			month: elem.target.value
	  		})
			}
			else{
				this.setState({
	  			month: null
	  		})
			}
  	}
  	else{
  		this.setState({
  			month: null
  		})
  	}
	}
	setYear = (elem) => {
		if(Number(elem.target.value)){
			if(elem.target.value.length === 4){
				this.setState({
	  			year: elem.target.value
	  		})
			}
			else{
				this.setState({
	  			year: null
	  		})
			}
  	}
  	else{
  		this.setState({
  			year: null
  		})
  	}
	}

	componentWillMount(){
		this.setState({
  	 	validDate: true
  	})
	}

  render() { 
    return (
    	<div className="setdate-block-popup">  
      	<h2>Hello! Please, set your birthday</h2>
      	<form className={this.state.validDate ? "date-form" : "date-form error"} onSubmit={this.validateDate.bind(this)}>
      		<span className="date-input-description">Day:</span>
	      	<input className="date-input" onChange={this.setDay} type="text"  maxLength="2"/>
	      	<span className="date-input-description">Month:</span>
	      	<input className="date-input" onChange={this.setMonth} type="text" maxLength="2"/>
	      	<span className="date-input-description">Year:</span>
	      	<input className="date-input" onChange={this.setYear} type="text" maxLength="4"/>
	      	<input className="date-input input-submit" type="submit" value="Set"/>
      	</form>
      	{!this.state.validDate ? <div className="error-set-date">Please set correct date!</div> : ""}
      </div>
    );
  }


}

export default Setdate;
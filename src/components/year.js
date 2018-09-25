import React, { Component } from 'react';
import Yearscomponent from "./yearscomponent";
import Setdate from "./setdate";
import '../App.css';


class Year extends Component {
	componentWillMount(){
		if(window.localStorage){
			this.dontReadLocalStorage = false;
			if(localStorage.getItem('birthday_day') && localStorage.getItem('birthday_month') && localStorage.getItem('birthday_year')){
				this.firstLoad = false;
				this.setState({ 
					firstLoad: false,
					birthday: {
						day: localStorage.getItem('birthday_day'),
						month: localStorage.getItem('birthday_month'),
						year: localStorage.getItem('birthday_year'),
					}
				});
			}
			else{
				this.firstLoad = true;
			}
		}
		else{
			this.dontReadLocalStorage = true;
		}
		if(this.dontReadLocalStorage){
  		this.setState({ 
				noLocalStorage: true
			});
  	}	
  	else if(this.firstLoad){
  		this.setState({ 
				firstLoad: true
			});
  	}	
  	else{
  		this.setState({ 
				firstLoad: false,
				noLocalStorage: false
			});
  	}

	}
  startCalc = (year, month, day) => {
		localStorage.setItem('birthday_day', day);
		localStorage.setItem('birthday_month', month);
		localStorage.setItem('birthday_year', year);
		this.setState({ 
			firstLoad: false,
			birthday: {
				day: localStorage.getItem('birthday_day'),
				month: localStorage.getItem('birthday_month'),
				year: localStorage.getItem('birthday_year'),
			}
		});
  }
  render() {
    return (
    		this.state.noLocalStorage ? <div className="error-localstorage">Your browser does not support localStorage, please open this link in normal browser.</div> :
      	this.state.firstLoad ? <Setdate thisMonth={this.month} thisDay={this.day} thisYear={this.year} loadCalculate={this.startCalc}/> : <Yearscomponent birthday={this.state.birthday}/>
    );
  }
}

export default Year;
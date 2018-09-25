import React, { Component } from 'react';
import '../App.css';


class Yearscomponent extends Component {
  constructor(props){
    super(props);
    document.addEventListener('visibilitychange', (e) => {
      this.page_hidden = document.hidden;
    }, false);
    this.monthDay = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31, 
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };
    this.month_in_year = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.birthday = {
      year: Number(this.props.birthday.year),
      month: Number(this.props.birthday.month),
      day: Number(this.props.birthday.day)
    };
    this.data = new Date(); 
    this.day = this.data.getDate();
    this.year = this.data.getFullYear();
    this.month = this.data.getMonth() + 1;
    this.hours = this.data.getHours();
    this.minutes = this.data.getMinutes();
    this.seconds = this.data.getSeconds(); 
    this.day_from_bd_in_bm = this.monthDay[this.birthday.month] - this.birthday.day;
    this.seconds_in_this_day = (this.hours*60 + this.minutes) * 60 + this.seconds;
    if(this.year === 2020 || this.year === 2024 || this.year === 2028 || this.year === 2032){
      this.monthDay[2] = 29;
      this.days_in_year = 366;
    }
    else{
      this.days_in_year = 365;
    }   
    this.age = this.year - this.birthday.year;
    if(this.month < this.birthday.month){
      this.age = this.year - this.birthday.year - 1;
    }
    else if(this.month === this.birthday.month && this.day < this.birthday.day){
      this.age = this.year - this.birthday.year - 1;
    }
    else if(this.year === this.birthday.year && this.month === this.birthday.month && this.day > this.birthday.day){
      this.age = 0;
    }
    this.seconds_in_year = this.days_in_year * 86400;
    if(this.month === this.birthday.month){
      if(this.day > this.birthday.day){ 
        this.days_from_birth = this.day - this.birthday.day;
      }
      else if(this.day < this.birthday.day){ 
        let month_passed = this.month_in_year; 
        month_passed.splice(this.month - 1, 1); 
        const reducer = (accumulator, currentValue) => accumulator + this.monthDay[currentValue];
        this.days_from_birth = month_passed.reduce(reducer, 0) + this.day + this.day_from_bd_in_bm;
      }
      else if(this.day === this.birthday.day){
        this.days_from_birth = 0;
      }
    }
    else if(this.month > this.birthday.month){
      let month_passed = this.month_in_year; 
      month_passed.splice(this.month - 1, 12);
      month_passed.splice(0, this.birthday.month);
      if(month_passed.length > 0){
        const reducer = (accumulator, currentValue) => accumulator + this.monthDay[currentValue];
        this.days_from_birth = this.day_from_bd_in_bm + this.day + month_passed.reduce(reducer, 0);
      }
      else{
        this.days_from_birth = this.day_from_bd_in_bm + this.day;
      }
    }
    else if(this.month < this.birthday.month){
      let month_passed = this.month_in_year; 
      let difference_of_month = this.birthday.month - this.month + 1;
      month_passed.splice(this.month - 1, difference_of_month);
      if(month_passed.length > 0){
        const reducer = (accumulator, currentValue) => accumulator + this.monthDay[currentValue];
        this.days_from_birth = this.day_from_bd_in_bm + this.day + month_passed.reduce(reducer, 0);
      }
      else{
        this.days_from_birth = this.day_from_bd_in_bm + this.day;
      }
    }
    if(this.day === this.birthday.day && this.month === this.birthday.month){
      this.seconds_from_birthday = this.seconds_in_this_day;
    }
    else{
      this.seconds_from_birthday = (this.days_from_birth*86400) + this.seconds_in_this_day; 
    }
  }
  componentWillMount(){
    let value_to_birth = this.seconds_from_birthday/this.seconds_in_year;
    this.setState({ 
      value_to_bd: value_to_birth,
      age: this.age,
    });
    if((value_to_birth + this.age) > 9){
      this.setState({ 
        older: true
      });
    }
  }
  componentDidMount(){
    setInterval( () => {
      if(this.page_hidden){
        if(this.state.value_to_bd + 0.000000031709793 >= 1){
          this.setState({
            value_to_bd: 0,
            age: this.state.age + 1
          })
        }
        else{
          this.setState({
            value_to_bd: this.state.value_to_bd + 0.000000031709793
          })
        }
      } 
      else{
        if(this.state.value_to_bd + 0.0000000031709793 >= 1){
          this.setState({
            value_to_bd: 0,
            age: this.state.age + 1
          })
        }
        else{
          this.setState({
            value_to_bd: this.state.value_to_bd + 0.0000000031709793
          })
        }

      }
    }, 100)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.page_hidden) {
      return true;
    }
    else{     
      return true;
    }
  } 
  render() {
    return (
      <div className="year-wrapp">
      	<p className="year-description">Age:</p>
      	<span className="year-big">{this.state.age}.</span>
      	<span className={this.state.older ? "year-small longer" : "year-small"}>{this.state.value_to_bd + this.state.age}</span>
      </div>
    );
  }
}

export default Yearscomponent;
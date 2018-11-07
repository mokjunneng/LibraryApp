import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

class DateField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return(
            <DatePicker 
                selected={this.state.startDate}
                onChange={this.handleChange}
                dateFormat="YYYY/MM/DD"
                id="due-date-picker"
                placeholderText="Click to select a date"
            />
        )
    }
}

ReactDOM.render(<DateField />, document.getElementById("date-field"));
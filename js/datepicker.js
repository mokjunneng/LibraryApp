var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = require('react-datepicker');

class DateField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return React.createElement(DatePicker, {
            selected: this.state.startDate,
            onChange: this.handleChange,
            dateFormat: 'YYYY/MM/DD',
            id: 'due-date-picker',
            placeholderText: 'Click to select a date'
        });
    }
}

ReactDOM.render(React.createElement(DateField, null), document.getElementById("date-field"));
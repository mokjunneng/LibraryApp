var React = require('react');

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        const { placeholder = "" } = props;
        this.placeholder = placeholder;
        this.handleSortBy = this.handleSortBy.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleSortBy(event) {
        this.props.handleSortBy(event);
    }

    handleKeyUp(event) {
        this.props.handleKeyUp(event);
    }

    render() {
        return React.createElement(
            "div",
            { className: "field has-addons" },
            React.createElement(
                "p",
                { className: "control has-icons-left is-expanded" },
                React.createElement("input", { className: "input", id: "user-searchbar-input", type: "text", placeholder: this.placeholder, onKeyUp: this.handleKeyUp }),
                React.createElement(
                    "span",
                    { className: "icon is-small is-left" },
                    React.createElement("i", { className: "fas fa-search" })
                )
            )
        );
    }
}

module.exports = SearchBar;
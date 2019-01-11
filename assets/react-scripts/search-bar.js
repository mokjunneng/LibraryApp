var React = require('react');


class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        const { placeholder="" } = props;
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
        return (
            <div className="field has-addons">
                <p className="control has-icons-left is-expanded">
                    <input className="input" id="user-searchbar-input" type="text" placeholder={this.placeholder} onKeyUp={this.handleKeyUp}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </p>
            </div>
        )
    }
} 

module.exports = SearchBar;

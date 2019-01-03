var React = require('react');


class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        const { placeholder="" } = props;
        this.placeholder = placeholder;
        this.handleSortBy = this.handleSortBy.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleSearch(event) {
        var searchVal = document.getElementById("user-searchbar-input").value;
        this.props.handleSearch(searchVal);
    }

    handleSortBy(event) {

    }

    handleKeyUp(event) {
        this.props.handleKeyUp(event);
    }

    render() {
        return (
            <div className="field has-addons">
                <p className="control">
                    <span className="select">
                        <select onChange={this.handleSortBy}>
                            <option>Name</option>
                            <option>IC</option>
                        </select>
                    </span>
                </p>
                <p className="control has-icons-left is-expanded">
                    <input className="input" id="user-searchbar-input" type="text" placeholder={this.placeholder} onKeyUp={this.handleKeyUp}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </p>
                <p className="control">
                    <a className="button is-light" id="searchbar-btn" onClick={this.handleSearch}>
                        <span className="icon">
                            <i className="fas fa-search"></i>
                        </span>
                    </a>
                </p>
            </div>
        )
    }
} 

module.exports = SearchBar;

// const db = require("./models/db")
import db from './models/db';

const nameHeaderStyle = {
  width: '40%'
};
const icHeaderStyle = {
  width: '30%'
};
const borrowTimesHeaderStyle = {
  width: '25%'
};
const delHeaderStyle = {
  width: '5%'
};

function UserRow(props) {
  function handleClick(e) {
    e.target.parentNode.nextElementSibling.classList.toggle("hidden");
  }
  return (
    <tr onClick={handleClick}>
      <td>{props.name}</td>
      <td>{props.ic}</td>
      <td>{props.lastseen}</td>
      <td><DelButton /></td>
    </tr>
  );
}

function DelButton() {
  function handleClick(e) {
    var row = e.target.parentNode.parentNode;
    var profile = row.nextElementSibling;
    var ic = row.childNodes[1].textContent
    db.removeUser(ic).catch(err => {
        return alert("Error deleting user");
    })
    row.parentNode.removeChild(row);
    profile.parentNode.removeChild(profile);
  }
  return (
    <button onClick={handleClick}>DEL</button>
  )
}

const userProfileStyle = {
  backgroundColor: "#669999",
}

function UserProfile(props) {
  return (
    <tr style={userProfileStyle} className="hidden user-profile">
      <td colSpan="4"><p>Hello this is the profile of a user</p></td>
    </tr>
  )
}

class UserRecordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    // Populate table
    db.getUsers().then(users => {
      var newRows = this.state.rows.slice();
      users.forEach(user => {
        newRows.push(user);
      })
      this.setState({
        rows: newRows
      });
    }).catch(err => {
      console.log(err)
    });
    // Add user function
    var addUserBtn = document.getElementById("add-user-btn");
    addUserBtn.addEventListener("click", (e) => {
      this.addUser(e);
    });
    // Search function
    var searchBar = document.getElementById("search-bar-input");
    searchBar.addEventListener("keyup", (e) => {
      this.searchFunction(e);
    });
  }

  searchFunction(e) {
    var filter = e.target.value.trim().toUpperCase();
    var rows = Array.prototype.slice.call(document.getElementById("user-records-table").querySelectorAll("tr:not(.header):not(.user-profile)"));
    rows.forEach((row) => {
      var data = "";
      Array.prototype.slice.call(row.getElementsByTagName("td")).forEach((col) => {
        data += col.textContent;
      });
      if(data.toUpperCase().indexOf(filter) > -1) {
        row.classList.remove("hidden");
      } else {
        row.classList.add("hidden");
      };
    });
  }

  addUser(e) {
    // Disable button while the add user request is being processed
    e.target.classList.add("is-loading");
    var name = document.getElementById("username-input").value;
    var ic = document.getElementById("ic-input").value;
    // Add user to table
    db.addUser(name, ic).then((msg) => {
      db.getUser(ic).then((user) => {
        this.setState({
          rows: [...this.state.rows, user]
        });
      });
    }).catch((err) => {
      // capture errors
      alert("User already exists.")
    });
    // clear the input boxes
    document.getElementById("username-input").value = "";
    document.getElementById("ic-input").value = "";
    e.target.classList.remove("is-loading");
    alert("User added successfully!")
  }

  expandProfile

  render() {
    return (
      <table id="user-records-table">
        <tbody>
          <tr className="header">
            <th style={nameHeaderStyle}>Name</th>
            <th style={icHeaderStyle}>IC</th>
            <th style={borrowTimesHeaderStyle}>Borrow Times</th>
            <th style={delHeaderStyle}></th>
          </tr>
          {this.state.rows.map((user, i) => [<UserRow name={user.name} ic={user.ic} borrowtime={user.borrow_times} key={i}/>, <UserProfile key={user.name} />])}
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(<UserRecordsTable />, document.getElementById("root"));
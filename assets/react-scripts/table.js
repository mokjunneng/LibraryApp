// imports
var React = require('react');


// const userProfileStyle = {
//   backgroundColor: "#669999",
// }

// function UserProfile(props) {
//   return (
//     <tr style={userProfileStyle} className="hidden user-profile">
//       <td colSpan="5"><p>Hello this is the profile of a user</p></td>
//     </tr>
//   )
// }
function ColItem(props) {
  return (
    <td>{props.value}</td>
  )
}

function Row(props) {
  function handleClick(e) {
    e.target.parentNode.nextElementSibling.classList.toggle("hidden");
  }
  return (
    <tr>
      {Object.keys(props.columns).map((key, i) => { return <ColItem value={props.columns[key]} key={i} /> })}
      <td><DelButton queryCol={props.delOptions.queryCol} db={props.delOptions.db} del={props.delOptions.del} /></td>
    </tr>
  );
}

function TableHeader(props) {
  return (
    <th style={props.colStyle}>{props.colName}</th>
  )
}

function DelButton(props) {
  function handleClick(e) {
    var row = e.target.parentNode.parentNode;
    var queryCol = row.childNodes[props.queryCol - 1].textContent;
    if (props.db === "User") {
      dbUser.removeUser(queryCol);
    } else {
      dbBook.removeBook(queryCol);
    }
    row.parentNode.removeChild(row);
  }
  if (props.del) {
    return (
      <button onClick={handleClick}>DEL</button>
    )
  } else {
    return null;
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { subsetData, tableHeaderOptions, delOptions } = this.props;
    const currRows = subsetData;
    if (!subsetData.length) return null;

    return (
      <table id="user-records-table">
        <tbody>
          <tr className="header">
            {tableHeaderOptions.map((column, i) => <TableHeader colStyle={column.style} colName={column.name} key={i} />)}
          </tr>
          {currRows.map((row, i) => <Row columns={row} delOptions={delOptions} key={i}/>)}
        </tbody>
      </table>
    );
  }
}

module.exports = Table;

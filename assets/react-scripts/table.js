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
      <td><DelButton /></td>
      {/* <td>{props.name}</td>
      <td>{props.ic}</td>
      <td>{props.borrow_times}</td>
      <td>{props.lastseen}</td>
      <td><DelButton /></td> */}
    </tr>
  );
}

function TableHeader(props) {
  return (
    <th style={props.colStyle}>{props.colName}</th>
  )
}

function DelButton() {
  function handleClick(e) {
    var row = e.target.parentNode.parentNode;
    var profile = row.nextElementSibling;
    var ic = row.childNodes[1].textContent;
    dbUser.removeUser(ic);
    row.parentNode.removeChild(row);
    profile.parentNode.removeChild(profile);
  }
  return (
    <button onClick={handleClick}>DEL</button>
  )
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { subsetData, tableHeaderOptions } = this.props;
    const currRows = subsetData;
    if (!subsetData.length) return null;

    return (
      <table id="user-records-table">
        <tbody>
          <tr className="header">
            {tableHeaderOptions.map((column, i) => <TableHeader colStyle={column.style} colName={column.name} key={i} />)}
            {/* <th style={{width: "35%"}}>Name</th>
            <th style={{width: "25%"}}>IC</th>
            <th style={{width: "15%"}}>Borrow Times</th>
            <th style={{width: "20%"}}>Last Seen</th>
            <th style={{width: "5%"}}></th> */}
          </tr>
          {currRows.map((row, i) => <Row columns={row} key={i}/>)}
        </tbody>
      </table>
    );
  }
}

module.exports = Table;

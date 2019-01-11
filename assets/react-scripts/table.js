// imports
var React = require('react');


function ColItem(props) {
  return (
    <td>{props.value}</td>
  )
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.removedRow = this.removedRow.bind(this);
  }

  removedRow() {
    this.props.removedRow();
  }
  
  render() {
    const { columns, delOptions, removedRow } = this.props;
    return (
      <tr>
        {Object.keys(columns).map((key, i) => { return <ColItem value={columns[key]} key={i} /> })}
        <td><DelButton queryCol={delOptions.queryCol} db={delOptions.db} del={delOptions.del} removedRow={this.removedRow} /></td>
      </tr>
    );
  }
}

class DelButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var row = e.target.parentNode.parentNode;
    var queryCol = row.childNodes[this.props.queryCol - 1].textContent;
    if (this.props.db === "User") {
      dbUser.getUser(queryCol).then(user => {
        let borrowed_books;
        if(!user.borrowed_books) {
          console.log("empty")
          dbUser.removeUser(queryCol).then(() => {
            this.props.removedRow();
          });
          return
        }else {
          borrowed_books = JSON.parse(user.borrowed_books);
        }
        if (borrowed_books.length === 0) {
          console.log("empty array")
          dbUser.removeUser(queryCol).then(() => {
            this.props.removedRow();
          });
          return
        }
        alert("Can't delete user, user is still borrowing books! / Không thể xóa người dùng, người dùng này đang mượn sách")
      });
    } else {
      dbBook.getBook(queryCol).then(book => {
        if(!book.borrowed_by) {
          console.log("empty")
          dbBook.removeBook(queryCol).then(() => {
            this.props.removedRow();
          });
          return
        }
        alert("Can't delete book. Someone is still borrowing it. / Không thể xóa sách, có người đang mượn")
      })
     
    }
  }

  render() {
    if (this.props.del) {
      return (
        <button onClick={this.handleClick}>DEL</button>
      )
    } else {
      return null;
    }
  }
}

function TableHeader(props) {
  return (
    <th style={props.colStyle}>{props.colName}</th>
  )
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.removedRow = this.removedRow.bind(this);
  }

  removedRow() {
    this.props.removedRow();
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
          {currRows.map((row, i) => <Row columns={row} delOptions={delOptions} removedRow={this.removedRow} key={i}/>)}
        </tbody>
      </table>
    );
  }
}

module.exports = Table;

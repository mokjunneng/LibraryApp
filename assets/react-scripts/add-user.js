var React = require('react');

class AddUserSection extends React.Component {
    constructor(props) {
        super(props);
        this.addUser = this.addUser.bind(this);
    }

    addUser(event) {
        event.target.classList.add("is-loading");
        var name = document.getElementById("username-input").value;
        var ic = document.getElementById("ic-input").value;

        dbUser.addUser(name, ic).then(() => {
            this.props.addedUser();
        });
        
        document.getElementById("username-input").value = "";
        document.getElementById("ic-input").value = "";
        
        event.target.classList.remove("is-loading");
        alert("User added successfully!");
    }

    render() {
        return (
            <div>
                <h2>Thêm người dùng / Add User</h2>
                <div className="field">
                    <label className="label">Tên / Name</label>
                    <div className="control">
                        <input className="input" id="username-input" type="text" placeholder="e.g. Mok Jun Neng"></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Mã số / IC</label>
                    <div className="control">
                        <input className="input" id="ic-input" type="text" placeholder="e.g. a12345"></input>
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" id="add-user-btn" onClick={this.addUser}>Hoàn thành / Submit</button>
                </div>
            </div>
        );
    }
}

module.exports = AddUserSection;
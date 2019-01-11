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

        if (name === "") {
            document.getElementById("username-input").focus();
            event.target.classList.remove("is-loading");
            alert("Name is missing! / Không tìm thấy tên")
            return
        }

        if (ic === "") {
            document.getElementById("ic-input").focus();
            event.target.classList.remove("is-loading");
            alert("IC is missing! / Không tìm thấy mã số")
            return
        }

        dbUser.addUser(name, ic.toUpperCase()).then(() => {
            this.props.addedUser(); 
            alert("User added successfully! / Người dùng đã được thêm thành công");
        }).catch(err => {
            alert("Error adding new user! / Lỗi thêm người dùng");
        });
        
        document.getElementById("username-input").value = "";
        document.getElementById("ic-input").value = "";
        
        event.target.classList.remove("is-loading");  
    }

    render() {
        return (
            <div>
                <h2>Thêm người dùng / Add User</h2>
                <div className="field">
                    <label className="label">Tên / Name</label>
                    <div className="control">
                        <input className="input" id="username-input" type="text" placeholder="e.g Nguyễn Trung Quân"></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Mã số / IC</label>
                    <div className="control">
                        <input className="input" id="ic-input" type="text" placeholder="e.g. EVG001"></input>
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
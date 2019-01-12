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
            alert("Name is missing! / Không tìm thấy tên");
            return;
        }

        if (ic === "") {
            document.getElementById("ic-input").focus();
            event.target.classList.remove("is-loading");
            alert("IC is missing! / Không tìm thấy mã số");
            return;
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
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "Th\xEAm ng\u01B0\u1EDDi d\xF9ng / Add User"
            ),
            React.createElement(
                "div",
                { className: "field" },
                React.createElement(
                    "label",
                    { className: "label" },
                    "T\xEAn / Name"
                ),
                React.createElement(
                    "div",
                    { className: "control" },
                    React.createElement("input", { className: "input", id: "username-input", type: "text", placeholder: "e.g Nguy\u1EC5n Trung Qu\xE2n" })
                )
            ),
            React.createElement(
                "div",
                { className: "field" },
                React.createElement(
                    "label",
                    { className: "label" },
                    "M\xE3 s\u1ED1 / IC"
                ),
                React.createElement(
                    "div",
                    { className: "control" },
                    React.createElement("input", { className: "input", id: "ic-input", type: "text", placeholder: "e.g. EVG001" })
                )
            ),
            React.createElement(
                "div",
                { className: "control" },
                React.createElement(
                    "button",
                    { className: "button is-primary", id: "add-user-btn", onClick: this.addUser },
                    "Ho\xE0n th\xE0nh / Submit"
                )
            )
        );
    }
}

module.exports = AddUserSection;
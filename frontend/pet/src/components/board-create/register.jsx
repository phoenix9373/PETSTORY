import React, {Component} from "react";

class Register extends Component {
  render() {
    return (
      <div>
        <img width="250" height="250" src={this.props.uploadedImg.filePath} alt="" />
        <h3>{this.props.uploadedImg.fileName}</h3>
      </div>
    );
  }
}

export default Register;

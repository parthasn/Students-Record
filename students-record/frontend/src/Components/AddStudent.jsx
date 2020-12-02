import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";


export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      city: "",
      bloodGroup: "",
      gender: "",
      imageLink: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const { name, email, city, bloodGroup, imageLink, gender } = this.state;
    let payload = {
      name: name,
      email: email,
      city: city,
      bloodGroup: bloodGroup,
      gender: gender,
      imageLink: imageLink
    };

    // axios
    //   .post("http://localhost:5000/api/addstudent", {'Content-Type': 'application/json'}, { data: payload })
    //   .then((res) => console.log(res))
    //   .catch((error) => alert(error));

    let config = {
        method: 'post',
        url: 'http://localhost:5000/api/addstudent',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      
      axios(config)
      .then(res => {this.props.history.push('/students') })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { name, email, city, bloodGroup, imageLink, gender } = this.state;
    console.log(this.props);
    return (
      <div
        style={{ margin: "auto", width: 350, position: "relative", top: 100 }}
      >
        <h1>Add a Student</h1>
        <form>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="name"
              value={name}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="email"
              value={email}
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="city"
              value={city}
              id="outlined-basic"
              label="City"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="bloodGroup"
              value={bloodGroup}
              id="outlined-basic"
              label="Blood Group"
              variant="outlined"
            />
          </div>
          <TextField
            style={{ width: 350, margin: 5 }}
            onChange={this.handleChange}
            name="gender"
            value={gender}
            id="outlined-basic"
            label="Gender"
            variant="outlined"
          />
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="imageLink"
              value={imageLink}
              id="outlined-basic"
              label="Image Link"
              variant="outlined"
            />
          </div>
          <div>
            <Button
              onClick={this.handleClick}
              style={{ marginLeft: 5 }}
              variant="contained"
              color="primary"
            >
              ADD STUDENT
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

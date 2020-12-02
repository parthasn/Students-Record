import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      city: "",
      bloodGroup: "",
      gender: "",
      imageLink: "",
      student: []
    };
  }

  componentDidMount = () => {
    let config = {
        method: 'get',
        url: 'http://localhost:5000/api/student/'+this.props.match.params.id,
        headers: { 
          'Content-Type': 'application/json'
        }
    };
      
      axios(config)
      .then(res => (
        this.setState({
            name: res.data.name,
            email: res.data.email,
            city: res.data.city,
            bloodGroup: res.data.bloodGroup,
            gender: res.data.gender,
            imageLink: res.data.imageLink

        })
     ))
     .catch(err => {
         alert(err)
     })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };



  handleUpdate = () => {

    const { name, email, city, bloodGroup, imageLink, gender } = this.state;
    console.log("state",this.state)

    let payload = {
      name: name,
      email: email,
      city: city,
      bloodGroup: bloodGroup,
      gender: gender,
      imageLink: imageLink,
    };

    let config = {
      method: "post",
      url: `http://localhost:5000/api/student/update/${this.props.match.params.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    axios(config)
      .then((res) => {
        this.props.history.push("/students");
      })
      .catch((err) => alert(err));
  };

  render() {
    console.log("props", this.props);
    const { name, email, city, bloodGroup, imageLink, gender, student } = this.state;
    console.log(this.props.match.params.id);
    console.log("student",student)
    return (
      <div
        style={{ margin: "auto", width: 350, position: "relative", top: 100 }}
      >
        <h1>Edit Information</h1>
        <form>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="name"
              value={name}
              id="outlined-basic"
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
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="gender"
              value={gender}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: 350, margin: 5 }}
              onChange={this.handleChange}
              name="imageLink"
              value={imageLink}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div>
            <Button
              onClick={this.handleUpdate}
              style={{ marginLeft: 5 }}
              variant="contained"
              color="primary"
            >
              UPDATE
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

import React from "react";
import axios from "axios";
import Card from "./Card";
import Pagination from "@material-ui/lab/Pagination";

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      active_page: 1,
      total_data: 0,
      limit: 6,
    };
  }

  componentDidMount = async () => {
    const { limit, active_page } = this.state;
    await axios
      .get(
        `http://localhost:5000/api/students?page=${active_page}&limit=${limit}`
      )
      .then((res) => {
        console.log("res", res.data);
        this.setState({
          students: res.data.current,
          total_data: res.data.totalItem
        });
      })
      .catch((err) => console.log(err));
  };

  handlePageChange = (e, page) => {
    const { limit, active_page } = this.state;
    console.log("event", e.target);
    console.log("page", page);
    this.setState({
        active_page: page
    })
    axios
      .get(
        `http://localhost:5000/api/students?page=${active_page}&limit=${limit}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          students: res.data.current,
          total_data: res.data.totalItem,
          //active_page: page
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { students, limit, active_page, total_data } = this.state;
    const count = Math.ceil(Number(total_data) / Number(limit));
    console.log(total_data);
    return (
      <>
        <div
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: 30,
          }}
        >
          {students &&
            students?.map((student) => (
              <div key={student.name}>
                <Card data={student} />
              </div>
            ))}
        </div>
        <Pagination
          style={{ marginLeft: "40%" }}
          count={count}
          onChange={this.handlePageChange}
          color="secondary"
          variant="outlined"
          shape="rounded"
          page={Number(active_page)}
        />
      </>
    );
  }
}

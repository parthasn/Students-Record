import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const CardWrapper = styled.div`
  height: 400px;
  width: 350px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  
  border-radius: 10px;

  &: hover {
    box-shadow: 5px 5px 10px 10px #d8d4d4;
  }
`;
const Image = styled.img`
  border: 1px solid black;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  margin: 30px;
`;

export default function Card({ data }) {
  const { _id, name, email, city, bloodGroup, imageLink } = data;
  
 const handleDelete = () => {
    axios
      .delete(
        `http://localhost:5000/api/student/${ _id}`
      )
      .then((res) => (
        window.location.reload(false)
      ))
      .catch((err) => alert(err));
  };

  
  return (
   
    <div>
      <CardWrapper>
        <Image src={imageLink} alt={name} />
        <h3 style={{ margin: 0, color: "blue" }}>{name}</h3>
        <div
          style={{
            textAlign: "left",
            marginLeft: 10,
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <h4 style={{ margin: 0 }}>E-mail : {email}</h4>
          <h4 style={{ margin: 0 }}>City : {city}</h4>
          <h4 style={{ margin: 0 }}>Blood Group : {bloodGroup}</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <div
              onClick={handleDelete}
              style={{
                width: 135,
                padding: 10,
                margin: 10,
                backgroundColor: "red",
                borderRadius: 10,
              }}
            >
              DELETE
            </div>
          </Link>
          <Link
            to={`/editstudent/${_id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              style={{
                width: 135,
                padding: 10,
                margin: 10,
                backgroundColor: "green",
                borderRadius: 10,
              }}
            >
              EDIT
            </div>
          </Link>
        </div>
      </CardWrapper>
    </div>
  );
}

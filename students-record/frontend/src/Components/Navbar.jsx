import React from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'

const NavWrapper = styled.div`
    background-color: #ff3333;
    position: fixed;
    top: 0px;
    margin: 0px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    
`

function Navbar() {
    return (
        <>
           <NavWrapper>
                <div style = {{margin: 20}}>
                    <Link style = {{textDecoration: "none", color: "white"}} to="/">Students</Link>
                </div>
                <div style = {{margin: 20}}>
                    <Link style = {{textDecoration: "none", color: "white"}} to="/addstudent">Add Student</Link>
                </div>
           </NavWrapper>
        </>
    );
}

export default Navbar
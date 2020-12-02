import React from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/Auth/action';
import { useHistory } from 'react-router-dom';

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
    const dispatch = useDispatch()
    const history = useHistory()
    const { isAuth } = useSelector((state) => state.auth);
    console.log(isAuth)
    const handleLogout = () => {
        dispatch(logoutUser())
        history.push('/')
    }
    return (
        <>
           <NavWrapper>
           <div style = {{margin: 20}}>
                    {
                        isAuth? (
                            <Link style = {{textDecoration: "none", color: "white"}} to="/students">Students</Link>
                        ) : (
                            <Link style = {{textDecoration: "none", color: "white"}} to="/">Students</Link>
                        )
                    }
                </div>
                <div style = {{margin: 20}}>
                    {
                        isAuth? (
                            <Link style = {{textDecoration: "none", color: "white"}} to="/addstudent">Add Student</Link>
                        ) : (
                            <Link style = {{textDecoration: "none", color: "white"}} to="/">Add Student</Link>
                        )
                    }
                </div>
                <div style = {{margin: 20}}>
                {
                        isAuth? (
                           
                        <button style = {{border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", padding: "10px"}} onClick = {handleLogout}>Logout</button>
                    
                        ) : (
                            <Link style = {{textDecoration: "none", color: "white"}} to="/">
                        Sign In
                    </Link>
                        )
                    }
                </div>
           </NavWrapper>
        </>
    );
}

export default Navbar
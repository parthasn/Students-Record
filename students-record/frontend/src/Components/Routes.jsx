import React from "react"
import { Route } from "react-router-dom"
import EditStudent from "./EditStudent"
import AddStudent from "./AddStudent"
import Students from "./Students"
import Login from "./Login"
import Register from "./Register"


function Routes(){
    return(
        <>
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} />
        <Route path="/addstudent" exact render={(props)=> <AddStudent {...props}/>}/>
        <Route path="/students" exact render={(props)=> <Students {...props}/>}/>
        <Route path = "/editstudent/:id" exact render = {(props) => <EditStudent {...props}/>}/>
        </>
    )
}
export default Routes
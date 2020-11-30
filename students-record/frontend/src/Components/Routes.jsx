import React from "react"
import { Route } from "react-router-dom"
import EditStudent from "./EditStudent"
import AddStudent from "./AddStudent"
import Students from "./Students"

function Routes(){
    return(
        <>
        <Route path="/addstudent" exact render={(props)=> <AddStudent {...props}/>}/>
        <Route path="/" exact render={(props)=> <Students {...props}/>}/>
        <Route path = "/editstudent/:id" exact render = {(props) => <EditStudent {...props}/>}/>
        </>
    )
}
export default Routes
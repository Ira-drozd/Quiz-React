import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {logout} from "../../store/actions/auth";

const Logout = (props) => {

    const {logout}=props
    useEffect(()=>{
        logout()
    },[logout])


    return(
        <Redirect to={'/'}/>
    )
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout);
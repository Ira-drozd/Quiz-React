import React, {useState} from "react";
import classes from './Layout.module.scss'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

const Layout = (props) => {

    const [isOpen, setIsOpen]=useState(false)

    const toggleMenuHandler = () => {
        setIsOpen(prevState => !prevState)
    }

    const menuCloseHandler=()=>{
        setIsOpen(false)
    }

    return (
        <div className={classes.Layout}>
            <Drawer
                isOpen={isOpen}
                onClose={menuCloseHandler}
                isAuthenticated={props.isAuthenticated}
            />
            <MenuToggle
                onToggle={toggleMenuHandler}
                isOpen={isOpen}
            />
            <main>
                {props.children}
            </main>
        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps) (Layout)
import React from "react";
import classes from './Drawer.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop";
import {NavLink} from "react-router-dom";

const links = [
    {
        to:'/',
        label:'List',
        exact: true
    },
    {
        to:'/auth',
        label:'Authorization',
        exact: false
    },
    {
        to:'/quiz-creator',
        label:'Create test',
        exact: false
    }
]



const Drawer = (props) => {


    const renderLinks = links.map((link, index) => {
        return <li key={index}>
            <NavLink
                to={link.to}
                exact={link.exact}
                activeClassName={classes.active}
                onClick={props.onClose}
            >
                {link.label}
            </NavLink>
            </li>
    })


    const cls = [classes.Drawer]

    if (!props.isOpen) {
        cls.push(classes['clause'])
    }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks}
                </ul>
            </nav>
            {
                props.isOpen
                    ? <BackDrop
                        onClick={props.onClose}
                    />
                    : null
            }

        </>
    )
}

export default Drawer
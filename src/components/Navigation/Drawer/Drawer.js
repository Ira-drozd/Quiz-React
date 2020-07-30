import React from "react";
import classes from './Drawer.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop";
import {NavLink} from "react-router-dom";


const Drawer = (props) => {


    const renderLinks = (links) => links.map((link, index) => {
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

    const links = [
        {
            to: '/',
            label: 'List',
            exact: true
        }
    ]

    if(props.isAuthenticated){
     links.push(
         {
             to: '/quiz-creator',
             label: 'Create test',
             exact: false
         },
         {
             to: '/logout',
             label: 'Logout',
             exact: false
         }
     )
    } else {
       links.push(
           {
               to: '/auth',
               label: 'Authorization',
               exact: false
           }
       )
    }

    console.log(props.isAuthenticated)

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks(links)}
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
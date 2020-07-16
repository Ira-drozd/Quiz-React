import React from "react";
import classes from './Drawer.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop";

const links = [1, 2, 3]

const Drawer = (props) => {

    const renderLinks = links.map((link, index) => {
        return <li key={index}><a>Link {link}</a></li>
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
import React from 'react';
import classes from './Loader.module.scss'

const Loader = (props) => {
return(
    <div className={classes.Loader}>
        <div className={classes['lds-roller']}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    </div>
)
};

export default Loader;
import React from 'react';
import { Card } from 'react-bootstrap';
import classes from './Terms.module.css';


const TermText = <div className={classes.wrapper}><h1>Terms and Condition</h1><div className={classes.para}><p>Help out photo UCG accuracy by ranking images (1-20) based on qualityIt is a long established fact that a reader will be distracted by the readable content of a pagewhen looking at its layout. The point of using Lorem Ipsum is that it has a moreor-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page</p><p>Help out photo UCG accuracy by ranking images (1-20) based on qualityIt is a long established fact that a reader will be distracted by the readable content of a pagewhen looking at its layout. The point of using Lorem Ipsum is that it has a moreor-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page</p><p>Help out photo UCG accuracy by ranking images (1-20) based on qualityIt is a long established fact that a reader will be distracted by the readable content of a pagewhen looking at its layout. The point of using Lorem Ipsum is that it has a moreor-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page</p></div></div>;

const Terms = () => {
    return (
        <div className={classes.body}>
            <Card>{TermText}</Card>
            <div className={classes.btns}>
                <button className={classes.agree}>I agree</button>
            </div>
        </div>
    )
};

export default Terms;
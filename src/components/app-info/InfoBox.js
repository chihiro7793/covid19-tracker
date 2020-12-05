import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';
import React from 'react';

function InfoBox({ title, cases, total }) {
    return (
        <Card className='info-box'>
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">
                    {title}
                </Typography>
                <h2 className='infoBox__case'>{cases}</h2>
                <Typography className='infoBox__total' color="textSecondary">
                    {total} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
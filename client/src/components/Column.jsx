import { Card,CardContent,Button,CardActions, CardHeader } from '@material-ui/core';
import React from 'react';
import Task from './Task';
export default ({column, refreshBoard}) => {
    return (
    <Card style={{margin:"1rem"}}>
        <CardHeader title={column.name}/>
        <CardContent>
            {column.tasks && column.tasks.map((task) => <Task key={task._id} task={task} refreshBoard={refreshBoard} />)}
        </CardContent>
        <CardActions>
            <Button style={{margin:"auto"}} size="large">Add Task</Button>
        </CardActions>
    </Card>
    )
}
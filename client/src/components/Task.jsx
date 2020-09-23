import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useDrag } from 'react-dnd';

export default ({task}) => {
    const [{isDragging}, drag] = useDrag({
        item: { type: "TASK", name: task.name },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });

    return (
        <Card style={{margin:"1rem",minWidth:200}} ref={drag}>
            <CardContent>
                <Typography variant="h5" component="p">
                    {task.Name}
                </Typography>
            </CardContent>
        </Card>
    )
}
import React,{useState,useEffect} from 'react';
import Column from '../components/Column';
import axios from 'axios';

export default ({id}) => {
    const [columns,setColumns] = useState([
        {
            name:"Name",
            locked:false,
            tasks:[
                {name:"task1"},
                {name:"task2"},
                {name:"task3"}
            ]
        },
        {
            name:"Name2",
            locked:false,
            tasks:[
                {name:"task1"},
                {name:"task2"},
                {name:"task3"}
            ]
        }
    ]);

    const addColumn = e => {
        e.preventDefault();
        // axios.post('http://localhost:8000/api/columns/create',{
        //     name:"Name",
        //     locked:false,
        //     tasks:[],
        //     board:
        // })
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err));
        setColumns([...columns,{name:"Name",locked:false,tasks:[]}]);
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/boards/')
        .then(resp => console.log(resp.data))
        .catch(err => console.log(err));
    },[columns]);

    return (
        <div>
            <h1>Board</h1>
            <button onClick={addColumn}>Add Column</button>
            <div style={{display:"flex",padding:20}}>
                {columns && columns.map((column,i) => <Column key={i} tasks={column.tasks} locked={column.locked} name={column.name}/>)}
            </div>
        </div>
    )
}
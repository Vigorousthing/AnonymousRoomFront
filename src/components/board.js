import React, { Component, useState } from 'react';
import { ItemTypes } from './COSNTANT'
import { useDrag } from 'react-dnd'


function MyBoard() {
    const [data, setList] = useState([1,2,3,4,5]);
    // setList(...data, [1,2,3,4,5])

    console.log(data)
    return (

        <div
        style={{
            border: 'solid',
            width: '100px'
        }}
        >
            {data.map((each, idx) => <p>each</p>)}           
        </div>
    ) 
}

export default MyBoard;
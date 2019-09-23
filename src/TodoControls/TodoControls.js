import React from 'react';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';

export const TodoControls = (props) => <div>
    <button>all</button>
    <button>completed</button>
    <button>incomplete</button>
    <ProgressIndicator todoArray={props.todoArray}/>
</div>
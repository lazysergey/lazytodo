import React from './../../node_modules/react';
import './ProgressIndicator.scss';

export const ProgressIndicator = ({ todoArray }) => {
    const completedCount = todoArray.filter(t => t.completed).length;
    const allCount = todoArray.length;
    const progress = completedCount / allCount;
    const color = `hsl(${35 + progress * 155}, 100%, 50%)`;
    return <>
        <div className="progress__wrapper">
            <span className="progress__title" style={{color: color}}>{completedCount} of {allCount}</span>
            <svg className="progress__indicator progress__indicator--circle" viewBox="0 0 50 50" style={progress ? { strokeDashoffset: 144 - progress * 144 } : null} >
                <circle cx="25" cy="25" r="23" stroke={color} />
            </svg>
        </div>
    </>
}
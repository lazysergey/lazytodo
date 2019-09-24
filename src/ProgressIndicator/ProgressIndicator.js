import React from 'react';
import './ProgressIndicator.scss';

export const ProgressIndicator = ({ todos }) => {
    const completedCount = todos.filter(t => t.completed).length;
    const allCount = todos.length;
    const progress = completedCount / allCount;
    const hue = {
        from: 160,
        to: 220
    }
    const color = `hsl(${hue.from + progress * (hue.to - hue.from)}, 75%, 50%)`;
    const svgStrokeStyle = progress ? { strokeDashoffset: 144 - progress * 144 } : null;

    return (
        <div className="progress__wrapper">
            <span className="progress__title" style={{ color: color }}>{completedCount} of {allCount}</span>
            <svg className="progress__indicator progress__indicator--circle" viewBox="0 0 50 50" style={svgStrokeStyle} >
                <circle cx="25" cy="25" r="23" stroke={color} />
            </svg>
        </div>
    )
}

// ProgressIndicator.prop
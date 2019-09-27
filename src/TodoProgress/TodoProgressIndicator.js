import React from 'react';
import PropTypes from 'prop-types';
import './TodoProgressIndicator.scss';

export const TodoProgressIndicator = ({ todosInitial }) => {
    const completedCount = todosInitial.filter(t => t.completed).length;
    const allCount = todosInitial.length;
    const progress = completedCount / allCount;
    const hue = {
        from: 200,
        to: 170
    }
    const color = `hsl(${hue.from + progress * (hue.to - hue.from)}, 75%, 50%)`;
    const svgStrokeStyle = { strokeDashoffset: 145 - (progress || 0) * 145 };

    return (
        <div className="progress__wrapper">
            <span className="progress__title" style={{ color: "hsl(170, 75%, 50%)" }}>
                {completedCount} of {allCount}
            </span>
            <svg className="progress__indicator progress__indicator--circle" viewBox="0 0 50 50" >
                <circle cx="25" cy="25" r="23" className="ring--back" />
                <circle cx="25" cy="25" r="23" className="ring--filler" stroke="transparent" opacity={progress || 0} />
                <circle cx="25" cy="25" r="23" className="ring--front" stroke={color} style={svgStrokeStyle} />
            </svg>
        </div>
    )
}

TodoProgressIndicator.propTypes = {
    todosInitial: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
}

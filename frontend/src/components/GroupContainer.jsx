import React from 'react';

const GroupContainer = ({ title, score, ...props }) => {
    return (
        <div className='group_container'>
            <div className='group_header' style={{
                display: "flex",
                alignItems: "center"
            }}>
                <h5>{title}</h5>
                <div className="score" style={{
                    marginRight: "0",
                    marginLeft: "auto",
                    fontWeight: "600",
                    color: "#E04D01",
                    fontSize: "18px"
                }}>{score}</div>
            </div>
            {props.children}
        </div>
    );
};

export default GroupContainer;
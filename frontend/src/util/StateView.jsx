import { CircularProgress } from '@mui/material';
import React from 'react';

const StateView = ({state, ...props}) => {
    return (
        <div>
            {
                state.isLoading && <CircularProgress />
            }
            {
                state.error && <div>Error : {state.error}</div>
            }
            { props.children }
        </div>
    );
};

export default StateView;
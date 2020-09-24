import React from 'react';

import './Container.scss';

const SharedContainer = ({ children }) => {
    return (
        <div className="container">
            {children}
        </div>
    );
};

export default SharedContainer;
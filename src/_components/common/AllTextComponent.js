import React from 'react';

const AllTextComponent = ({subtitle , title, content}) => {
    return (
        <div>
            <div className="all-text-component">
              {subtitle && (<div className="all-text-subtitle">{subtitle}</div>)}
              {title && (<h2>{title}</h2>)}
              <div className="all-text-component-content">
                {content}
              </div>
            </div>
        </div>
    );
};

export default AllTextComponent;
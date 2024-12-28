// NoData.js
import React from 'react';
import './NoData.css'; // Import your CSS file for styling

const NoData = (props) => {
    return (
        <div className="no-data-container">
            <div className="no-data-icon">📭</div> {/* You can use an icon or image */}
            <h2>No Data Available</h2>
            <p>Please check back later or try a different search.</p>
            {props.linkHref && props.linkText &&
                <p><a href={props.linkHref}>{props.linkText}</a></p>
            }
        </div>
    );
};

export default NoData;
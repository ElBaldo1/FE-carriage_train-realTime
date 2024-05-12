import React from 'react';
import './logoStyle.css';  // Make sure the path to your CSS file is correct
import logoSTIB from './logo_STIB.png';

function ImageComponent() {
    return (
        <div className="image-container">
            <img src={logoSTIB} alt="Logo STIB" className="logo-image"/>
            <h1>STIB MIVB</h1>
        </div>
    );
}

export default ImageComponent;

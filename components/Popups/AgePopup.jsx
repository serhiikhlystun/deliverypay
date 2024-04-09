'use client'

import React, { useEffect, useState } from 'react';
import '../common/Popup.sass';

import logoBig from './img/420-logo-big.svg';

const AgePopup = ({ onClose }) => {
    const [shouldShowPopup, setShouldShowPopup] = useState(false);

    useEffect(() => {
        const agePopupShown = localStorage.getItem('agePopupShown');
        if (!agePopupShown) {
            setShouldShowPopup(true);
            document.body.style.setProperty('overflow', 'hidden');
        }
    }, []);

    const closeAgePopup = (accepted) => {
        if (accepted) {
            localStorage.setItem('agePopupShown', true);
        }
        onClose();
        document.body.style.setProperty('overflow', 'inherit');
    };

    return shouldShowPopup ? (
        <div className="popup__wrapp">
            <div className="popup__age">
                <img src={logoBig} alt="" className="popup__age-logo" />
                <h4 className="popup__age-title">
                    Are you 21 years old?
                </h4>
                <div className="popup__age-btns-wrapp">
                    <button className="popup__save-btn" onClick={() => closeAgePopup(true)}>
                        YES
                    </button>
                    <button className="popup__save-btn white" onClick={() => closeAgePopup(false)}>
                        No
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default AgePopup;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from "react";
import './styles/spinner.scss';

class Spinner extends Component {
    render() {
        return (
            <>
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            </>
        )
    }
}

export default Spinner;
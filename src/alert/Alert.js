import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alert }) => {
    return (
        <div className="row">
            <div className="alert alert-warning" role="alert">
                { alert }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        alert: state.cart.alert
    };
};

export default connect(mapStateToProps)(Alert);

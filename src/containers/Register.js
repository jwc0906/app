import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw, email) {

        return this.props.registerRequest(id, pw, email).then(
            () => {
              console.log("this.props.status: "+this.props.status)
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success! Please log in', 2000);
                    browserHistory.push('/login');
                    return true;
                }
            }
        ).catch(function (reason) {
            Materialize.toast(reason.message, 3000);
          }
        )
    }
    render() {
        return (
            <div>
                <Authentication mode={false} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        error: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw, email) => {
            return dispatch(registerRequest(id,pw,email));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

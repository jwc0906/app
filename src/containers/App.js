import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';

class App extends React.Component {

    constructor(props) {
          super(props);
          this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
      this.props.getStatusRequest().then(()=>{
        console.log("isValid"+this.props.status.valid)
        console.log("isLoggedIn"+this.props.status.isLoggedIn)
      })
    }

    handleLogout(){
      this.props.logoutRequest().then(
        ()=>{
          Materialize.toast('Good Bye!', 2000);
        }
      )
    }

    render(){
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                               onLogout={this.handleLogout}/>}
                
                { this.props.children }
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

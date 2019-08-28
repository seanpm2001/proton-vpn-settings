import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, ModalsChildren } from 'react-components';
import { loadOpenPGP } from 'proton-shared/lib/openpgp';

import PublicLayout from './components/layout/PublicLayout';
import LoginContainer from './containers/LoginContainer';
import ResetPasswordContainer from './containers/ResetPasswordContainer';
import ForgotUsernameContainer from './containers/ForgotUsernameContainer';
import RedeemContainer from './containers/RedeemContainer';
import SignupContainer from './containers/SignupContainer/SignupContainer';
import InviteContainer from './containers/InviteContainer/InviteContainer';
import SignupProvider from './containers/SignupContainer/SignupProvider';

const PublicApp = ({ onLogin }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            await Promise.all([loadOpenPGP()]);
        })()
            .then(() => setLoading(false))
            .catch(() => setError(true));
    }, []);

    if (error) {
        return 'OpenPGP failed to load. Handle better.';
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <ModalsChildren />
            <PublicLayout>
                <Router>
                    <Switch>
                        <Route path="/redeem" component={RedeemContainer} />
                        <Route path="/reset-password" component={ResetPasswordContainer} />
                        <Route path="/forgot-username" component={ForgotUsernameContainer} />
                        <Route path="/invite" exact component={InviteContainer} />
                        <Route
                            exact
                            path="/signup"
                            render={() => (
                                <SignupProvider onLogin={onLogin}>
                                    <SignupContainer />
                                </SignupProvider>
                            )}
                        />
                        <Route render={() => <LoginContainer onLogin={onLogin} />} />
                    </Switch>
                </Router>
            </PublicLayout>
        </>
    );
};

PublicApp.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default PublicApp;
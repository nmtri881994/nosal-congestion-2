import React, { Component } from 'react';
import jsHttpCookie from 'cookie';

import { initializeStore } from '../store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
    if (isServer) {
        return initializeStore(initialState);
    };

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
    };

    return window[__NEXT_REDUX_STORE__];
};

export default App => {
    return class AppWithRedux extends Component {
        static async getInitialProps(appContext) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const req = appContext.ctx.req;
            let cookiesJSON = {};
            if (req && req.headers) {
                const cookies = req.headers.cookie;
                if (typeof cookies === 'string') {
                    cookiesJSON = jsHttpCookie.parse(cookies);
                }
            }

            // console.log(cookiesJSON.user);
            // console.log(JSON.parse(cookiesJSON.user));

            const reduxStore = getOrCreateStore({
                loginUser: cookiesJSON.user ? JSON.parse(cookiesJSON.user) : {
                    systemAccessToken: "",
                    refreshToken: "",
                    userInfo: {
                        firstName: "",
                        avatar: ""
                    }
                }
            });

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext);
            };

            return {
                ...appProps,
                initialReduxState: reduxStore.getState()
            };
        }

        constructor(props) {
            super(props);
            // console.log(121312, props.initialReduxState);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        render() {
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
};

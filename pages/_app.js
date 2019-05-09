import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/withReduxStore';
import { Provider } from 'react-redux';

import { appWithTranslation } from '../configs/i18next';

class MyApp extends App {
    render() {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
};

export default appWithTranslation(withReduxStore(MyApp));
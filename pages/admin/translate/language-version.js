import jsHttpCookie from 'cookie';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { i18n, withNamespaces } from '../../../configs/i18next';

import AdminLayout from '../../../components/layouts/admin/Layout2';
import TranslatePost from '../../../components/items/admin/translate/TranslatePost';

const isServer = typeof window === 'undefined';

const LanguageVersion = (props) => {

    return (
        <>
            <AdminLayout userInfo={props.userInfo} originalUrl={props.router.pathname} selectedNav={"translate"}>
                <TranslatePost />
            </AdminLayout>
            <style jsx global>{`
            html{
                background: #192433
            }
            `}</style>
        </>
    );
};

LanguageVersion.propTypes = {
    t: PropTypes.func.isRequired
}

LanguageVersion.getInitialProps = async function ({ req }) {
    return {
        originalUrl: req ? req.originalUrl : "",
        namespacesRequired: ['admin']
    }
};

function mapStateToProps(state) {
    // console.log(111, state);
    return {};
};


export default withNamespaces('admin')(connect(mapStateToProps)(withRouter(LanguageVersion)));
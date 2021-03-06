import jsHttpCookie from 'cookie';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { i18n, withNamespaces } from '../../../configs/i18next';

import AdminLayout from '../../../components/layouts/admin/Layout2';
import CreatePost from '../../../components/items/admin/translate/Create'

const isServer = typeof window === 'undefined';

const Index = (props) => {

    return (
        <>
            <AdminLayout userInfo={props.userInfo} originalUrl={props.router.pathname} selectedNav={"translate"}>
                <CreatePost />
            </AdminLayout>
            <style jsx global>{`
            html{
                background: #192433
            }
            `}</style>
        </>
    );
};

Index.propTypes = {
    t: PropTypes.func.isRequired
}

Index.getInitialProps = async function ({ req }) {
    return {
        namespacesRequired: ['admin']
    }
};

function mapStateToProps(state) {
    // console.log(111, state);
    return {};
};


export default withNamespaces('admin')(connect(mapStateToProps)(withRouter(Index)));
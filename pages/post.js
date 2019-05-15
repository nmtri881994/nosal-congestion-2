import { i18n, withNamespaces, Router } from '../configs/i18next';
import { withRouter } from 'next/router';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import MainLayout from '../components/layouts/main/Layout';
import IndexPostList from '../components/items/post/IndexPostList';
import Post from '../components/items/post/Post';

import { getPostByID as getPostByIDApi } from '../apis/postApi';

const Index = (props) => {

    const [post, setPost] = useState(null);

    useEffect(() => {
        let isSubcribed = true;
        async function getPost() {
            const getPostRes = await getPostByIDApi({
                postID: props.router.query.postID
            });
            if (getPostRes) {
                const getPostData = await getPostRes.json();
                if (getPostData && getPostRes.status === 200) {
                    if (isSubcribed) {
                        setPost(getPostData);
                    }
                } else {
                    Router.replace("/");
                }
            } else {
                Router.replace("/");
            }
        };

        getPost();

        return () => isSubcribed = false;
    }, [])

    return (
        <MainLayout>
            {post ? <Post post={post} lang={props.router.query.lang} postID={props.router.query.postID} postName={props.router.query.postName} /> : null}
        </MainLayout>
    );
};

Index.getInitialProps = async function () {
    return {
        namespacesRequired: ['common', 'login']
    }
};

Index.propTypes = {
    t: PropTypes.func.isRequired
}

export default withNamespaces('common')(withRouter(Index));
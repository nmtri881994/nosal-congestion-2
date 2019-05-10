import PostItem from './PostItem';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';;
import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import { withRouter } from 'next/router';

import { getPostsByTypeAndLang as getPostsByTypeAndLangApi } from '../../../apis/postApi';

const IndexPostList = (props) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        let isSubscribed = true;

        async function getPost() {
            const lang = `["${props.lng}"]`;
            const type = `["${props.type}"]`;

            const getPostsRes = await getPostsByTypeAndLangApi({
                skip: 0,
                limit: 10,
                sortBy: "",
                type: type,
                lang: lang
            });

            if (getPostsRes && getPostsRes.status === 200) {
                const getPostsData = await getPostsRes.json();
                if (getPostsData) {
                    if (isSubscribed) {
                        setPosts(getPostsData.data.postByTypeAndLang);
                    };
                } else {
                    if (isSubscribed) {
                        setPosts([]);
                    };
                }
            } else {
                if (isSubscribed) {
                    setPosts([]);
                };
            }
        }
        if (isSubscribed) {
            getPost();
        };

        return () => isSubscribed = false;
    }, [])

    return (
        <>
            <div className="post-list-container-1">
                <div className="post-list-container-2">
                    {posts ? posts.posts.map(post => <PostItem key={post._id} post={post} />) : null}
                </div>
            </div>
            <style jsx>{`
                .post-list-container-2 {
                    display: flex;
                    flex-direction: column;
                }
                .post-list-container-2 {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;

                    flex-wrap: wrap;

                    // height: 200px;

                    margin-top: -20px;
                    margin-right: -20px;
                }
            `}</style>
        </>
    )
};

IndexPostList.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

IndexPostList.propTypes = {
    t: PropTypes.func.isRequired
};

export default withRouter(withNamespaces('index')(IndexPostList));
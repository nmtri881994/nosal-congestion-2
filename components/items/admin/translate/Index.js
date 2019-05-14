import ReactTable from 'react-table';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { i18n, Link, withNamespaces, Router } from '../../../../configs/i18next';


import { getPostsOfUser as getPostsOfUserApi, getPostNameForURL as getPostNameForURLApi } from '../../../../apis/postApi';

import { informAnnouncement } from '../../../../actions/informAnnouncement'

const Index = (props) => {

    const columns = [{
        Header: 'Name',
        accessor: 'detail.originalName',
        sortable: false
    }, {
        Header: 'Original Language',
        accessor: 'detail.originalLanguage',
        sortable: false
    }, {
        Header: 'Create Date (can sort)',
        id: 'createDate',
        accessor: d => d.createDate
    }, {
        Header: 'Type',
        accessor: 'detail.type',
        Cell: props => <div className="multi-option-containter-1">{props.value.map(type =>
            <div key={type.code} className='array-item'>{type.text}</div>
        )}</div>,
        sortable: false
    }, {
        Header: 'Number of Views',
        accessor: 'numberOfViews',
        sortable: false
    }, {
        Header: 'Available Language (can select)',
        id: 'availableLanguages',
        accessor: d => {
            return {
                availableLanguages: d.availableLanguages,
                _id: d._id,
                name: getPostNameForURLApi(d.detail.originalName)
            }
        },
        Cell: props => <div className="multi-option-containter-1">{props.value.availableLanguages.map(lang => <Link key={lang.code} as={`/admin/translate/ls/${props.value.name}/${props.value._id}/${lang.code}`} href={`/admin/translate/language-version?postName=${props.value.name}&postID=${props.value._id}&lang=${lang.code}`}><span className='array-item noselect cursor-pointer hover-blue'>
            <a>{lang.text}</a>
        </span></Link>)}</div>,
        sortable: false
    }]

    function onChooseLanguage(postId, lang) {
        console.log(postId, lang);
    }

    const [posts, setPost] = useState({
        data: [],
        loading: true,
        numberOfPages: null
    });

    async function callGetPostsApi(systemAccessToken, skip, limit, sortBy) {


        const userPostsRes = await getPostsOfUserApi({
            systemAccessToken: systemAccessToken,
            skip: skip,
            limit: limit,
            sortBy: sortBy
        });
        if (userPostsRes) {
            const userPostsData = await userPostsRes.json();
            let newPosts = Object.assign({}, posts);

            if (userPostsData.data.postsOfUser) {
                newPosts.data = userPostsData.data.postsOfUser.posts;
                newPosts.data.map(data => {
                    data.detail.originalLanguage = props.t(data.detail.originalLanguage);
                    data.detail.type = data.detail.type.map(type => { return { code: type, text: props.t(type) } });
                    data.availableLanguages = data.availableLanguages.map(lang => { return { code: lang, text: props.t(lang) } });
                    return data;
                })

                newPosts.numberOfPages = userPostsData.data.postsOfUser.numberOfPages;
                newPosts.loading = false;
            }
            setPost(newPosts);
        } else {
            props.dispatch(informAnnouncement({
                type: 2,
                content: ["got-error"]
            }));
        }
    }

    // useEffect(() => {
    //     if (posts.data.length === 0) {
    //         callGetPostsApi(props.loginUser.systemAccessToken, 0, 10, []);
    //     };
    // });

    function fetchData(state, instance) {
        let newPostLoading = Object.assign({}, posts);
        newPostLoading.loading = true;
        setPost(newPostLoading);

        callGetPostsApi(props.loginUser.systemAccessToken, state.page * state.pageSize, state.pageSize, `{${state.sorted.map(sort => `\\"${sort.id}\\": ${sort.desc ? 1 : -1}`)}}`);
    }

    return (
        <>
            <div className="action-container-1">
                <Link href="/admin/translate/create">
                    <div className="action-button">
                        <a>{props.t('create')}</a>
                    </div>
                </Link>

            </div>
            <div className="table">
                <ReactTable
                    manual
                    data={posts.data}
                    pages={posts.numberOfPages}
                    loading={posts.loading}
                    columns={columns}
                    resizable={false}
                    onFetchData={(state, instance) => fetchData(state, instance)}
                    defaultPageSize={10}
                    style={{ width: "100%" }}
                    className="-striped -highlight"
                />
            </div>
            <style jsx>{`
                .action-container-1 {
                    display: flex;
                    padding: 10px 0px;

                    align-items: flex-end;
                    justify-content: flex-end;
                }

                .table {
                    display: flex;
                }

                .action-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background-color: #d7d9db;

                    // border: 1px solid #bcbfc2;
                    padding: 5px 5px;
                    min-width: 50px;

                    cursor: pointer;

                    transition: box-shadow 0.1s;
                }

                .action-button:hover {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }


                
            `}</style>
        </>
    )
};

Index.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

Index.propTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    // console.log("headerUser", state);
    return {
        loginUser: state.loginUser
    };
};


export default withNamespaces('admin')(connect(mapStateToProps)(Index));
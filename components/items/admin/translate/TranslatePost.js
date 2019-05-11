import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { i18n, Link, withNamespaces, Router } from '../../../../configs/i18next';

import ImageDisplay from '../../common/ImageDisplay';
import LanguageSelect from '../../common/LanguageSelect';
import TranslateSentences from './TranslateSentences';

import { getPostDataForTranslating as getPostDataForTranslatingApi, createTranslationVersionForPost as createTranslationVersionForPostApi } from '../../../../apis/postApi';

import { informAnnouncement } from '../../../../actions/informAnnouncement';

import config from '../../../../configs/appConfig';

const TranslatePost = (props) => {

    const [language, setLanguage] = useState(null);

    useEffect(() => {
        setLanguage(config.LANGUAGE_OPTIONS.filter(op => op.value === props.router.query.lang)[0]);
    })

    function onChangeLanguage(selected) {
        Router.push(`/admin/translate/language-version?postName=${props.router.query.postName}&postID=${props.router.query.postID}&lang=${selected.value}`,
            `/admin/translate/ls/${props.router.query.postName}/${props.router.query.postID}/${selected.value}`);
    }

    const [post, setPost] = useState({ originalLanguage: null, content: [] });

    useEffect(() => {
        async function getPostData() {
            const postDataRes = await getPostDataForTranslatingApi({ postID: props.router.query.postID });
            if (postDataRes) {
                const postData = await postDataRes.json();
                setPost(postData);
            } else {
                informAnnouncement({
                    type: 2,
                    content: ["Got error"]
                })
            }
        }

        if (!post.originalLanguage) {
            console.log(2);
            getPostData();
        };
    })

    const [translatingSentence, setTranslatingSentence] = useState(null);

    function startTranslateSentence(sentenceID) {
        setTranslatingSentence(sentenceID);
    }

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = e => {
        if (!e.target.closest('.sentence-container')) {
            setTranslatingSentence(null);
        }
    };

    const [updated, setUpdated] = useState(false);

    function editName(textItemID, lang, translatedText) {
        setUpdated(true);
        let newPost = Object.assign({}, post);
        newPost.name.parsedText = newPost.name.parsedText.map(textItem => {
            if (textItem.id === textItemID) {
                if (textItem.text[lang]) {
                    textItem.text[lang] = translatedText;
                } else {
                    Object.defineProperty(textItem.text, lang, {
                        value: translatedText,
                        writable: true,
                        enumerable: true
                    })
                }
            }

            return textItem;
        });

        setPost(newPost);
    };

    function editContentText(contentItemID, textItemID, lang, translatedText) {
        setUpdated(true);
        let newPost = Object.assign({}, post);
        newPost.content = newPost.content.map(contentItem => {
            if (contentItem.id === contentItemID) {
                contentItem.content.parsedText = contentItem.content.parsedText.map(textItem => {
                    if (textItem.id === textItemID) {
                        if (textItem.text[lang]) {
                            textItem.text[lang] = translatedText;
                        } else {
                            Object.defineProperty(textItem.text, lang, {
                                value: translatedText,
                                writable: true,
                                enumerable: true
                            })
                        }
                    }

                    return textItem;
                });
            }

            return contentItem;
        })

        setPost(newPost);
    }

    async function saveTranslation() {

        if (updated) {
            const saveTransRes = await createTranslationVersionForPostApi({
                postID: props.router.query.postID,
                targetLanguage: props.router.query.lang,
                post,
                systemAccessToken: props.loginUser.systemAccessToken
            });

            if (saveTransRes && saveTransRes.status === 200) {
                console.log("save successfully");
            } else {
                console.log("save failed");
            }
        } else {
            console.log("no change");
        }
    }

    return (
        <>
            <div className="post-container-1">
                <div className="post-container-2">
                    <div className="item-container-1 post-image">
                        {post.image ? <ImageDisplay image={post.image} /> : null}
                    </div>
                    <div className="item-container-1 change-language-container-1">
                        <LanguageSelect langOptions={config.LANGUAGE_OPTIONS} onChangeAction={onChangeLanguage} selectedLanguage={language} />
                    </div>
                    <div className="item-container-1">
                        <div className="post-name">
                            {post.name ? <TranslateSentences onTranslate={editName} startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} type={"postName"} originalLanguage={post.originalLanguage} currentLanguage={language.value} parsedText={post.name.parsedText} /> : null}
                        </div>
                    </div>
                    {post.content.map(item => <div key={item.id} className="item-container-1">
                        {item.type === 'h1' ? <div className="h1"><TranslateSentences onTranslate={editContentText} startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} type={"itemText"} contentItemID={item.id} originalLanguage={post.originalLanguage} currentLanguage={language.value} parsedText={item.content.parsedText} /></div> : null}
                        {item.type === 'h2' ? <div className="h2"><TranslateSentences onTranslate={editContentText} startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} type={"itemText"} contentItemID={item.id} originalLanguage={post.originalLanguage} currentLanguage={language.value} parsedText={item.content.parsedText} /></div> : null}
                        {item.type === 'h3' ? <div className="h3"><TranslateSentences onTranslate={editContentText} startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} type={"itemText"} contentItemID={item.id} originalLanguage={post.originalLanguage} currentLanguage={language.value} parsedText={item.content.parsedText} /></div> : null}
                        {item.type === 'text' ? <div className="post-text"><TranslateSentences onTranslate={editContentText} startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} type={"itemText"} contentItemID={item.id} originalLanguage={post.originalLanguage} currentLanguage={language.value} parsedText={item.content.parsedText} /></div> : null}
                        {item.type === 'paragraph' ? <div className="paragraph"><TranslateSentences onTranslate={editContentText} startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} type={"itemText"} contentItemID={item.id} originalLanguage={post.originalLanguage} currentLanguage={language.value} parsedText={item.content.parsedText} /></div> : null}
                        {item.type === 'link' ? <div className="post-text"><a href={item.content.text} target="_blank" className="link">{item.content.text}</a></div> : null}
                        {item.type === 'image' ? <ImageDisplay image={{
                            id: item.id,
                            dataUrl: item.content.dataUrl,
                            width: item.content.width,
                            height: item.content.height
                        }} /> : null}
                    </div>)}
                    <div className="post-action-container-1">
                        <div className="post-action-container-2">
                            <div className="action-button save noselect" onClick={() => saveTranslation()}>Save</div>
                            <div className="action-button cancel noselect" onClick={() => Router.push("/admin/translate")}>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .post-container-1 {
                    display: flex;
                    flex-direction: column;
                }

                .post-container-2 {
                    margin-bottom: 50px;
                }

                .post-image{
                    margin-top: -20px;
                    margin-left: -20px;
                    margin-right: -20px;
                }

                .change-language-container-1 {
                    flex-direction: row;
                    justify-content: flex-end;
                }

                .item-container-1 {
                    display: flex;
                    position: relative;
                }

                .item-container-1:not(:first-of-type) {
                    margin-top: 20px;
                }

                ${config.POST_ITEM_CSS}

                .post-action-container-1{
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;
                }
                
                .post-action-container-2{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }

                
                .action-button {
                    display: flex;
                    padding: 5px 10px;

                    background-color: white;
                    border-radius: 5px;

                    transition: background-color 0.2s, color 0.2s;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    cursor: pointer;
                }

                .action-button:not(:first-of-type) {
                    margin-left: 10px;
                }
                
                .save:hover {
                    background-color: #2196F3;
                    color: white;
                }
                
                .cancel:hover {
                    background-color: #f44336;
                    color: white;
                }


                
            `}</style>
        </>
    )
};

TranslatePost.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

TranslatePost.propTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    }
}


export default withNamespaces('admin')(withRouter(connect(mapStateToProps)(TranslatePost)));
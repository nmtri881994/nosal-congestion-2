import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Prism from "prismjs";

import ImageDisplay from '../common/ImageDisplay';
import TranslateSentences from '../post/TranslateSentences';
import LanguageSelect from '../common/LanguageSelect';

import config from '../../../configs/appConfig';

import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import { viewPost as viewPostApi } from '../../../apis/postApi';

import { getPostNameForURL as getPostNameForURLApi } from '../../../apis/postApi';

const Post = (props) => {
    const [post, setPost] = useState(props.post);

    const [language, setLanguage] = useState(null);

    useEffect(() => {
        setLanguage(config.LANGUAGE_OPTIONS.filter(op => op.value === props.lang)[0]);
    })

    function onChangeLanguage(selected) {

        let nameByLang = "";
        props.post.detail.name.parsedText.map(textItem => {
            if (textItem.text[selected.value]) {
                nameByLang = nameByLang.concat(textItem.text[selected.value]);
            } else {
                nameByLang = nameByLang.concat(textItem.text[props.post.detail.originalLanguage]);
            }
        })

        Router.replace(`/post?postID=${props.postID}&postName=${getPostNameForURLApi(nameByLang)}&lang=${selected.value}`,
            `/p/${getPostNameForURLApi(nameByLang)}/${props.postID}/${selected.value}`);
    }

    useEffect(() => {
        const imageContainers = [...document.getElementsByClassName('post-image-container-3')];
        const correctContainer = imageContainers.find(container => container.getAttribute("data-id") === post.detail.image.id.toString());
        correctContainer.style["padding-bottom"] = `${100 * post.detail.image.height / post.detail.image.width}%`;
    }, []);

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
        if (!e.target.closest('.sentence-container') || e.target.className.indexOf("translated") === -1) {
            setTranslatingSentence(null);
        }
    };

    useEffect(() => {
        // console.log(props.postID, props.loginUser.systemAccessToken);
        // console.log(viewPostApi);
        viewPostApi({
            postID: props.postID,
            systemAccessToken: props.loginUser.systemAccessToken
        });
    }, []);

    useEffect(() => {
        Prism.highlightAll();
    })

    return (
        <>
            <div className="post-container-1">
                <div className="post-image-container-1">
                    <div className="post-image-container-2">
                        <div className="post-image-container-3" data-id={post.detail.image.id}>
                            <div className="user-info-container-1">
                                <div className="avatar-container-1">
                                    <div className="avatar">
                                    </div>
                                </div>
                                <div className="username">
                                    {post.createByUser.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-container-1 change-language-container-1">
                    <div className="change-language-title">{props.t('version')}</div>
                    <LanguageSelect langOptions={config.LANGUAGE_OPTIONS.filter(lang => post.availableLanguages.indexOf(lang.value) !== -1)} onChangeAction={onChangeLanguage} selectedLanguage={language} />
                </div>
                <div className="item-container-1">
                    <div className="post-name">
                        {<TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={post.detail.name.parsedText} />}
                    </div>
                </div>
                <div className="info-container-1">
                    <div className="info-title">
                        {props.t('source')}
                    </div>
                    <div className="info-content">
                        {post.detail.source}
                    </div>
                </div>

                <div className="info-container-1">
                    <div className="info-title">
                        {props.t('type')}
                    </div>
                    <div className="info-content">
                        <div className="multi-option-containter-1">
                            {post.detail.type.map(type => <div key={type} className="array-item">{props.t(type)}</div>)}
                        </div>
                    </div>
                </div>
                {post.detail.content.map(item => <div key={item.id} className="item-container-1">
                    {item.type === 'h1' ? <div className="h1"><TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={item.content.parsedText} /></div> : null}
                    {item.type === 'h2' ? <div className="h2"><TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={item.content.parsedText} /></div> : null}
                    {item.type === 'h3' ? <div className="h3"><TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={item.content.parsedText} /></div> : null}
                    {item.type === 'text' ? <div className="post-text"><TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={item.content.parsedText} /></div> : null}
                    {item.type === 'paragraph' ? <div className="paragraph"><TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={item.content.parsedText} /></div> : null}
                    {item.type === 'link' ? <div className="post-text"><a href={item.content.text} target="_blank" className="link">{item.content.text}</a></div> : null}
                    {item.type === 'note' ? <div className="post-text nature-text note-container"><pre>{item.content.parsedText ? <TranslateSentences startTranslateSentence={startTranslateSentence} translatingSentence={translatingSentence} originalLanguage={post.detail.originalLanguage} currentLanguage={props.lang} parsedText={item.content.parsedText} /> : item.content.text}</pre></div> : null}
                    {item.type === 'script' ? <div className="post-text nature-text script-container"><pre><code className={`language-${item.scriptLanguage}`}>{item.content.text}</code></pre></div> : null}
                    {item.type === 'image' ? <ImageDisplay image={{
                        id: item.id,
                        dataUrl: item.content.dataUrl,
                        width: item.content.width,
                        height: item.content.height
                    }} /> : null}
                </div>)}
            </div>
            <style jsx>{`
                .post-container-1{
                    display: flex;
                    flex-direction: column;

                    padding: 10px 20px;
                }

                .post-image-container-1{
                    display: flex;

                    margin: -50px -20px 60px -20px;

                    position: relative;

                }

                // .post-image-container-2 {
                //     display: flex;
                //     flex-direction: column;
                //     width: 100%;
                //     background-image: url("${post.detail.image.dataUrl}");
                //     background-repeat: no-repeat;
                //     background-size: 100% 100%;
                //     position: relative;
                // }

                .post-image-container-2 {
                    display: block;
                    box-sizing: border-box;
                    position: relative;

                    width: 100%;
                }

                .post-image-container-3 {
                    background-image: url("${post.detail.image.dataUrl}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .user-info-container-1{
                    display: flex;
                    flex-direction: row;
                    
                    padding: 10px 20px;

                    position: absolute;

                    bottom: -50px;
                }

                .avatar {
                    border-radius: 100%;
                    border: 3px white solid;

                    width: 150px;
                    height: 150px;

                    background-image: url("${post.createByUser.avatar}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }

                .username{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    color: white;
                    font-size: 30px;
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(0, 0, 0, .8);

                    margin-left: 20px;
                }

                .item-container-1 {
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;
                }

                .info-container-1{
                    display: flex;

                    border-radius: 5px;
                    overflow: hidden;
                    margin-top: 20px;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }

                .info-container-1:last-of-type {
                    margin-bottom: 20px;
                }
                
                .info-title{
                    display: flex;
                    width: 70px;
                    padding: 10px 20px;
                    background-color: #81d4fa;

                    font-size: 18px;
                }
                
                
                .info-content {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    padding: 10px 20px;
                    background-color: #e1f5fe;
                    
                    width: 100px;
                    word-break: break-word;
                    font-size: 18px;
                }

                .change-language-container-1 {
                    flex-direction: row;
                    justify-content: flex-end;
                }

                .change-language-title{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    margin-right: 10px;
                }

                .main-content {
                    margin-top: 50px;
                }

                .avatar-container-1 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                @media (max-width: 940px) {
                    .user-info-container-1 {
                        bottom: 10px;
                    }

                    .avatar {
                        width: 100px;
                        height: 100px;
                    }

                    .username {
                        font-size: 26px;
                    }

                }

                @media (max-width: 500px) {
                    .avatar {
                        width: 60px;
                        height: 60px;

                        border: 2px solid white;
                    }

                    .username {
                        font-size: 22px;
                    }

                }
            `}</style>
        </>
    )
};

Post.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

Post.propTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    // console.log("headerUser", state);
    return {
        loginUser: state.loginUser
    };
};

export default withNamespaces('index')(connect(mapStateToProps)(Post));
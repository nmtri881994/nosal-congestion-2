import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { connect } from 'react-redux';

import { i18n, Link, withNamespaces, Router } from '../../../../configs/i18next';
import config from '../../../../configs/appConfig';

import LanguageSelect from '../../common/LanguageSelect';
import ImageUpload from '../../common/ImageUpload';
import ImageDisplay from '../../common/ImageDisplay';

import AddPostItem from '../../../items/admin/translate/AddPostItem';
import PostItem from '../../../items/admin/translate/PostItem';

import { createPost as createPostApi } from '../../../../apis/postApi';
import { retryRequest } from '../../../../apis/userAuth'

import { informAnnouncement } from '../../../../actions/informAnnouncement';

import { textRequired, objectRequired, arrayRequired, selectMandatory } from '../../../../function/formValidation';

const types = [
    { id: 1, name: "technology", selected: false },
    { id: 2, name: "cinematic", selected: false },
    { id: 3, name: "music", selected: false },
    { id: 4, name: "life", selected: false },
    { id: 5, name: "private", selected: false },
]

const Create = (props) => {
    const nameInputEl = useRef(null);
    const [postImage, setPostImage] = useState(null);
    const sourceInputEl = useRef(null);
    const [postTypes, updatePostTypes] = useState(types);
    const [originalLanguage, setOriginalLanguage] = useState(null);
    const [content, setContent] = useState([]);

    function validateData() {
        let validateResult = [];
        validateResult.push({
            element: 'name',
            message: textRequired(nameInputEl.current.value)
        });
        validateResult.push({
            element: 'post-image',
            message: objectRequired(postImage)
        });
        validateResult.push({
            element: 'type',
            message: selectMandatory(postTypes)
        });
        validateResult.push({
            element: 'original-language',
            message: objectRequired(originalLanguage)
        });
        validateResult.push({
            element: 'content',
            message: arrayRequired(content)
        });

        return validateResult;
    }

    function _onChoosePostType(e) {
        const newPostTypes = postTypes.map(type => {
            if (type.id.toString() === e.target.getAttribute("data-id")) {
                type.selected = !type.selected;
            }
            return type;
        })

        updatePostTypes(newPostTypes);
    }


    // useEffect(() => {
    //     // console.log(111, window);
    //     const postImageContainer = document.getElementsByClassName("post-image")[0];
    //     if (postImageContainer) {
    //         postImageContainer.style["padding-bottom"] = `${100 * postImage.height / postImage.width}%`;
    //     }

    // }, [postImage])

    function addItem(item) {
        const newContent = content.slice();
        newContent.push(item);
        setContent(newContent);
    }

    function updateItem(item) {
        const newContent = content.slice();
        newContent[newContent.findIndex(cont => cont.id === item.id)].content = item.content
        setContent(newContent);
    }

    function removeItem(itemId) {

        const newContent = content.slice();
        const itemIndex = newContent.findIndex(cont => cont.id === itemId);
        if (itemIndex > -1) {
            newContent.splice(itemIndex, 1)
            setContent(newContent);
        }
    }

    async function createPost() {
        setSaving(true);
        const validationResult = validateData();
        const validationCatched = validationResult.filter(validation => validation.message);

        const selectedPostType = postTypes.filter(type => type.selected === true);

        if (validationCatched.length === 0) {
            const createPostRes = await createPostApi({
                systemAccessToken: props.loginUser.systemAccessToken,
                postDetail: {
                    name: nameInputEl.current.value,
                    image: postImage,
                    source: sourceInputEl.current.value,
                    type: selectedPostType.map(type => type.name),
                    originalLanguage: originalLanguage.value,
                    content
                }
            });
            if (createPostRes) {
                const createPostResData = await createPostRes.json();
                if (createPostRes.status === 200) {
                    Router.push("/admin/translate");
                } else {
                    props.dispatch(informAnnouncement({
                        type: 2,
                        content: ["got-error"]
                    }));
                    setSaving(false);
                }
            } else {
                props.dispatch(informAnnouncement({
                    type: 2,
                    content: ["got-error"]
                }));
                setSaving(false);
            }
        } else {
            props.dispatch(informAnnouncement({
                type: 2,
                content: validationCatched.map(validation => `${props.t(validation.element)} ${props.t(validation.message)}`)
            }));
            setSaving(false);
        }

    }

    const [saving, setSaving] = useState(false);

    return (
        <>
            <div className="create-post-container-1">
                <div className="post-details-container-1">
                    <div className="detail-container-1">
                        <div className="detail-title">
                            {props.t('name')} *
                        </div>
                        <div className="detail-info">
                            <input ref={nameInputEl} className="detail-input">
                            </input>
                        </div>
                    </div>
                    <div className="detail-container-1">
                        <div className="detail-title">
                            {props.t('post-image')}
                        </div>
                        <div className="detail-info">
                            {postImage ?
                                <div className="post-image-container-1">
                                    <div onClick={() => setPostImage(null)} className="post-image-remove">{props.t('remove')}</div>

                                    <ImageDisplay image={postImage} />
                                </div>
                                : <ImageUpload multipleSelect={false} onChooseImage={setPostImage} />}
                        </div>
                    </div>
                    <div className="detail-container-1">
                        <div className="detail-title">
                            {props.t('original-source')}
                        </div>
                        <div className="detail-info">
                            <input ref={sourceInputEl} className="detail-input">
                            </input>
                        </div>
                    </div>
                    <div className="detail-container-1">
                        <div className="detail-title">
                            {props.t('type')} *
                        </div>
                        <div className="detail-info">
                            <div className="multi-select-container">
                                {postTypes.map(type =>
                                    <div onClick={(e) => _onChoosePostType(e)} data-id={type.id} key={type.id} className={`multi-select-item noselect ${type.selected ? "multi-select-item-selected" : null}`}>
                                        {props.t(type.name)}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="detail-container-1">
                        <div className="detail-title">
                            {props.t('original-language')} *
                        </div>
                        <div className="detail-info">
                            <LanguageSelect langOptions={config.LANGUAGE_OPTIONS} selectedLanguage={originalLanguage} onChangeAction={setOriginalLanguage} />
                        </div>
                    </div>
                    <div className="detail-container-1">
                        <div className="detail-title">
                            {props.t('content')}
                        </div>
                        <div className="detail-info">
                            <div className="post-content-container-1">
                                {content.map(cont => <PostItem key={cont.id} item={cont}
                                    onUpdateItem={updateItem} onRemoveItem={removeItem} />)}
                                {/* <PostItem itemType={"h1"} />
                                <PostItem itemType={"h2"} />
                                <PostItem itemType={"h3"} />
                                <PostItem itemType={"paragraph"} />
                                <PostItem itemType={"image"} itemContent={
                                    {
                                        id: 1234,
                                        dataUrl: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                                        height: 355,
                                        width: 500
                                    }
                                } />
                                <PostItem itemType={"image"} itemContent={
                                    {
                                        id: 1235,
                                        dataUrl: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                                        height: 355,
                                        width: 500
                                    }

                                } /> */}
                                <AddPostItem onAddItem={addItem} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-post-actions-container-1">
                    <div className={`${saving ? "disabled-button" : ""} action-button save noselect`} onClick={() => { if (!saving) createPost() }}>{saving ? <img src={config.LOGGING_WAITING_GIF} className="login-loading-gif" /> : props.t('save')}</div>
                    <div className={`${saving ? "disabled-button" : ""} action-button cancel noselect`} onClick={() => Router.push("/admin/translate")}>{props.t('cancel')}</div>
                </div>
            </div>
            <style jsx>{`
                .create-post-container-1 {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                }
                
                .detail-container-1 {
                    display: flex;
                    flex-direction: column;
                }

                .detail-container-1:not(:first-of-type) {
                    margin-top: 10px;
                }

                .detail-container-1:last-of-type{
                    margin-bottom: 20px;
                }

                .detail-title {
                    display: flex;
                    margin-bottom: 5px;
                }

                .detail-info {
                    display: flex;
                    flex-direction: column;
                }

                .multi-select-container {
                    display: flex;
                    flex-direction: row;
                }

                .detail-input {
                    display: flex;
                    flex: 1;

                    border: none;
                    border-radius: 5px;

                    min-height: 25px;
                    padding: 0 5px;

                    outline: none;
                }

                .multi-select-item {
                    background-color: white;
                    border-radius: 5px;
                    padding: 5px 10px;

                    cursor: pointer;

                    transition: background-color 0.2s, color 0.2s;
                }

                .multi-select-item :hover {
                    background-color: #2196F3;
                    color: white;
                }

                .multi-select-item-selected {
                    background-color: #2196F3;
                    color: white;
                }
                
                .multi-select-item:not(:first-of-type) {
                    margin-left: 10px;
                }

                .post-content-container-1 {
                    display: flex;
                    flex-direction: column;

                    background-color: white;
                    border-radius: 5px;

                    min-height: 500px;

                    padding: 10px 10px;
                }

                .post-image{
                    // display: flex;

                    // height: 200px;
                    background-image: url("${postImage ? postImage.dataUrl : null}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .post-image-container-1 {
                    position: relative;
                    // width: 100%;
                }

                .post-image-remove {
                    position: absolute;
                    background-color: white;
                    border-radius: 5px;

                    top: 10px;
                    right: 10px;
                    padding: 5px 10px;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    cursor: pointer;

                    transition: background-color 0.2s, color 0.2s;

                    z-index: 1;
                }

                .post-image-remove:hover {
                    background-color: #f44336;
                    color: white;
                }
                
                .create-post-actions-container-1 {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    margin-bottom: 20px;
                }

                .action-button {
                    display: flex;
                    padding: 5px 10px;

                    background-color: white;
                    border-radius: 5px;

                    transition: background-color 0.2s, color 0.2s;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    cursor: pointer;

                    height: 18px;
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

                .disabled-button {
                    pointer-events: none;
                    opacity: 0.4;
                }

                .login-loading-gif{
                    height: 100%;
                }
            `}</style>
        </>
    )
};

Create.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

Create.propTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    }
}


export default withNamespaces('admin')(connect(mapStateToProps)(Create));
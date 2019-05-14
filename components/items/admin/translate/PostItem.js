import { useState, useEffect } from "react";

import ImageDisplay from '../../common/ImageDisplay';
import ImageUpload from '../../common/ImageUpload';

import config from '../../../../configs/appConfig';
import Select from 'react-select';

const PostItem = (props) => {
    const [item, setitem] = useState(props.item);

    function autoGrowTextArea(e) {
        if (e.target.value.trim() !== "") {
            e.target.style.height = (e.target.scrollHeight - 10) + "px";
        } else {
            e.target.style.height = "75px";
        }
    }

    function textOnChange(e) {
        item.content.text = e.target.value;
        props.onUpdateItem(item);

        if (["paragraph", "script", "note"].indexOf(item.type) !== -1) {
            autoGrowTextArea(e);
        }


    }

    function onChooseImage(image) {
        item.content.dataUrl = image.dataUrl;
        item.content.width = image.width;
        item.content.height = image.height;

        props.onUpdateItem(item);
    }

    function onChooseScriptLang(selected) {
        item.scriptLanguage = selected.value;

        props.onUpdateItem(item);
    }


    // useEffect(() => {
    //     if (item.type === "image" && itemContent) {
    //         const imageContainers = [...document.getElementsByClassName('item-image-container-2')];
    //         const correctContainer = imageContainers.find(container => container.getAttribute("image-data-id") === itemID.toString());
    //         correctContainer.style["padding-bottom"] = `${100 * itemContent.height / itemContent.width}%`;
    //     }
    // }, [itemID, item.type, itemContent]);

    return (
        <>
            <div className="item-container-1">
                <div className="item-remove-button noselect" onClick={() => { props.onRemoveItem(item.id) }}>🗙</div>
                {item.type === 'h1' ? <input className="h1" value={item.content.text} onChange={(e) => textOnChange(e)}></input> : null}
                {item.type === 'h2' ? <input className="h2" value={item.content.text} onChange={(e) => textOnChange(e)}></input> : null}
                {item.type === 'h3' ? <input className="h3" value={item.content.text} onChange={(e) => textOnChange(e)}></input> : null}
                {item.type === 'text' ? <input className="post-text" value={item.content.text} onChange={(e) => textOnChange(e)}></input> : null}
                {item.type === 'paragraph' ? <textarea onChange={(e) => textOnChange(e)} rows="4" className="paragraph" value={item.content.text}></textarea> : null}
                {item.type === 'script' ? <div className="script-box-container-1">
                    <div className="select-script-lang-container-1">
                        <Select
                            // styles={customStyles}
                            styles={{
                                // ...otherProps.styles,
                                singleValue: styles => _.omit(styles, ['maxWidth', 'position', 'top', 'transform']),
                            }}
                            value={config.SCRIPT_LANGUAGE_OPTIONS.filter(lang => lang.value === item.scriptLanguage)[0]}
                            onChange={(selectedOption) => onChooseScriptLang(selectedOption)}
                            options={config.SCRIPT_LANGUAGE_OPTIONS}
                            isSearchable={true}
                        />
                    </div>
                    <div className="script-box-text-area-container-1">
                        <textarea onChange={(e) => textOnChange(e)} rows="4" className="paragraph" value={item.content.text}></textarea>
                    </div>
                </div> : null}
                {item.type === 'note' ? <textarea onChange={(e) => textOnChange(e)} rows="4" className="paragraph" value={item.content.text}></textarea> : null}
                {item.type === 'link' ? <input className="post-text" value={item.content.text} onChange={(e) => textOnChange(e)}></input> : null}
                {item.type === 'image' ? item.content.dataUrl !== "" ? <ImageDisplay image={{
                    id: item.id,
                    dataUrl: item.content.dataUrl,
                    width: item.content.width,
                    height: item.content.height
                }} /> : <ImageUpload multipleSelect={false} onChooseImage={onChooseImage} /> : null}
            </div>
            <style jsx>{`
                .h1, .h2, .h3, .post-text {
                    display: flex;
                    flex: 1;

                    border-radius: 5px;
                    border: 1px solid #e8e9ea;

                    padding: 5px 10px;

                    min-height: 25px;

                    outline: none;
                    
                }

                // .h1 {
                //     font-size: 20px;
                //     font-weight: 700;
                // }

                // .h2 {
                //     font-size: 18px;
                //     font-weight: 700;
                // }

                // .h3 {
                //     font-size: 16px;
                //     font-weight: 700;
                // }

                .paragraph {
                    display: flex;
                    flex: 1;

                    border-radius: 5px;
                    border: 1px solid #e8e9ea;

                    padding: 5px 10px;

                    outline: none;

                    // font-size: 14px;

                }

                .item-image-container-1 {
                    position: relative;
                    width: 100%;
                }

                .item-image-container-2 {
                    background-image: url("${item ? item.content.dataUrl : null}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .item-container-1 {
                    display: flex;
                    // flex-direction: column;
                    position: relative;
                }

                .item-container-1:not(:first-of-type) {
                    margin-top: 20px;
                }
                
                .item-remove-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    position: absolute;

                    width: 20px;
                    height: 20px;

                    border-radius: 100%;

                    color: white;
                    background-color: #d7d9db;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    top: -5px;
                    right: -5px;

                    cursor: pointer;

                    font-size: 10px;

                    z-index: 1;
                }

                .item-remove-button:hover {
                    background-color: #bcbfc2;
                }

                .text-item {
                    pointer: cursor;
                    transition: background-color 0.2s;
                }
                
                .original {
                    background-color: #e3f2fd;
                }
                
                .original: hover {
                    background-color: #bbdefb;
                }

                .translated {
                    background-color: #e8f5e9;
                }

                .translated:hover {
                    background-color: #c8e6c9;
                }

                .select-script-lang-container-1 {
                    display: flex;
                    flex-direction: row;

                    margin-bottom: 10px;
                }

                .script-box-container-1 {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .script-box-text-area-container-1 {
                    display: flex;
                }
            `}</style>
        </>
    )
};

export default PostItem;

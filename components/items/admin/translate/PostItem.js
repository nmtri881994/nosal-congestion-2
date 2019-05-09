import { useState, useEffect } from "react";

import ImageDisplay from '../../common/ImageDisplay';
import ImageUpload from '../../common/ImageUpload';

const PostItem = (props) => {
    const [item, setitem] = useState(props.item);

    function autoGrowTextArea(e) {
        if (item.content.text.trim() !== "") {
            e.target.style.height = (e.target.scrollHeight - 10) + "px";
        } else {
            e.target.style.height = "75px";
        }
    }

    function textOnChange(e) {
        item.content.text = e.target.value;
        props.onUpdateItem(item);

        if (item.type === "paragraph") {
            autoGrowTextArea(e);
        }


    }

    function onChooseImage(image) {
        item.content.dataUrl = image.dataUrl;
        item.content.width = image.width;
        item.content.height = image.height;

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

                .h1 {
                    font-size: 20px;
                    font-weight: 700;
                }

                .h2 {
                    font-size: 18px;
                    font-weight: 700;
                }

                .h3 {
                    font-size: 16px;
                    font-weight: 700;
                }
                
                .paragraph {
                    display: flex;
                    flex: 1;

                    border-radius: 5px;
                    border: 1px solid #e8e9ea;

                    padding: 5px 10px;

                    outline: none;

                    font-size: 14px;

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
            `}</style>
        </>
    )
};

export default PostItem;

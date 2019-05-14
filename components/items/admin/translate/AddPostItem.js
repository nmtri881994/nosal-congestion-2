import PropTypes from 'prop-types';

import { i18n, Link, withNamespaces } from '../../../../configs/i18next';
import { useState } from 'react';
import uniqid from 'uniqid';

const types = [
    { value: "h1", label: "h1" },
    { value: "h2", label: "h2" },
    { value: "h3", label: "h3" },
    { value: "paragraph", label: "paragraph" },
    { value: "script", label: "script" },
    { value: "note", label: "note" },
    { value: "link", label: "link" },
    { value: "image", label: "image" },
];

const AddPostItem = (props) => {

    const [itemTypes, setItemTypes] = useState(types);

    function onAddItem(type) {
        if (['h1', 'h2', 'h3', 'paragraph', 'note', 'link'].indexOf(type) !== -1) {
            props.onAddItem({
                id: uniqid(),
                type,
                content: {
                    text: ""
                }
            });
        }

        if ('script' === type) {
            props.onAddItem({
                id: uniqid(),
                type,
                scriptLanguage: "html",
                content: {
                    text: ""
                }
            });
        }

        if (type === "image") {
            props.onAddItem({
                id: uniqid(),
                type,
                content: {
                    dataUrl: "",
                    width: 0,
                    height: 0
                }
            });
        }
    }

    return (
        <>
            <div className="post-content-add-item-container-1">
                {itemTypes.map(type => <div onClick={() => onAddItem(type.value)} key={type.value} className="add-button noselect">
                    {props.t(type.label)}
                </div>)}
            </div>
            <style jsx>{`
                .post-content-add-item-container-1 {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: row;
                }

                .add-button {
                    display: flex;

                    padding: 5px 10px;

                    background-color: #e8e9ea;
                    border-radius: 5px;

                    cursor: pointer;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    transition: background-color 0.2s;
                }

                .add-button:hover {
                    background-color: #d7d9db;
                }

                .add-button:not(:first-of-type) {
                    margin-left: 5px;
                }
            `}</style>
        </>
    )
};

AddPostItem.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

AddPostItem.propTypes = {
    t: PropTypes.func.isRequired
}

export default withNamespaces('admin')(AddPostItem);
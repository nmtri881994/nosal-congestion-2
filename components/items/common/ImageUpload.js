import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import { i18n, Link, withNamespaces } from '../../../configs/i18next';

const ImageUpload = (props) => {

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            const dataUrl = reader.result;

            let image = new Image();
            image.src = dataUrl;
            image.onload = function () {
                props.onChooseImage({
                    id: uniqid(),
                    dataUrl,
                    width: this.width,
                    height: this.height
                });
            }

        }

        acceptedFiles.forEach(file => reader.readAsDataURL(file));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: props.multipleSelect });

    return (
        <>
            <div className="drag-container-1" {...getRootProps()}>
                <input className="upload-input" {...getInputProps()} accept="image/x-png,image/gif,image/jpeg" />
                <p>{props.multipleSelect ? props.t('drag-and-drop-images-or-click-to-select') : props.t('drag-and-drop-image-or-click-to-select')}</p>
            </div>
            <style jsx>{`
                .drag-container-1 {
                    display: flex;
                    flex: 1;

                    border: 2px dashed #2196F3;
                    border-radius: 5px;

                    padding: 0px 5px;

                    outline: none;
                }

                .upload-input {
                    outline: none;
                }
            `}</style>
        </>
    )
};

ImageUpload.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

ImageUpload.propTypes = {
    t: PropTypes.func.isRequired
}

export default withNamespaces('admin')(ImageUpload);

import PropTypes from 'prop-types';;
import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

const PostItem = (props) => {
    return (
        <>
            <div className="item-container-1">
                <div className="item-container-2" >
                    <div className="item-image">
                    </div>
                    <div className="item-content-container-1">
                        <div className="item-property item-title">
                            {props.post.detail.nameByLang}
                        </div>
                        <div className="item-property item-content">
                            {props.post.detail.contentByLang}
                        </div>
                        <div className="item-property item-other">
                            {`${props.t('create-by')}: ${props.post.createdByUser ? props.post.createdByUser.name : ''} - ${props.t('views')}: ${props.post.numberOfViews}`}
                        </div>
                    </div>
                </div>

            </div>
            <style jsx>{`
                .item-container-1 {
                    display: flex;
                    flex-direction: column;

                    margin-bottom: 20px;
                }

                .item-container-2 {
                    display: flex;
                    flex-direction: row;
                }

                .item-image {
                    display: flex;

                    width: 300px;
                    height: 150px;
                    margin-right: 20px;

                    border-radius: 5px;

                    background: url(${props.post ? `${props.post.detail.image.dataUrl}` : ""});
                    background-position: center;
                    background-size:     cover;                
                    background-repeat:   no-repeat;
                }

                .item-content-container-1 {
                    display: flex;
                    flex: 1;
                    flex-direction: column;

                    padding: 10px 0px;

                    border-top: 1px dashed #e0e0e0;
                }

                .item-property {
                    display: flex;
                }

                .item-property:not(:last-of-type) {
                    margin-bottom: 10px;
                }

                .item-title {
                    font-size: 20px;
                    font-weight: bold;
                }

                .item-other {
                    color: #c3c3c3;
                }

                @media (max-width: 910px) {

                    .item-image {
                        width: 35vw;
                        height: calc(35vw/2);
                    }
                }

                @media (max-width: 750px) {
                    .item-title {
                        height: 24px;
                        overflow: hidden;
                    }

                    .item-content {
                        height: 38px;
                        overflow: hidden;
                    }

                    .item-property {
                        margin-bottom: 5px !important;
                    }
                }

                @media (max-width: 550px) {
                    .item-image {
                        width: 35vw;
                        height: calc(35vw*2/3);
                    }
                }
            `}</style>
        </>
    )
};

PostItem.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

PostItem.propTypes = {
    t: PropTypes.func.isRequired
};


export default withNamespaces('index')(PostItem);
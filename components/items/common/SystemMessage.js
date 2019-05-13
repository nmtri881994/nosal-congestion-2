import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import { closeMessage } from '../../../actions/informAnnouncement';

const SystemMessage = (props) => {
    return (
        <>
            <div className="system-message-container-1">
                <div className="message-close" onClick={() => props.closeMessage()}>
                    {/* {console.log(props)} */}
                    🗙
                </div>
                <div className="message-content-container-1">
                    {props.systemMessage.content.map(item => <div key={item} className="message-content">
                        {props.t(item)}
                    </div>)}
                </div>
            </div>
            <style jsx>{`
                .system-message-container-1 {
                    display: flex;
                    position: absolute;

                    top: 20px;
                    right: 20px;

                    width: 200px;
                    // height: 100px;
                    min-height: 40px;

                    border-radius: 5px;

                    background-color: ${props.systemMessage.type === 1 ? '#4caf50' : props.systemMessage.type === 2 ? '#ef9a9a' : props.systemMessage.type === 3 ? '#ffc107' : 'white'};
                    
                    // color: white;

                    padding: 10px 20px;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    opacity: ${props.systemMessage.type !== 0 ? 1 : 0};
                    z-index: ${props.systemMessage.type !== 0 ? 1 : -999};
                    transition: opacity 1s;
                    -webkit-transition: opacity 1s; /* Safari */
                }

                .message-close {
                    // display: flex;
                    // position: absolute;

                    // width: 20px;
                    // height: 20px;
                    // border-radius: 100%;
                   
                    // align-items: center;
                    // justify-content: center;

                    // background-color: #f9f9f9;

                    // top: 5px;
                    // right: 5px;

                    // cursor: pointer;

                    // font-size: 12px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    position: absolute;

                    width: 20px;
                    height: 20px;

                    border-radius: 100%;

                    color: black;
                    background-color: white;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    top: -5px;
                    right: -5px;

                    cursor: pointer;

                    font-size: 10px;

                    z-index: 1;
                }

                .message-close:hover {
                    background-color: #e6e6e6;
                }

                .message-content-container-1 {
                    display: flex;
                    flex-direction: column;
                    color: white;
                }

                .message-content {
                    display: flex;
                }

            `}</style>
        </>
    );

};

SystemMessage.getInitialProps = async function () {
    return {
        namespacesRequired: ['systemMessage']
    }
};

SystemMessage.propTypes = {
    t: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    const { systemMessage } = state;
    return { systemMessage };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces('systemMessage')(SystemMessage));
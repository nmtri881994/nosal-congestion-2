import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
                        {item}
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

                    background-color: ${props.systemMessage.type === 1 ? 'green' : props.systemMessage.type === 2 ? 'red' : 'white'};
                    
                    // color: white;

                    padding: 10px 20px;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                    opacity: ${props.systemMessage.type !== 0 ? 1 : 0};
                    z-index: ${props.systemMessage.type !== 0 ? 1 : -999};
                    transition: opacity 1s;
                    -webkit-transition: opacity 1s; /* Safari */
                }

                .message-close {
                    display: flex;
                    position: absolute;

                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                   
                    align-items: center;
                    justify-content: center;

                    background-color: #f9f9f9;

                    top: 5px;
                    right: 5px;

                    cursor: pointer;

                    font-size: 12px;
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

function mapStateToProps(state) {
    const { systemMessage } = state;
    return { systemMessage };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemMessage);
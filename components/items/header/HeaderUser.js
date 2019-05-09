import { connect } from 'react-redux';

// import ChangeLanguage from '../common/ChangeLanguage'

const HeaderUser = (props) => (
    <>
        {props.loginUser ? <div className="header-user-container-1">
            <div className="header-user">
                {/* {console.log('HeaderUser', props.loginUser)} */}
            </div>
        </div> : null}
        <style jsx>{`
            .header-user-container-1 {
                display: flex;
                width: auto;
                align-tiems: center;
                justify-content: flex-end;
            }

            .header-user {
                width: 35px;
                height: 35px;
                border-radius: 5px;
                background-image: url("${props.loginUser ? props.loginUser.userInfo.avatar : ''}");
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        `}</style>
    </>
);

function mapStateToProps(state) {
    // console.log("headerUser", state);
    return {
        loginUser: state.loginUser
    };
};

export default connect(mapStateToProps)(HeaderUser);
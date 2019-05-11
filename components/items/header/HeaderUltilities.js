import HeaderUltilitiesItem from './HeaderUltilitesItem';
import ChangeLanguage from '../common/ChangeLanguage';


const HeaderUltilities = (props) => (
    <>
        <div className="ultilities-container">
            <div className="ult-item-container-1">
                Language
            </div>
            <div className="ult-item-container-1">
                <div onClick={() => props.setShowAdditionHeader(!props.showAdditionHeader)} className={`show-more-button-container-1 cursor-pointer ${props.showAdditionHeader ? `additional-header-showed` : ""}`}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </div>
        <style jsx>{`
            .ultilities-container{
                display: flex;
                flex: 1;

                align-tiems: center;
                justify-content: flex-end;

                height: 100%;
            }

            .ult-item-container-1 {
                display: flex;
                padding: 0 10px;

                justify-content: center;
                align-items: center;
            }

            .show-more-button-container-1 {
                display: flex;
                justify-content: center;
                align-items: center;

                border-radius: 100%;
                color: #2196F3;
                width: 30px;
                height: 30px;

                transition: background-color 0.3s, color 0.3s;
            }

            .additional-header-showed {
                color: white;
                background-color: #2196F3;
            }

        `}</style>
    </>
);

export default HeaderUltilities;
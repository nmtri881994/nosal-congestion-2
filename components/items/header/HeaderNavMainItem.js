import PropTypes from 'prop-types';
import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

const HeaderNavMainItem = props => (
    <>
        <a className="nav-item">
            {props.t(props.item.name ? props.item.name : '-')}
        </a>
        <style jsx>{`
            @media (min-width: 600px) {
                .nav-item {
                    position: relative;
                }
            }

            @media (max-width: 979px) and (min-width: 600px) {

                .nav-item {
                    padding-left: 10px;
                    padding-right: 10px;
                }
            }

            @media (min-width: 1280px) {
                .nav-item {
                    padding-left: 20px;
                    padding-right: 20px;
                }
            }

            .nav-item {
                display: flex;
                font-weight: 300px;
                flex-direction: row;
                align-items: center;

                padding-right: 15px;
                padding-left: 15px;

                color: white;
            }
        `}</style>
    </>
);

HeaderNavMainItem.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

HeaderNavMainItem.propTypes = {
    t: PropTypes.func.isRequired
};


export default withNamespaces('index')(HeaderNavMainItem);
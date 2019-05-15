import { i18n, withNamespaces } from '../configs/i18next';
import PropTypes from 'prop-types';

import MainLayout from '../components/layouts/main/Layout';

const Index = (props) => {
    return (
        <MainLayout>
            <h1>Working on this page</h1>
            <div>
                You can try another tab in navigation
            </div>
        </MainLayout>
    );
};

Index.getInitialProps = async function () {
    return {
        namespacesRequired: ['common', 'login']
    }
};

Index.propTypes = {
    t: PropTypes.func.isRequired
}

export default withNamespaces('common')(Index);
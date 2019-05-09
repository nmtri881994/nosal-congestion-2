import { i18n, withNamespaces } from '../configs/i18next';
import PropTypes from 'prop-types';

import MainLayout from '../components/layouts/main/Layout';

const Index = (props) => {
    return (
        <MainLayout>
            <h1>This is index 111 111111111111111111111</h1>
            <div>
                You can use the Crowdin as a base for your translation. Make sure to compare the content with the current React website to makes sure everything is up to date! (NOTE: delete this if the language doesn't have any Crowdin contributions)
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
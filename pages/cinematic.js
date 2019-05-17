import { i18n, withNamespaces } from '../configs/i18next';
import PropTypes from 'prop-types';

import MainLayout from '../components/layouts/main/Layout';
import IndexPostList from '../components/items/post/IndexPostList2';

const Index = (props) => {
    return (
        <MainLayout>
            <IndexPostList type="cinematic" />
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
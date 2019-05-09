import React from 'react';
import UserInformation from '../../../../components/items/admin/UserInformation';
import renderer from 'react-test-renderer';

it('<UserInformation /> renders correctly', () => {
    const tree = renderer
        .create(<UserInformation />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

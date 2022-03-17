import React from 'react';
import {render} from '@testing-library/react-native';

import RestaurantsHeader from './RestaurantsHeader';

describe('RestaurantsHeader', () => {
  it('should render header correctly', () => {
    const header = render(
      <RestaurantsHeader title="title" subTitle="subTitle" />,
    );
    expect(header.toJSON()).toMatchSnapshot();
  });
});

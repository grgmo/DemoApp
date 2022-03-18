import {render} from '@testing-library/react-native';
import React from 'react';
import RestaurantsList from './RestaurantsList';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('RestaurantsList', () => {
  it('should fade in on restaurants list load', () => {
    jest.useFakeTimers();
    const mockData = [
      {
        title: 'title',
        street: 'street',
        locality: 'locality',
        postCode: 'postCode',
        url: 'url',
      },
    ];
    const {getByRole} = render(
      <RestaurantsList
        data={mockData}
        onRestaurantItemPress={() => {}}
        onScroll={() => {}}
      />,
    );

    const list = getByRole('list');
    expect(list.props.style.opacity).toBe(0);

    jest.advanceTimersByTime(400);

    const {props} = getByRole('list');

    expect(props.style.opacity).toBe(1);
  });
});

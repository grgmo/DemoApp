import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import RestaurantsListItem from './RestaurantsListItem';

describe('RestaurantsListItem', () => {
  const mockItem = {
    title: 'title',
    street: 'street',
    locality: 'locality',
    postCode: 'postCode',
    url: 'url',
    onPress: jest.fn(),
  };
  let listItem: RenderAPI;

  beforeEach(() => {
    listItem = render(<RestaurantsListItem {...mockItem} />);
  });

  it('should render list item correctly', () => {
    expect(listItem.toJSON()).toMatchSnapshot();
  });

  it('should call onPress with correct url on item press', () => {
    const {getByRole} = listItem;

    fireEvent.press(getByRole('button'));

    expect(mockItem.onPress).toHaveBeenCalledTimes(1);
    expect(mockItem.onPress).toHaveBeenCalledWith(mockItem.url);
  });
});

import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react-native';
import {WebViewProps} from 'react-native-webview';

import Restaurants from './Restaurants';

jest.mock('react-native-webview', () => {
  const {View} = require('react-native');

  return (props: WebViewProps) => {
    return <View {...props} />;
  };
});

let mockData: any;

global.fetch = jest.fn(() => mockData) as jest.Mock;

describe('Restaurants', () => {
  const mockRestaurants = {
    data: {
      restaurant: {
        items: [
          {
            name: 'Aberdeen - Belmont Street',
            url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-belmont-street',
            geo: {
              address: {
                streetAddress: 'Unit 10, The Academy, Belmont St',
                addressLocality: 'Aberdeen, Aberdeen City',
                postalCode: 'AB10 1LB',
              },
            },
          },
          {
            name: 'Aberdeen - Union Square',
            url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-union-square',
            geo: {
              address: {
                streetAddress: 'Unit FS17, Union Square, Guild St',
                addressLocality: 'Aberdeen, Aberdeen City',
                postalCode: 'AB11 5RG',
              },
            },
          },
        ],
      },
    },
  };

  it('should render header with correct text', async () => {
    mockData = Promise.reject(Error('error'));

    const {getByText} = render(<Restaurants />);

    await waitFor(() => [
      getByText("Nando's Restaurants"),
      getByText('Version 1.0.0'),
    ]);
  });

  it('should render error message on fetch error', async () => {
    mockData = Promise.reject(Error('error'));

    const {getByTestId, getByText, queryByTestId} = render(<Restaurants />);

    expect(getByTestId('loader')).toBeDefined();

    await waitForElementToBeRemoved(() => queryByTestId('loader'));
    expect(getByText('error')).toBeDefined();
  });

  it('should render data on fetch success', async () => {
    mockData = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockRestaurants),
    });

    const {getByTestId, queryByTestId, getAllByRole} = render(<Restaurants />);

    expect(getByTestId('loader')).toBeDefined();

    await waitForElementToBeRemoved(() => queryByTestId('loader'));

    const listItems = getAllByRole('button');

    expect(getAllByRole('button').length).toBe(2);

    listItems.map((data, index) => {
      const {getByText} = within(data);
      const {name, geo} = mockRestaurants.data.restaurant.items[index];
      expect(getByText(name)).toBeDefined();
      expect(getByText(geo.address.addressLocality)).toBeDefined();
      expect(getByText(geo.address.postalCode)).toBeDefined();
      expect(getByText(geo.address.postalCode)).toBeDefined();
    });
  });

  it('should open modal with webview with correct url on restaurant item press', async () => {
    mockData = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockRestaurants),
    });

    const {getByTestId, queryByTestId, getAllByRole} = render(<Restaurants />);

    expect(getByTestId('loader')).toBeDefined();

    await waitForElementToBeRemoved(() => queryByTestId('loader'));

    const restuarantItem = getAllByRole('button')[0];

    fireEvent.press(restuarantItem);

    expect(getByTestId('modal')).toBeDefined();

    const {props} = getByTestId('webView');
    expect(props).toEqual(
      expect.objectContaining({
        source: {
          uri: mockRestaurants.data.restaurant.items[0].url,
        },
        startInLoadingState: true,
      }),
    );
  });

  it('should close modal after pressing close on modal', async () => {
    mockData = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockRestaurants),
    });

    const {getByTestId, queryByTestId, getAllByRole, getByText} = render(
      <Restaurants />,
    );

    expect(getByTestId('loader')).toBeDefined();

    await waitForElementToBeRemoved(() => queryByTestId('loader'));

    const restuarantItem = getAllByRole('button')[0];

    fireEvent.press(restuarantItem);

    expect(getByTestId('modal')).toBeDefined();

    const webView = getByTestId('webView');

    expect(webView).toBeDefined();

    const closeButton = getByText('Close');

    fireEvent.press(closeButton);

    expect(getByTestId('modal').props.visible).toBe(false);
  });
});

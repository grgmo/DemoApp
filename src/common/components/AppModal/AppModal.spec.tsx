import React from 'react';
import {View} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import AppModal from './AppModal';

describe('AppModal', () => {
  it('should render modal correctly', () => {
    const modal = render(
      <AppModal>
        <View />
      </AppModal>,
    );
    expect(modal.toJSON()).toMatchSnapshot();
  });

  it('should call onRequestClose on close button press', () => {
    const mockOnRequestClose = jest.fn();
    const {getByRole} = render(
      <AppModal onRequestClose={mockOnRequestClose} />,
    );
    const button = getByRole('button');

    fireEvent.press(button);

    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
  });

  it('should call onRequestClose on onRequestClose', () => {
    const mockOnRequestClose = jest.fn();
    const {getByTestId} = render(
      <AppModal onRequestClose={mockOnRequestClose} />,
    );
    const {props} = getByTestId('modal');
    props.onRequestClose();

    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
  });
});

import {render} from '@testing-library/react-native';
import React from 'react';
import theme from '../../theme';
import AppText, {AppTextType} from './AppText';

describe('AppText', () => {
  const mockText = 'text';
  const defaultStyle = {
    fontSize: theme.FONT.SMALL,
    color: theme.COLOR.black,
  };

  it('should render default text correctly', () => {
    const appText = render(<AppText text={mockText} />);

    expect(appText.toJSON()).toMatchSnapshot();
  });

  it.each([
    [
      'h1',
      {
        fontSize: theme.FONT.XLARGE,
      },
    ],
    [
      'h2',
      {
        fontSize: theme.FONT.LARGE,
      },
    ],
    [
      'h3',
      {
        fontSize: theme.FONT.MEDIUM,
      },
    ],
    [
      'h4',
      {
        fontSize: theme.FONT.SMALL,
      },
    ],
  ])('should render h1 text correctly %s %o', (type, expectedStyle) => {
    const {getByRole} = render(
      <AppText type={type as AppTextType} text={mockText} />,
    );

    const {props} = getByRole('text');

    expect(props.style).toEqual([defaultStyle, expectedStyle]);
  });

  it('should render text with center correctly', () => {
    const {getByRole} = render(<AppText center text={mockText} />);

    const {props} = getByRole('text');

    expect(props.style).toEqual([
      defaultStyle,
      {
        textAlign: 'center',
      },
    ]);
  });

  it('should render text with bold correctly', () => {
    const {getByRole} = render(<AppText bold text={mockText} />);

    const {props} = getByRole('text');

    expect(props.style).toEqual([
      defaultStyle,
      {
        fontWeight: 'bold',
      },
    ]);
  });

  it('should render text with h1, bold and center correctly', () => {
    const {getByRole} = render(
      <AppText type="h1" bold center text={mockText} />,
    );

    const {props} = getByRole('text');

    expect(props.style).toEqual([
      defaultStyle,
      {
        fontSize: theme.FONT.XLARGE,
      },
      {
        fontWeight: 'bold',
      },
      {
        textAlign: 'center',
      },
    ]);
  });
});

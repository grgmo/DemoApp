import React, {FC, useMemo} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import theme from '../../theme';

export type AppTextType = 'h1' | 'h2' | 'h3' | 'h4';

interface AppTextProps extends TextProps {
  text: string;
  bold?: boolean;
  center?: boolean;
  type?: AppTextType;
}

const AppText: FC<AppTextProps> = ({
  text,
  style,
  bold,
  center,
  type,
  ...props
}) => {
  const newStyle: StyleProp<TextStyle> = useMemo(() => {
    let styleToOverride: StyleProp<TextStyle> = [styles.default];

    if (style) {
      styleToOverride.push(style);
    }

    if (type) {
      styleToOverride.push(styles[type]);
    }

    if (bold) {
      styleToOverride.push(styles.bold);
    }

    if (center) {
      styleToOverride.push(styles.center);
    }

    return styleToOverride;
  }, [style, bold, center, type]);

  return (
    <Text accessibilityRole="text" {...props} style={newStyle}>
      {text}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  default: {
    fontSize: theme.FONT.SMALL,
    color: theme.COLOR.black,
  },
  h1: {
    fontSize: theme.FONT.XLARGE,
  },
  h2: {
    fontSize: theme.FONT.LARGE,
  },
  h3: {
    fontSize: theme.FONT.MEDIUM,
  },
  h4: {
    fontSize: theme.FONT.SMALL,
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
});

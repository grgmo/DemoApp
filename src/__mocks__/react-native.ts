import RN from 'react-native';

RN.NativeModules.AppInfo = {
  getConstants: () => ({
    appVersion: '1.0.0',
  }),
};
module.exports = RN;

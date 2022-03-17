import {NativeModules} from 'react-native';

const {appVersion} = NativeModules.AppInfo.getConstants();

export {appVersion};

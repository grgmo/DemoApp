import {appVersion} from './AppInfo';

describe('AppInfo', () => {
  it('should return appVersion', () => {
    expect(appVersion).toBe('1.0.0');
  });
});

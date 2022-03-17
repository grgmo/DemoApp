import {renderHook, act} from '@testing-library/react-hooks';
import useApi from './useApi';

let mockData: any;

global.fetch = jest.fn(() => mockData) as jest.Mock;

describe('useApi', () => {
  it('should return data if successful', async () => {
    mockData = Promise.resolve({
      ok: true,
      json: async () => {
        return Promise.resolve('data');
      },
    });

    const {result, waitForNextUpdate} = renderHook(() => useApi('url'));

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.state.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.state).toEqual({
      loading: false,
      data: 'data',
      error: null,
    });
  });

  it('should return error if fetch result is not ok', async () => {
    mockData = Promise.resolve({
      ok: false,
    });

    const {result, waitForNextUpdate} = renderHook(() => useApi('url'));

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.state.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.state).toEqual({
      loading: false,
      data: null,
      error: 'Something went wrong',
    });
  });

  it('should return error if server error', async () => {
    mockData = Promise.reject(Error('error'));

    const {result, waitForNextUpdate} = renderHook(() => useApi('url'));

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.state.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.data).toBe(null);
    expect(result.current.state.error).toBe('error');

    expect(result.current.state).toEqual({
      loading: false,
      data: null,
      error: 'error',
    });
  });
});

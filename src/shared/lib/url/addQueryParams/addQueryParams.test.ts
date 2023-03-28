import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
  test('test width one param', () => {
    const params = getQueryParams({
      test: 'value',
    });

    expect(params).toBe('?test=value');
  });
  test('test width multiple param', () => {
    const params = getQueryParams({
      test: 'value',
      second: 'valueSecond',
    });

    expect(params).toBe('?test=value&second=valueSecond');
  });
  test('test width undefined', () => {
    const params = getQueryParams({
      test: 'value',
      second: undefined,
    });

    expect(params).toBe('?test=value');
  });
});

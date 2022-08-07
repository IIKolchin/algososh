import { reverseString } from './utils';

describe('String component', () => {
  it('string reverse with odd number of characters', async () => {
    const res = await reverseString(
      'react',
      () => {},
      () => {},
      () => {},
      () => {},
      () => {}
    );

    expect(res).toBe('tcaer');
  }, 7000);

  it('string reverse with even number of characters', async () => {
    const res = await reverseString(
      'java',
      () => {},
      () => {},
      () => {},
      () => {},
      () => {}
    );

    expect(res).toBe('avaj');
  }, 7000);

  it('string reverse with one character', async () => {
    const res = await reverseString(
      'j',
      () => {},
      () => {},
      () => {},
      () => {},
      () => {}
    );

    expect(res).toBe('j');
  }, 7000);

  it('string reverse empty string', async () => {
    const res = await reverseString(
      '',
      () => {},
      () => {},
      () => {},
      () => {},
      () => {}
    );

    expect(res).toBe('');
  }, 7000);
});

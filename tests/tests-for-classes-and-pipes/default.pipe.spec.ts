/* tslint:disable:no-unused-variable */
import {DefaultPipe} from './default.pipe.ts';

describe('Pipe : Default Test', () => {
  let pipe: DefaultPipe;
  beforeEach( () => {
    pipe = new DefaultPipe();
  });
  it('Provided a string url value gives the value', () => {
    expect(pipe.transform('http://slash.net','fallbackstring')).toBe('http://slash.net');
  });
  it('Provided no value gives the fallback', () => {
    expect(pipe.transform('','http://fallback.net')).toBe('http://fallback.net');
  });
  it('If forced https protocol returns converted http in https', () => {
    expect(pipe.transform('','http://fallback.net',true)).toBe('https://fallback.net');
  });
});

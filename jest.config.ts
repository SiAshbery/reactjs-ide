import type {Config} from 'jest';

const config: Config = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?x?$': 'ts-jest',
  },
};

module.exports = config;

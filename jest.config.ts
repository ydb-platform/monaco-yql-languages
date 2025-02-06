import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    transform: {'^.+\\.[jt]sx?$': 'ts-jest'},
    rootDir: '.',
};

export default config;

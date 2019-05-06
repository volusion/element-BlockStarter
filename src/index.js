import createFactory from './createFactory';
import { factory as StarterBlock } from './block';
import styles from './styles';
import { configSchema, defaultConfig } from './blockConfig';
import { getDataProps } from './data';

const factory = createFactory(StarterBlock, styles, configSchema);

export { factory, getDataProps, defaultConfig };

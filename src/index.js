import { createFactory } from './createFactory';
import { StarterBlockFactory } from './block';
import { styles } from './styles';
import { configSchema, defaultConfig } from './blockConfig';
import { getDataProps } from './data';

const factory = createFactory(StarterBlockFactory, styles, configSchema);

export { factory, getDataProps, defaultConfig };

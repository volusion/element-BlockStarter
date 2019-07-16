import { createFactory } from '@volusion/element-block-utils';
import { StarterBlockFactory } from './block';
import { styles } from './styles';
import { configSchema, defaultConfig } from './configs';
import { getDataProps } from './data';

const factory = createFactory(StarterBlockFactory, styles, configSchema);

export { factory, getDataProps, defaultConfig };

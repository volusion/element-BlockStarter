import { createFactory } from '@volusion/element-block-utils';
import { StarterBlockFactory } from './Block';
import { styles } from './getStyles';
import { configSchema, defaultConfig } from './configs';
import { getDataProps } from './getDataProps';

const factory = createFactory(StarterBlockFactory, styles, configSchema);

export { factory, getDataProps, defaultConfig };

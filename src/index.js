import { createFactory } from '@volusion/element-block-utils';
import { StarterBlockFactory } from './Block';
import { getStyles } from './getStyles';
import { configSchema, defaultConfig } from './configs';
import { getDataProps } from './getDataProps';

const factory = createFactory(StarterBlockFactory, { getStyles, configSchema });

export { factory, getDataProps, defaultConfig };

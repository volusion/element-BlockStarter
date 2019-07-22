import { createFactory } from '@volusion/element-block-utils';
import { StarterBlockFactory } from './Block';
import { getStyles } from './getStyles';
import { getConfigSchema, defaultConfig } from './configs';
import { getDataProps } from './getDataProps';

const factory = createFactory(StarterBlockFactory, { getStyles, getConfigSchema });

export { factory, getDataProps, defaultConfig };

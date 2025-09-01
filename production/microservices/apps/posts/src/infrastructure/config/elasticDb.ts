import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import JoiUtil from '@_shared/utils/JoiUtils';

enum ElasticMode {
  self = 'self',
  cloud = 'cloud',
}

export default registerAs('elasticDb', () =>
  JoiUtil.validate<{
    username?: string;
    password?: string;
    elasticMode: ElasticMode;
    apiKey?: string;
    node?: string;
  }>({
    elasticMode: {
      value: process.env.ELASTIC_MODE,
      joi: Joi.string().valid(ElasticMode.self, ElasticMode.cloud).required(),
    },
    apiKey: {
      value: process.env.ELASTIC_API_KEY,
      joi: Joi.when('elasticMode', {
        is: ElasticMode.cloud,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),
    },
    node: {
      value: process.env.ELASTIC_NODE,
      joi: Joi.when('elasticMode', {
        is: ElasticMode.cloud,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),
    },
    username: {
      value: process.env.ELASTIC_USERNAME,
      joi: Joi.when('elasticMode', {
        is: ElasticMode.self,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),
    },
    password: {
      value: process.env.ELASTIC_PASSWORD,
      joi: Joi.when('elasticMode', {
        is: ElasticMode.self,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),
    },
  }),
);

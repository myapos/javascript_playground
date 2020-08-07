import { normalize, schema } from 'normalizr';
import actionsData from  './data/actionsData';
import printJson from  './printJson';
import createSchemas from './utils';

const actionSchema = new schema.Entity('action', {}, { idAttribute: 'Label' });

const actionssListSchema = new schema.Array(actionSchema); 

const normalizedData = normalize(actionsData, actionssListSchema);

printJson(normalizedData);
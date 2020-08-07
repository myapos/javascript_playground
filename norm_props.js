import { normalize, schema } from 'normalizr';
// import {nextPropsDatastores, thisPropsDatastores} from  './data/props';
import {nextPropsDatastores, thisPropsDatastores} from  './data/props_2';
import printJson from  './printJson';
import _ from 'lodash';
import createSchemas from './utils';

const datastoreSchema = new schema.Entity('datastore', {});

const datastoresListSchema = new schema.Array(datastoreSchema); 

const nextPropsNormalizedData = normalize(nextPropsDatastores, datastoresListSchema);

console.log('nextPropsNormalizedData');
printJson(nextPropsNormalizedData);

const thisPropsNormalizedData = normalize(thisPropsDatastores, datastoresListSchema);

console.log('thisPropsNormalizedData');

printJson(thisPropsNormalizedData);

console.log('are normalized object equal?', _.isEqual(nextPropsNormalizedData,thisPropsNormalizedData))
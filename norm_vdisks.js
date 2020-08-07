import { normalize, schema } from 'normalizr';
import vdisksData from  './data/vdisksData';
import printJson from  './printJson';
import createSchemas from './utils';

const vdiskSchema = new schema.Entity('vdisks');

const vdisksListSchema = new schema.Array(vdiskSchema); 

const normalizedData = normalize(vdisksData, vdisksListSchema);

printJson(normalizedData);
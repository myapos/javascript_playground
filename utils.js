import { schema } from 'normalizr';

const createSchemas = name => {
  const itemSchema = new schema.Entity(name);
  const collectionSchema = new schema.Array(itemSchema);
  return {
    item: itemSchema,
    array: collectionSchema,
  };
};

export default createSchemas;
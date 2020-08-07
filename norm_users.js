// https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/
import { normalize, schema } from 'normalizr';
import usersData from  './data/usersData';
import printJson from  './printJson';

// Define a users schema
const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('comments', {
    commenter: user
  });
  
  // Define your article
  const article = new schema.Entity('articles', {
    author: user,
    comments: [comment]
  });
  
  const normalizedData = normalize(usersData, article);

  printJson(normalizedData);
type KeyEqualsValue = {
  [K in string]: K; // Keys must equal their values
};

export const hosts = {
  posts: 'posts',
  users: 'users',
  postsDb: 'posts_db',
  usersDb: 'users_db',
  gateway: 'gateway',
  client: 'client',
  posts_elastic_db: 'posts_elastic_db',
  redis: 'redis',
} as const
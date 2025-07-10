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
  es01: 'es01',
  redis_posts: 'redis_posts',
  redis_auth: 'redis_auth',
} as const;

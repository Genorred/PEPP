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
  redis_posts: 'redis-posts',
  redis_auth: 'redis-auth',
} as const;

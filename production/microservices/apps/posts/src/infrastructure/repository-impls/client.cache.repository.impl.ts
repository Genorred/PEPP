import { ClientCacheRepository } from '../../domain/repositories/client.cache.repository';
import { Inject } from '@nestjs/common';
import FRONTEND_SERVER from '../config/frontend-server';
import { ConfigType } from '@nestjs/config';

export class ClientCacheRepositoryImpl implements ClientCacheRepository {
  constructor(
    @Inject(FRONTEND_SERVER.KEY)
    private readonly configService: ConfigType<typeof FRONTEND_SERVER>,
  ) {}

  revalidatePost(postId: number, postUserId: number): Promise<unknown> {
    return fetch(this.configService.clientRevalidateCacheUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        postUserId,
        token: this.configService.token,
      }),
    }).catch((e: Error) => {
      console.error('Error while revalidatePost');
      console.error(e);
    });
    // fetch('http://client:3000/api/revalidatePost', {
    //   method: "post",
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     postId: 1,
    //     postUserId: 1,
    //     token: 'GFDHGFDfdghdfgh'
    //   })
    // })
    // fetch('http://gateway:3000', {
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json"
    //   },
    // })
  }
}

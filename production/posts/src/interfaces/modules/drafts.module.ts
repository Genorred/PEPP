import { Module } from '@nestjs/common';
import { DraftsService } from '../../drafts/drafts.service';
import { DraftsResolver } from '../resolvers/drafts.resolver';

@Module({
  providers: [DraftsResolver, DraftsService],
})
export class DraftsModule {}

import { Module } from '@nestjs/common';
import { VersionsService } from '../../versions/versions.service';
import { VersionsResolver } from '../resolvers/versions.resolver';

@Module({
  providers: [VersionsResolver, VersionsService],
})
export class VersionsModule {}

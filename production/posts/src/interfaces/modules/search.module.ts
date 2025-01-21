import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import elasticDb from "../../infrastructure/config/elasticDb";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { SearchRepositoryImpl } from "../../infrastructure/services/search/search.repository.impl";
import { SearchQueryBuilderService } from "../../infrastructure/services/search/searchQueryBuilder";
import { hosts } from "@_config/hosts";
import * as fs from "node:fs";
import { RedisModule } from "./redis.module";
import { SearchRepository } from "../../domain/repositories/posts/search.repository";

@Module({
  imports: [ElasticsearchModule.registerAsync({
    imports: [ConfigModule],
    inject: [elasticDb.KEY],
    useFactory: (elasticConfig: ConfigType<typeof elasticDb>) => {
      console.log(hosts.es01);
      return {
        node: `https://${hosts.es01}:9200`,
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
        tls: {
          ca: fs.readFileSync("/usr/app/posts/certs/ca/ca.crt"),
          cert: fs.readFileSync("/usr/app/posts/certs/es01/es01.crt"),
          key: fs.readFileSync("/usr/app/posts/certs/es01/es01.key"),
          rejectUnauthorized: process.env.NODE_ENV === "production" // Ensure this is true for production
        },
        auth: {
          username: elasticConfig.username,
          password: elasticConfig.password
        }
      };
    }
  }), RedisModule],
  exports: [SearchRepository],
  providers: [{
    provide: SearchRepository,
    useClass: SearchRepositoryImpl
  }, SearchQueryBuilderService]
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchRepository) {
  }

  public async onModuleInit() {
    await this.searchService.createIndex();
  }
}
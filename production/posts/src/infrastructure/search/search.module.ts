import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import elasticDb from "../config/elasticDb";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { SearchService } from "./search.service";
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { hosts } from "@_config/hosts";
import * as fs from "node:fs";
import { RedisModule } from "../../domain/kernel/redis.module";

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
  exports: [SearchService],
  providers: [SearchService, SearchQueryBuilderService]
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {
  }

  public async onModuleInit() {
    await this.searchService.createIndex();
  }
}
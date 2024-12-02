import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import elasticDb from "../config/elasticDb";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { SearchService } from './search.service';
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { hosts } from "@_config/hosts";

@Module({
  imports: [ElasticsearchModule.registerAsync({
    imports: [ConfigModule],
    inject: [elasticDb.KEY],
    useFactory: (elasticConfig: ConfigType<typeof elasticDb>) => ({
      node: `https://${hosts.posts_elastic_db}:9200`,
      maxRetries: 10,
      requestTimeout: 60000,
      pingTimeout: 60000,
      sniffOnStart: true,
      auth: {
        username: elasticConfig.username,
        password: elasticConfig.password,
      },
    })
  })],
  providers: [SearchService, SearchQueryBuilderService]
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) { }
  public async onModuleInit() {
    await this.searchService.createIndex();
  }
}
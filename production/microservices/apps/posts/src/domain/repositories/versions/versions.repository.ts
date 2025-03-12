import { Version } from "../../entities/version.entity";
import { FindOneVersionDto } from "../../dto/versions/find-one-version.dto";
import { FindManyDto } from "../../dto/versions/find-many.dto";
import { CreateVersionDto } from "../../dto/versions/create-version.dto";

export abstract class VersionsRepository {
  abstract create(createVersionInput: CreateVersionDto): Promise<Version>

  abstract findMany(findByPostInput: FindManyDto): Promise<Version[]>

  abstract findOne(findOneVersion: FindOneVersionDto): Promise<Version>
}
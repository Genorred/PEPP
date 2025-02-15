import { Version } from "../../entities/version.entity";
import { FindOneVersionInput } from "../../dto/versions/find-one-version.input";
import { FindManyInput } from "../../dto/versions/find-many.input";
import { CreateVersionInput } from "../../dto/versions/create-version.input";

export abstract class VersionsRepository {
  abstract create(createVersionInput: CreateVersionInput): Promise<Version>

  abstract findMany(findByPostInput: FindManyInput): Promise<Version[]>

  abstract findOne(findOneVersion: FindOneVersionInput): Promise<Version>
}
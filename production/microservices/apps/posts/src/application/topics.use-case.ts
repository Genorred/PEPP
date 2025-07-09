import { Injectable } from '@nestjs/common';
import { TopicsRepository } from '../domain/repositories/topics/topics.repository';

@Injectable()
export class TopicsUseCase {
  constructor(private readonly topicsRepository: TopicsRepository) {}

  // create(createTopicInput: CreateTopicInput) {
  //   return 'This action adds a new topic';
  // }

  search(input: string) {
    return this.topicsRepository.findMany(input);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} topic`;
  // }

  // update(id: number, updateTopicInput: UpdateTopicInput) {
  //   return `This action updates a #${id} topic`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} topic`;
  // }
}

import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

interface MessageInfoDTO {
  recipients: string[];
  chatName: string;
  content: string;
}

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
  ) {}

  @Post('pop-message')
  async popMessage(dto: MessageInfoDTO) {
    this.kafkaService.emit('pop-message', dto);
    return { status: 'Message sent to Kafka' };
  }
}

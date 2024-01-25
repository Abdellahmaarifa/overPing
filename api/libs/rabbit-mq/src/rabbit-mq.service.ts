import { Injectable, HttpException } from '@nestjs/common';
import { RmqOptions, Transport, ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IMessagePattern } from './interface/message-pattren.interface';
import { SuccessResponseModel } from '@app/common'
@Injectable()
export class RabbitMqService {
    constructor(private readonly configService: ConfigService){}

   /**
   * Method used to get RabbitMQ options for connecting to a microservice and configuring a queue.
   *
   * @param {string} serviceQueue - Name of the queue for the microservice
   * @param {boolean} noAck - Whether to require acknowledgment for messages
   *
   * @return {RmqOptions} - RabbitMQ options for connecting to the microservice and configuring a queue
   */
    getOptions(serviceQueue: string, noAck = false): RmqOptions {
        const USER = this.configService.get<string>('RABBIT_MQ_USERNAME')
        const PASSWORD = this.configService.get<string>('RABBIT_MQ_PASSWORD')
        const HOST = this.configService.get<string>('RABBITMQ_MQ_HOST')
        const rmqUrl = `amqp://${USER}:${PASSWORD}@${HOST}`
        return {
            transport: Transport.RMQ, 
            options: {
                urls: [rmqUrl], 
                queue: serviceQueue, 
                // noAck: noAck,
                // persistent: true,
                queueOptions:{
                    durable: false
                }
            }
        };
    }

    /**
   * Method used to send the request to the corresponding microservice. It accepts following parameters:
   *
   * - @param {ClientProxy} client - microservice client to send the message to
   * - @param {IMessagePattern} messagePattern - object containing the pattern for a message (i.e. `{ role: 'user', cmd: 'create' }`)
   * - @param {*} payload - data to send to the microservice client
   *
   * @return {*}  {Promise<any>} - returned response from a microservice or an adequate HTTP exception
   */
  async sendMessageWithPayload(
    client: ClientProxy,
    messagePattern: IMessagePattern,
    payload: any,
  ): Promise<any> {
    try {
      return await client.send(messagePattern, payload).toPromise();
    } catch (error) {
      console.log("the error of the httpException comming from ther service{ ",error.errorStatus, error, "}", messagePattern);
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }


    /**
   * Method used to send the request to the corresponding microservice. It accepts following parameters:
   *
   * - @param {ClientProxy} client - microservice client to send the message to
   * - @param {IMessagePattern} messagePattern - object containing the pattern for a message (i.e. `{ role: 'user', cmd: 'create' }`)
   * - @param {*} payload - data to send to the microservice client
   *
   * @return {*}  {Promise<any>} - returned response from a microservice or an adequate HTTP exception
   */
  async sendMessageWithoutPayload(
    client: ClientProxy,
    messagePattern: IMessagePattern,
  ): Promise<any> {
    try {
	return await client.send(messagePattern, {}).toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }



    
  /**
 * Method used to emit a message to the corresponding microservice. It accepts following parameters:
 *
 * - @param {ClientProxy} client - microservice client to emit the message from
 * - @param {string} event - the event to emit
 * - @param {*} payload - data to include in the emitted message
 *
 * @return {Promise<void>} - a promise indicating the success or failure of the emit operation
 */
async emitMessageWithPayload(
    client: ClientProxy,
    event: IMessagePattern,
    payload: any,
  ): Promise<void> {
    try {
      await client.emit(event, payload).toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }


}

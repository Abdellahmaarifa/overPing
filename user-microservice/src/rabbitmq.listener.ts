import { UserService } from './user/user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as amqp from 'amqplib';

const prisma = new PrismaService()

// RabbitMQ Event Listener
export async function startListening() {
  const connection = await amqp.connect('amqp://rabbitmq'); // rabbitMQ connection url
  const channel = await connection.createChannel();

  const exchange = 'Exchange_name';
  const queue = 'Queue_name';

  // Bind multiple routing keys to the same queue
  const routingKeys = ['createProfile', 'deleteProfile'];
  for (const routingKey of routingKeys) {
    await channel.assertExchange(exchange, 'direct', { durable: false });
    const assertQueue = await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(assertQueue.queue, exchange, routingKey);
  }

  channel.consume(queue, async (message) => {
    if (message) {
      const eventData = JSON.parse(message.content.toString());
      
      // Determine the type of event and take appropriate action
      switch (eventData.type) {
        case 'createProfile':
          await handleCreateProfileEvent(eventData);
          break;
        case 'deleteProfile':
          await handleDeleteProfileEvent(eventData);
          break;
        default:
          console.warn(`Unknown event type: ${eventData.type}`);
      }
      channel.ack(message);
    }
  }, { noAck: false });
}

async function handleCreateProfileEvent(eventData: any) {
  const userService = new UserService(prisma);
  // Create the user profile using `user_id` and `username`
  await userService.createUserProfile(eventData.user_id, eventData.username);
}

async function handleDeleteProfileEvent(eventData: any) {
  const userService = new UserService(prisma);
  // Delete the user profile with `user_id`
  await userService.deleteUserProfile(eventData.user_id);
}

startListening();
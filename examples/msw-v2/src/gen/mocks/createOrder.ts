import { faker } from '@faker-js/faker'
import type { Order } from '../models/Order'

export function createOrder(override: NonNullable<Partial<Order>> = {}): NonNullable<Order> {
  faker.seed([220])
  return {
    ...{
      'id': faker.number.int(),
      'petId': faker.number.int(),
      'quantity': faker.number.int(),
      'shipDate': faker.string.alpha(),
      'status': faker.helpers.arrayElement<any>(['placed', 'approved', 'delivered']),
      'http_status': faker.helpers.arrayElement([200, 400, 500]) as any,
      'complete': faker.datatype.boolean(),
    },
    ...override,
  }
}

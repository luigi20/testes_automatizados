import {expect, test} from 'vitest';
import { Appointment } from './appointment';
import { getFuture } from '../tests/utils/get-future-date';
test('create an appointment',()=>{
  const startDateAt = getFuture('2024-08-10');
  const endDateAt = getFuture('2024-08-11');
  const appointment = new Appointment({customer:'John Doe',startsAt:startDateAt,endAt:endDateAt});
  expect(appointment).instanceOf(Appointment);
  expect(appointment.id).toBeTruthy();
  expect(appointment.customer).toBe('John Doe');
  expect(appointment.startsAt).toBeInstanceOf(Date);
  expect(appointment.endAt).toBeInstanceOf(Date);
})

test('cannot create a new appointment with end date before start date', () => {
  const startDateAt = getFuture('2024-08-02');
  const endDateAt = getFuture('2024-08-01');
  expect (()=>{
    return new Appointment({
      customer: 'John Doe',
      startsAt: startDateAt,
      endAt: endDateAt
    })
  }).toThrow();
})

test('cannot create a new appointment with end date before now', () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  startDate.setDate(startDate.getDate() - 1);
  expect (()=>{
    return new Appointment({
      customer: 'John Doe',
      startsAt: new Date(),
      endAt: endDate
    })
  }).toThrow();
})
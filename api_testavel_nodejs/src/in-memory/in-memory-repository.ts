import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

export class InMemoryAppointmentRepository implements AppointmentRepository{
async findOverlappingAppointment(startsAt: Date, endDate: Date): Promise<Appointment | null> {
    const overlappingAppointment = this.appointments.find((appoint) => {
      return areIntervalsOverlapping({
        start: startsAt,
        end:endDate
      },
      {
        start:appoint.startsAt,
        end: appoint.endAt
      }),
      {
        inclusive: true
      }
    });
    if(!overlappingAppointment) return null;
    return overlappingAppointment;
  }
  private appointments: Appointment[] = [];
 async create(appointment: Appointment): Promise<void> {
   this.appointments.push(appointment);
  }
  async save(appointment: Appointment): Promise<void> {
   const position = this.appointments.findIndex(item=> item.id === appointment.id);
   if(position - 1)
    throw new Error('Appointment not found');
   this.appointments[position] = appointment;
  } 
}
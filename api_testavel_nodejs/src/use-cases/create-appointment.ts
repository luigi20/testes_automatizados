import axios from "axios";
import { Appointment } from "../entities/appointment";
import { EmailService } from "../mail/email.service";
import { AppointmentRepository } from "../repositories/appointments-repository";
import { HttpService } from "@nestjs/axios";

interface CreateAppointmentRequest{
  customer:string;
  startsAt:Date;
  endAt:Date;
}

type CreateAppointmentResponse = Appointment ;

export class CreateAppointment{

  constructor(private appointmentRepository: AppointmentRepository, private emailService: EmailService){}
 public async execute({customer,endAt,startsAt}:CreateAppointmentRequest):Promise<CreateAppointmentResponse>{
    const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endAt);
    if(overlappingAppointment){
      throw new Error('Another appointment overlaps this appointment dates');
    }
    const appointment = new Appointment({
      customer,endAt,startsAt
    })
    await this.appointmentRepository.create(appointment);
    await this.emailService.sendEmail({
      to: customer,
      subject: "Appointment Scheduled",
      body: `Your appointment is scheduled from ${startsAt} to ${endAt}.`,
    });
    return appointment;
   }
}
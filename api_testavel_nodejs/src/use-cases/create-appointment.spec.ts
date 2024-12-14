import { describe, expect, it, vi } from 'vitest';
import { CreateAppointment } from './create-appointment';
import { Appointment } from '../entities/appointment';
import { getFuture } from '../tests/utils/get-future-date';
import { InMemoryAppointmentRepository } from '../in-memory/in-memory-repository';
import { EmailService } from '../mail/email.service';

describe('Create appointment', () => {
  it('should be able to create appointment', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();

    // Instanciar o emailService real
    const emailService = new EmailService();
    // Mock apenas do método sendEmail
    const sendEmailMock = vi.spyOn(emailService, 'sendEmail').mockResolvedValueOnce();
    const createAppointment = new CreateAppointment(appointmentRepository,emailService);

    const startDateAt = getFuture('2024-08-10');
    const endDateAt = getFuture('2024-08-11');

    // Executar o agendamento e verificar se funciona corretamente
    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: startDateAt,
      endAt: endDateAt,
    })).resolves.toBeInstanceOf(Appointment);

    // Verificar se o e-mail foi enviado
    expect(sendEmailMock).toHaveBeenCalled();
  });

  it('should not be able to create appointment with overlapping dates', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
      // Instanciar o emailService real
    const emailService = new EmailService();
      // Mock apenas do método sendEmail
    const createAppointment = new CreateAppointment(appointmentRepository,emailService);
    const startDateAt = getFuture('2024-08-10');
    const endDateAt = getFuture('2024-08-15');
    // Primeiro agendamento bem-sucedido
    await createAppointment.execute({
      customer: 'John Doe',
      startsAt: startDateAt,
      endAt: endDateAt,
    });

    // Tentativa de criar agendamento com conflito de datas
    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFuture('2024-08-14'),
      endAt: getFuture('2024-08-18'),
    })).rejects.toBeInstanceOf(Error);
  });
});

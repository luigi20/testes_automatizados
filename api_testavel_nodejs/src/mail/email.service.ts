import nodemailer from 'nodemailer';

interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Configure com as informações do seu provedor de email
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: 'your-email@example.com', // Email de autenticação
        pass: 'your-email-password', // Senha do email
      },
    });
  }

  public async sendEmail({ to, subject, body }: SendEmailRequest): Promise<void> {
    const mailOptions = {
      from: 'your-email@example.com', // Remetente
      to,
      subject,
      text: body, // Corpo do email em texto
    };
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

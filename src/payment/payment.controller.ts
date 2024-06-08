import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // create payment route

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  // create checkout route
  @Post('checkout')
  async createCheckOut(@Body('amount_cents') amount_cents) {
    return this.paymentService.createCheckOut(amount_cents);
  }
}

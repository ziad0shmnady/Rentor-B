import { Injectable, HttpServer } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PaymentService {
  paymobapi = axios.create({
    baseURL: 'https://accept.paymob.com',
  });
  // add bearer token to the request

  constructor(private prismService: PrismaService) {}

  async createPayment(createPaymentDto) {
    try {
      const response = await this.paymobapi.post(
        '/api/ecommerce/payment-links',
        {
          amount_cents: createPaymentDto.amount_cents,
          currency: 'EGP',
          payment_methods: [4535465],
          is_live: false,
        },
        {
          headers: {
            Authorization: `Bearer ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RZME5UazBMQ0p3YUdGemFDSTZJalZqTm1JMVpHTXdNR0V6WTJNek9XVTFPRGMyWldVd05tRTNPV1kyTTJJeVptVXlNekE0TVRZMk5qUmtObVV4WmpOa05EaGpNVGM1TXprM1pEQXhPV01pTENKbGVIQWlPakUzTVRjNE1UWXlORE45Lkx3Nkkxb1JLVFJzejVsMnQ1N0dVQkJxVVpNREc3bjkzQnh5TU5Sb01SSC1lb3ZSRy1OaFg0SGhibmROLUZBOExoS0JBODJ5dy1Fd3NxWkZKdWdhcVhR`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error.message);
      throw error;
    }
  }

  async createCheckOut(amount_cents): Promise<any> {
    const url = 'https://accept.paymob.com/v1/intention/';
    const headers = {
      Authorization:
        'Token egy_sk_test_57ba55a136e160f1ffe432224d69c51b5b033a30ac0be3140acc9551dedd4a5c',
      'Content-Type': 'application/json',
    };

    const data = {
      amount: amount_cents,
      currency: 'EGP',
      payment_methods: ['card'],

      billing_data: {
        apartment: '6',
        first_name: 'Ammar',
        last_name: 'Sadek',
        street: '938, Al-Jadeed Bldg',
        building: '939',
        phone_number: '+96824480228',
        country: 'OMN',
        email: 'AmmarSadek@gmail.com',
        floor: '1',
        state: 'Alkhuwair',
      },
      customer: {
        first_name: 'Ammar',
        last_name: 'Sadek',
        email: 'AmmarSadek@gmail.com',
        extras: {
          re: '22',
        },
      },
      extras: {
        ee: 22,
      },
    };

    try {
      const response = await axios.post(url, data, { headers });
      return {
        checkoutLink: `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_sV0JHZF7hTJKIaF8Au4lZ3HNCMlzzcoZ&clientSecret=${response.data.client_secret}`,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extract and log the relevant parts of the Axios error
        console.error(
          'Error creating checkout',
          error.response?.data || error.message,
        );
        throw new Error(error.response?.data || error.message);
      } else {
        console.error('Unexpected error', error);
        throw new Error('Unexpected error');
      }
    }
  }
  //create like the previuse checkout using axios
}

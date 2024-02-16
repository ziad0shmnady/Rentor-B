import { AuthGuard } from '@nestjs/passport';

export class SupportAuthGuard extends AuthGuard('support') {}

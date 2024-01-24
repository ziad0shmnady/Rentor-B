import { Controller,Request, Post, UseGuards ,Get, Res} from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')

export class AuthController {
constructor(
    private authService: AuthService
){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req,@Res() res): Promise<any> {
        return this.authService.generateJwt(req.user,res);
    }
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
        return req.user;
    }
}
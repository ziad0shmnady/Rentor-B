import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            secretOrKey: 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,

        })
    }
    async validate(payload: any){
        return { userId: payload.sub, email: payload.email, type:payload.type, name: payload.name };
    }
}
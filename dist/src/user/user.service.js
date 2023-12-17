"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
require('dotenv').config();
let UserService = class UserService {
    refreshToken(req) {
        return new Promise((resolve) => {
            const cookie = req.cookies;
            if (!cookie?.jwt) {
                throw new common_1.InternalServerErrorException('No Token Found');
            }
            const refreshToken = cookie.jwt;
            this.userRepository.
                findOne({ where: { refreshToken: refreshToken } }).
                then((data) => {
                const decoded = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET, });
                if (data.email != decoded.email) {
                    throw new common_1.InternalServerErrorException('Invalid Token');
                }
                const payload = { email: data.email };
                const access_token = this.jwtService.sign(payload);
                resolve(access_token);
            });
        });
    }
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    create(createUserDto) {
        try {
            return new Promise((resolve) => {
                bcrypt.hash(createUserDto.password, 10, (err, hash) => {
                    if (err) {
                        throw new common_1.InternalServerErrorException('Could not hash password');
                    }
                    else {
                        const user = new user_entity_1.User();
                        user.name = createUserDto.name;
                        user.age = createUserDto.age;
                        user.email = createUserDto.email;
                        user.username = createUserDto.username;
                        user.password = hash;
                        user.gender = createUserDto.gender;
                        this.userRepository
                            .save(user)
                            .then((savedUser) => resolve(savedUser))
                            .catch((error) => {
                            console.error('Error creating user:', error);
                            throw new common_1.InternalServerErrorException('Could not create user');
                        });
                    }
                });
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    findAll() {
        return this.userRepository.find();
    }
    signIn(signInDto, res) {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne({ where: { username: signInDto.username } })
                .then(user => {
                bcrypt.compare(signInDto.password, user.password, (err, result) => {
                    if (err) {
                        reject(new common_1.NotFoundException('Invalid password'));
                    }
                    else {
                        const payload = { email: user.email };
                        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
                        const access_token = this.jwtService.sign(payload);
                        const refreshToken = this.jwtService.sign(payload, {
                            secret: REFRESH_TOKEN_SECRET,
                            expiresIn: "1d",
                        });
                        res.cookie('jwt', refreshToken, {
                            maxAge: 3600000,
                            secure: false,
                            httpOnly: true,
                        });
                        user.refreshToken = refreshToken;
                        this.userRepository.save(user);
                        resolve(access_token);
                    }
                });
            }).catch(error => {
                reject(new common_1.NotFoundException('User not found'));
            });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map
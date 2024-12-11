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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../user/entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async updateProfilePicture(id, filePath) {
        await this.userRepository.update(id, { PROFILEPICTURE: filePath });
    }
    async validateUser(username, pass, role) {
        const user = await this.userRepository.findOne({ where: { username, role } });
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            console.log("Validated User: ", result);
            return result;
        }
        return null;
    }
    async login(username, password, role) {
        const user = await this.validateUser(username, password, role);
        const payload = { username: user.username, sub: user.id, role: user.role };
        console.log("Detail from Payload: ", payload);
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
        };
    }
    async register(username, pass, role) {
        const hashPassword = await bcrypt.hash(pass, 10);
        const newUser = this.userRepository.create({ username, password: hashPassword, role });
        return this.userRepository.save(newUser);
    }
    findOne(id) {
        return this.userRepository.findOneBy({ id });
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const Create_StudentDto_1 = require("./DTO/Create.StudentDto");
const Update_studentDto_1 = require("./DTO/Update.studentDto");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async uploadProfilePicture(id, file) {
        console.log(file);
        const filePath = `Upload/${file.filename}`;
        await this.studentService.updateProfilePicture(id, filePath);
        return { message: 'Profile picture uploaded successfully', filePath };
    }
    async getProfilePicture(id) {
        const student = await this.studentService.findOne(id);
        return { profilePicture: student.PROFILEPICTURE };
    }
    async getStudentDetails(id) {
        const data = await this.studentService.getStudentDetailsById(id);
        return {
            success: true,
            data,
        };
    }
    async getTeacherDetails(id) {
        const data = await this.studentService.getStudentTeacherDetails(id);
        return {
            success: true,
            data,
        };
    }
    async getMarkDetails(id) {
        const data = await this.studentService.getStudentMarkDetails(id);
        return {
            success: true,
            data,
        };
    }
    async getProjectDetail(id) {
        const data = await this.studentService.getStudentProjectDetail(id);
        return {
            success: true,
            data,
        };
    }
    async getAllDetails() {
        const data = await this.studentService.getAllDetails();
        return {
            success: true,
            data,
        };
    }
    findAll() {
        return this.studentService.findAll();
    }
    findOne(id) {
        return this.studentService.findOne(id);
    }
    create(createStudentDto) {
        return this.studentService.create(createStudentDto);
    }
    update(id, updateStudentDto) {
        return this.studentService.update(id, updateStudentDto);
    }
    remove(id) {
        return this.studentService.remove(id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Patch)(':id/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './Uploads/ProfilePicture',
            filename: (req, file, callback) => {
                const fileExtName = (0, path_1.extname)(file.originalname);
                const randomName = Array(16)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                callback(null, `${randomName}${fileExtName}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Get)(':id/profilepicture'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getProfilePicture", null);
__decorate([
    (0, common_1.Get)(':id/detail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentDetails", null);
__decorate([
    (0, common_1.Get)(':id/teacher'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getTeacherDetails", null);
__decorate([
    (0, common_1.Get)(':id/mark'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getMarkDetails", null);
__decorate([
    (0, common_1.Get)(':id/project'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getProjectDetail", null);
__decorate([
    (0, common_1.Get)('allDetail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAllDetails", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Create_StudentDto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Update_studentDto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "remove", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map
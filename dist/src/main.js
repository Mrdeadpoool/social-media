"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const AllExceptionFilter_1 = require("./middleware/AllExceptionFilter");
const swaggerConfig_1 = require("../swaggerConfig");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle(swaggerConfig_1.swaggerConfig.swaggerTitle)
        .setDescription(swaggerConfig_1.swaggerConfig.swaggerDescription)
        .setVersion(swaggerConfig_1.swaggerConfig.swaggerVersion)
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api-docs', app, document);
    app.use(cookieParser());
    app.useGlobalFilters(new AllExceptionFilter_1.AllExceptionsFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
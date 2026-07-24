"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const logging_interceptor_1 = require("./logging.interceptor");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const port = 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    await app.listen(port);
    logger.log(`---------------------------------------------------------------------------`);
    logger.log(`INICIALIZADO CON EXITO`);
    logger.log(`El servidor esta corriendo en:http://localhost:${port}`);
    logger.log(`Prueba tu GraphQL en: http://localhost:${port}/graphql`);
    logger.log(`---------------------------------------------------------------------------`);
}
bootstrap();
//# sourceMappingURL=main.js.map
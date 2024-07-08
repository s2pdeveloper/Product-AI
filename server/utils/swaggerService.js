const swaggerAutoGen = require("swagger-autogen");
const swaggerHandler = require("./swaggerHandler.js");

const doc = {
    info: {
        title: "My API",
        description: "API documentation",
      },
      host: "localhost:2025",
      basePath: "/api/v1/admin",
      schemes: ["http"],
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Enter your bearer token in the format **Bearer <token>**",
        },
      },
      // Define security globally for all paths
      security: [
        {
          Bearer: []
        }
      ]
};
const outputFile = "../mocks/swagger-output.json";
const endpointsFiles = ["src/controllers/v1/admin/**.js"]; // Include all your endpoint files here





const swaggerAutoGenInstance = swaggerAutoGen();
swaggerAutoGenInstance(outputFile, endpointsFiles, doc).then(() => {
  swaggerHandler.updateSwaggerDoc();
});

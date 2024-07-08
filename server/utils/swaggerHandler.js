const { serve, setup } = require("swagger-ui-express");
const swaggerOutput = require("../mocks/swagger-output.json");
const schemaHandler = require("./schemaHandler.js");
const FileHandler = require("./fileHandler.js");

class SwaggerHandler {
  constructor() {}

  setup(app) {
    let options = {
      swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
      }
    };
    app.use("/api-docs", serve, setup(swaggerOutput,options));
    // this.updateSwaggerDoc();
  }

  async updateSwaggerDoc() {
    const swaggerOutputFilePath = "mocks/swagger-output.json";
    let schemaArray = await schemaHandler.loadSchemas();
    console.log("schema Array", schemaArray);
    let swaggerOutputFile = JSON.parse(JSON.stringify(swaggerOutput));
    if (Object.keys(swaggerOutputFile).length !== 0) {
      let paths = Array.from(
        new Set(
          Object.keys(swaggerOutputFile.paths).map((path) => {
            // console.log("path",path.split('/')[1])
            return path.split("/")[1];
          })
        )
      );
      console.log("paths", paths);
      for (const path of paths) {
        let controllerName = path.split("/")[0];
        let regexPattern = new RegExp(path, "i");
        const matchingKeys = Object.keys(swaggerOutputFile.paths).filter(
          (key) => regexPattern.test(key.split("/")[1])
        );
        //   console.log("matching keys",matchingKeys)
        for (const key of matchingKeys) {
          let requestType = Object.keys(swaggerOutputFile.paths[key])[0];
          swaggerOutputFile.paths[key][requestType].tags = [
            controllerName == "" ? "default" : path,
          ];
          for (const schema of schemaArray) {
            let modelRegex = new RegExp(controllerName, "i");

            // console.log("modelRegex",modelRegex," ",schema.model,"Test", modelRegex.test(schema.model))
            if (
              modelRegex.test(schema.model) &&
              (requestType === "post" || requestType === "put")
            ) {
              console.log("your model",modelRegex,"your name",controllerName)
              let schemaObj = JSON.parse(JSON.stringify(schema));
              delete schemaObj.model;
              schemaObj = Object.keys(schemaObj);
              schemaObj = schemaObj.reduce((acc, key) => {
                acc[key] = {
                  example: "any",
                };
                return acc;
              }, {});
              swaggerOutputFile.paths[key][requestType].parameters = [
                {
                  name: "body",
                  in: "body",
                  schema: {
                    type: "object",
                    properties: schemaObj,
                  },
                },
              ];
            }
          }
        }
      }
      if (FileHandler.fileExists(swaggerOutputFilePath)) {
           await FileHandler.writeFile(swaggerOutputFilePath, JSON.stringify(swaggerOutputFile));
      }
    }
  }
}

module.exports = new SwaggerHandler();

declare module "serverless-http" {
  import type { Application } from "express";
  import type { Handler } from "aws-lambda";

  function serverless(app: Application): Handler;

  export = serverless;
} 
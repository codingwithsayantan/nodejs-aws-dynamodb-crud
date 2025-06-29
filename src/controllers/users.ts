import { Request, Response, NextFunction } from "express";
import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

import CustomError from "../error/customError.js";
import CONST from "../config/consts.js";

// Configuration for DynamoDB client
const config = {
  region: CONST.AWS.awsRegion,
  credentials: {
    accessKeyId: CONST.AWS.awsAccessKeyID || "dummy",
    secretAccessKey: CONST.AWS.awsSecretAccessKey || "dummy",
  },
};

// Create a new DynamoDB client instance
const client = new DynamoDBClient(config);

// Function to handle POST requests to create a user in DynamoDB
const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, fcm_token } = req.body;

    // Validate required fields
    if (!email || !name || !fcm_token) {
      throw new CustomError(400, "Missing required fields");
    }

    // Params for the PutItem command
    const params = {
      TableName: CONST.DYNAMODB.tableNameUsers,
      Item: {
        user_email: { S: email },
        user_name: { S: name },
        user_fcm_token: { S: fcm_token },
      },
    };

    // Send the PutItem command to DynamoDB to create a new user
    const result = await client.send(new PutItemCommand(params));

    console.log("PutItem succeeded:", result);

    // Check if the item was created successfully
    if (result.$metadata.httpStatusCode !== 200) {
      throw new CustomError(500, "Failed to create user");
    }

    res.status(200).send({ message: "User created successfully" });
    return;
  } catch (err) {
    next(err);
  }
};

// Function to handle GET requests fto fetch a user by email
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;

    // Validate required fields
    if (!email) {
      throw new CustomError(400, "Missing required fields");
    }

    // Params for the PutItem command
    const params = {
      TableName: CONST.DYNAMODB.tableNameUsers,
      Key: {
        user_email: { S: email },
      },
    };

    // Send the GetItemCommand command to DynamoDB to fetch a user
    const result = await client.send(new GetItemCommand(params));

    console.log("GetItemCommand succeeded:", result);

    // Check if the item was created successfully
    if (!result.Item) {
      throw new CustomError(404, "User not found");
    }

    res
      .status(200)
      .send({ message: "User fetched successfully", user: result.Item });
    return;
  } catch (err) {
    next(err);
  }
};

// Functions to handle DELETE requests to delete a user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;

    // Validate required fields
    if (!email) {
      throw new CustomError(400, "Missing required fields");
    }

    // Params for the PutItem command
    const params = {
      TableName: CONST.DYNAMODB.tableNameUsers,
      Key: {
        user_email: { S: email },
      },
    };

    // Send the DeleteItemCommand command to DynamoDB to delete a user
    const result = await client.send(new DeleteItemCommand(params));

    console.log("DeleteItemCommand succeeded:", result);

    // Check if the item was deleted successfully
    if (result.$metadata.httpStatusCode !== 200) {
      throw new CustomError(500, "Failed to delete user");
    }

    res.status(200).send({ message: "User deleted successfully" });
    return;
  } catch (err) {
    next(err);
  }
};

export { postUser, getUser, deleteUser };

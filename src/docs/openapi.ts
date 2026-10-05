const userProperties = {
  id: { type: "string", format: "uuid" },
  name: { type: "string" },
  email: { type: "string" },
  phoneNumber: { type: "string" },
  password: {
    type: "string",
    description: "Stored password hash.",
  },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const accountSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    currency: { type: "string", enum: ["VND", "USD"], example: "VND" },
    userId: { type: "string", format: "uuid" },
  },
};

const userSchema = {
  type: "object",
  properties: userProperties,
};

const userWithAccountSchema = {
  type: "object",
  properties: {
    ...userProperties,
    account: accountSchema,
  },
};

const jobSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    data: { type: "object", additionalProperties: true },
    action: {
      type: "string",
      enum: ["image.resize", "nft.mint", "transaction.transfer"],
    },
    status: {
      type: "string",
      enum: ["pending", "processing", "completed", "failed"],
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const entrySchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    transactionId: { type: "string", format: "uuid" },
    accountId: { type: "string", format: "uuid" },
    amount: { type: "string", example: "100000" },
    role: { type: "string", enum: ["sender", "receiver"] },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const envelope = (data: object, code: number) => ({
  type: "object",
  required: ["data", "msg", "code"],
  properties: {
    data,
    msg: { type: "string", example: "OK" },
    code: { type: "integer", example: code },
  },
});

const errorEnvelope = envelope(
  {
    type: "object",
    properties: {
      reason: { type: "string" },
    },
  },
  400,
);

const validationError = {
  type: "object",
  properties: {
    status: { type: "boolean", example: false },
    message: { type: "string", example: "Failed to parse data" },
    errors: {
      type: "array",
      items: { type: "string" },
    },
  },
};

const jsonQuery = (description: string, example: string, required = false) => ({
  name: "options",
  in: "query",
  required,
  description,
  schema: {
    type: "string",
    example,
  },
});

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Backend API",
    version: "1.0.0",
    description:
      "HTTP API for users, accounts, transfers, and background jobs. WebSocket events are not documented here.",
  },
  servers: [
    {
      url: "/",
      description: "Current server",
    },
  ],
  tags: [
    { name: "Health", description: "Service availability" },
    { name: "Auth", description: "Login and logout" },
    { name: "Users", description: "User accounts" },
    { name: "Accounts", description: "Wallet accounts" },
    { name: "Transactions", description: "Transfers and history" },
    { name: "Jobs", description: "Background job status" },
  ],
  components: {
    securitySchemes: {
      xToken: {
        type: "apiKey",
        in: "header",
        name: "x-token",
        description:
          "Access token returned as authenToken from POST /auth/login.",
      },
    },
    schemas: {
      User: userSchema,
      UserWithAccount: userWithAccountSchema,
      Account: accountSchema,
      Job: jobSchema,
      Entry: entrySchema,
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Server is live",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "true" },
                      message: { type: "string", example: "Server is live!" },
                    },
                  },
                  200,
                ),
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in",
        description:
          "Checks phone number and password, then returns the user (without the password), an access token, and a refresh token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["phoneNumber", "password"],
                properties: {
                  phoneNumber: { type: "string", example: "0773171202" },
                  password: { type: "string", example: "123456789" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Authenticated",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      name: { type: "string" },
                      email: { type: "string" },
                      phoneNumber: { type: "string" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                      account: { $ref: "#/components/schemas/Account" },
                      authenToken: { type: "string" },
                      refeshToken: { type: "string" },
                    },
                  },
                  200,
                ),
              },
            },
          },
          "400": {
            description: "Request body failed validation",
            content: {
              "application/json": { schema: validationError },
            },
          },
          "500": {
            description: "Invalid credentials or server error",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out",
        description:
          "Blacklists the access token and removes the stored refresh token.",
        security: [{ xToken: [] }],
        responses: {
          "200": {
            description: "Logged out",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "successfull" },
                    },
                  },
                  200,
                ),
              },
            },
          },
          "400": {
            description: "Refresh token was not found",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
          "500": {
            description: "Missing or invalid access token, or server error",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
    },
    "/users": {
      post: {
        tags: ["Users"],
        summary: "Create a user",
        description:
          "Creates a user and a default VND account. Email is stored as an empty string.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "password", "phoneNumber"],
                properties: {
                  name: { type: "string", example: "Ada" },
                  password: { type: "string", example: "secret" },
                  phoneNumber: { type: "string", example: "0901234567" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
            content: {
              "application/json": {
                schema: envelope(
                  { $ref: "#/components/schemas/UserWithAccount" },
                  201,
                ),
              },
            },
          },
          "400": {
            description: "Request body failed validation, or create failed",
            content: {
              "application/json": {
                schema: {
                  oneOf: [validationError, errorEnvelope],
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Users"],
        summary: "List users",
        description:
          "Returns users matching a Prisma-style findMany options object. The options value is a JSON string.",
        parameters: [
          jsonQuery(
            'JSON string with where, and optional skip, take, and orderBy. Example: {"where":{},"skip":0,"take":20,"orderBy":{"createdAt":"desc"}}',
            '{"where":{},"take":20}',
            true,
          ),
        ],
        responses: {
          "200": {
            description: "Matching users",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                  200,
                ),
              },
            },
          },
          "500": {
            description: "options is missing or is not valid JSON",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/UserWithAccount" },
                    },
                  },
                  200,
                ),
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
          "400": {
            description: "Failed to load the user",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update a user",
        description:
          "Updates any provided fields. Omitted fields are left unchanged.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                  phoneNumber: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated user",
            content: {
              "application/json": {
                schema: envelope(
                  { $ref: "#/components/schemas/UserWithAccount" },
                  200,
                ),
              },
            },
          },
          "400": {
            description: "Update failed",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
    },
    "/accounts/{userId}": {
      get: {
        tags: ["Accounts"],
        summary: "Account placeholder",
        description: "Placeholder lookup by user id.",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Placeholder response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Account route" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/accounts/{accountId}/balance": {
      get: {
        tags: ["Accounts"],
        summary: "Get account balance",
        description:
          "Requires an access token. Loads the authenticated user's account, sums its ledger entries, and returns the balance formatted for the account currency.",
        security: [{ xToken: [] }],
        parameters: [
          {
            name: "accountId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Formatted balance",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      balance: { type: "string", example: "1,000,000" },
                    },
                  },
                  200,
                ),
              },
            },
          },
          "500": {
            description:
              "Missing or invalid access token, or the account was not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Account not found!" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/transactions": {
      post: {
        tags: ["Transactions"],
        summary: "Create a transfer",
        description:
          "Requires an access token. The sender is the authenticated user. Validates the transfer, then creates a background job with action transaction.transfer. Poll GET /jobs/{id} for status.",
        security: [{ xToken: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["toUserId", "amount"],
                properties: {
                  toUserId: {
                    type: "string",
                    format: "uuid",
                    example: "1d343fdb-e7d5-40f6-9631-e6659e067e96",
                  },
                  amount: { type: "number", example: 100000 },
                  currency: {
                    type: "string",
                    default: "VND",
                    example: "VND",
                  },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Transfer job created",
            content: {
              "application/json": {
                schema: envelope({ $ref: "#/components/schemas/Job" }, 200),
              },
            },
          },
          "400": {
            description: "Request body failed validation",
            content: {
              "application/json": { schema: validationError },
            },
          },
          "500": {
            description:
              "Missing or invalid access token, the transfer was rejected, or the job could not be created",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
    },
    "/transactions/users": {
      get: {
        tags: ["Transactions"],
        summary: "List the current user's ledger entries",
        description:
          "Returns entries for the authenticated user's account, newest first.",
        security: [{ xToken: [] }],
        parameters: [
          jsonQuery(
            'JSON string with page and limit. Example: {"page":1,"limit":10}. Defaults to page 1 and limit 10 when the parsed value is empty.',
            '{"page":1,"limit":10}',
          ),
        ],
        responses: {
          "200": {
            description: "Ledger entries",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "array",
                    items: { $ref: "#/components/schemas/Entry" },
                  },
                  200,
                ),
              },
            },
          },
          "500": {
            description: "Missing token, invalid options, or server error",
            content: {
              "application/json": { schema: errorEnvelope },
            },
          },
        },
      },
    },
    "/jobs/{id}": {
      get: {
        tags: ["Jobs"],
        summary: "Get a job",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Job found",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Job" },
                    },
                  },
                  200,
                ),
              },
            },
          },
          "500": {
            description: "Job could not be loaded",
            content: {
              "application/json": {
                schema: envelope(
                  {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Failed to get job" },
                      error: {},
                    },
                  },
                  500,
                ),
              },
            },
          },
        },
      },
    },
  },
};

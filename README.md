# WhatsApp Bridge

A simple backend service that lets you send WhatsApp messages through a REST API. It connects to your WhatsApp account using a QR code scan (just like WhatsApp Web), and then you can use the API to send messages programmatically. Behind the scenes, it uses Puppeteer to automate a headless Chrome browser running WhatsApp Web.

---

## What it does

- Connects to WhatsApp via QR code scan
- After the first QR scan, your session gets stored in `.wwebjs_auth/`.
- Exposes a REST API to send WhatsApp messages
- Validates phone numbers and message content before sending
- Has rate limiting built in (10 requests per minute)
- Handles errors gracefully with proper status codes

---

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd whatsapp-bridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill it in:

```bash
cp .env.example .env
```

Then open `.env` and set your values.

| Variable               | Required | Description                                      | Example              |
| ---------------------- | -------- | ------------------------------------------------ | -------------------- |
| `PORT`                 | ✅ Yes   | The port the server will run on                  | `5000`               |
| `RATE_LIMIT_WINDOW_MS` | ✅ Yes   | Time window for rate limiting in milliseconds    | `60000` (= 1 minute) |
| `RATE_LIMIT_MAX`       | ✅ Yes   | Max number of requests allowed per window per IP | `10`                 |

```env
PORT=5000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10
```

### 4. Start the dev server

```bash
npm run dev
```

### 5. Scan the QR code

When the server starts, a QR code will appear in your terminal. Open WhatsApp on your phone, go to **Linked Devices**, and scan that QR code. Once connected, you'll see `authenticated`, `WhatsApp ready!` in the terminal.

That's it — you're good to go!

---

## API Endpoints

Base URL: `http://localhost:PORT/api/v1`

### Send a WhatsApp Message

**POST** `/messages/send`

Sends a WhatsApp message to a phone number.

**Request Body:**

```json
{
  "phone": "8801915910291",
  "message": "Hello from the API!"
}
```

**Phone number rules:**

- Must be exactly 13 digits (including country code e.g., `88` for Bangladesh)
- Numbers only — no spaces, dashes, or `+` sign

**Success Response:**

```json
{
  "success": true,
  "status": 200,
  "message": "message sent from <from> to <to>, successfully"
}
```

**Error Responses:**

| Status | Reason                                          |
| ------ | ----------------------------------------------- |
| `400`  | Invalid phone number or missing fields          |
| `503`  | WhatsApp is not connected yet (scan QR first)   |
| `429`  | Too many requests — wait a minute and try again |
| `500`  | Something went wrong on the server              |

---

## Rate Limiting

The API allows **`RATE_LIMIT_MAX` requests per `RATE_LIMIT_WINDOW_MS` milliseconds** per IP address. If you go over that, you'll get a `429 Too Many Requests` response. The window resets automatically after the configured duration.

With the default values (`RATE_LIMIT_MAX=10`, `RATE_LIMIT_WINDOW_MS=60000`), that means 10 requests per minute.

---

### Rate Limit Test

**GET** `/messages/rate-limiting-test`

Just a simple endpoint to test if rate limiting is working. Hit it more than 10 times in a minute to see the `429` response kick in.

---

### Health Check

**GET** `/`

```json
{
  "message": "welcome to whatsapp-bridge backend"
}
```

---

## Running Tests

```bash
npm run test
```

Tests are written with Jest. There are two test files:

- `unit.test.ts` — tests the Zod validation schema (phone format, missing fields, etc.)
- `integration.test.ts` — integration tests for the message sending flow

---

## Project Structure

```
src/
├── app/
│   ├── config/
│   │   └── env.ts              # Loads and validates env variables
│   ├── error/
│   │   └── AppError.ts         # Custom error class
│   ├── middleware/
│   │   ├── globalErrorHandler.ts  # Catches all errors
│   │   ├── rateLimiter.ts         # 10 req/min limit
│   │   └── zodValidation.ts       # Request body validation
│   ├── module/
│   │   ├── message.controller.ts  # Route handlers
│   │   ├── message.routes.ts      # Express routes
│   │   ├── message.services.ts    # Business logic
│   │   └── message.validation.ts  # Zod schemas
│   └── wp-socket/
│       └── whatsapp.client.ts     # WhatsApp client setup
├── tests/
│   ├── unit.test.ts
│   └── integration.test.ts
├── app.ts                         # Express app setup
├── route.ts                       # Route aggregator
└── server.ts                      # Entry point
```

---

## A Few Things to Know

- **The phone number must be registered on WhatsApp.** If you try to send a message to a number that's not on WhatsApp, you'll get an error back.

- **Don't commit `.wwebjs_auth/` or `.env`.** Both are already in `.gitignore`. Keep them out of version control.

---

## Scalability Notes

- Rate limiting uses in-memory store for simplicity. For multi instance production deployment, need to replace with Redis

---

## Tech Stack

- [Express.js](https://expressjs.com/) — web framework
- [whatsapp-web.js](https://wwebjs.dev/) — WhatsApp client
- [Zod](https://zod.dev/) — request validation
- [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) — rate limiting
- [Socket.IO](https://socket.io/) — WebSocket support
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/) — testing

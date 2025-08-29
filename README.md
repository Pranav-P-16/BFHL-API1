# BFHL API

Simple serverless API for the BFHL assignment. Deploy to Vercel (or run locally).

## Route
POST /bfhl

## Request body
```json
{ "data": ["a","1","334","4","R","$"] }
```

## Response
JSON with fields:
- is_success (boolean)
- user_id (string) format: full_name_ddmmyyyy (full name lowercase, underscores)
- email (string)
- roll_number (string)
- odd_numbers (array of strings)
- even_numbers (array of strings)
- alphabets (array of uppercase strings)
- special_characters (array of strings)
- sum (string)
- concat_string (string)

## Environment variables (set in Vercel)
- FULL_NAME (e.g. `john_doe`)
- DOB (ddmmyyyy, e.g. `17091999`)
- EMAIL
- ROLL_NUMBER

If not set, defaults are used.

## Deploy
1. Push this repository to GitHub.
2. On Vercel, import the repo and set the environment variables listed above.
3. After deploy, use `https://<your-deployment>.vercel.app/bfhl` (POST).

## Local testing
To run locally:

1. Install dependencies:
```bash
npm install
```

2. Start:
```bash
npm start
```

The server will run at `http://localhost:3000/bfhl`.

## Examples (curl)
Example A:
```bash
curl -X POST 'https://<your-deploy>.vercel.app/bfhl' \
  -H 'Content-Type: application/json' \
  -d '{"data":["a","1","334","4","R","$"]}'
```

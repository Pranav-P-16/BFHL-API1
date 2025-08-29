# BFHL API

Simple serverless API for the BFHL assignment. Deploy to Vercel (or run locally).

## Hosted in vercel @
https://bfhl-api-1-git-main-pranav-ps-projects-edf35bd4.vercel.app/bfhl

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

## Examples (curl)
Example A:
```bash
curl -X POST 'https://<your-deploy>.vercel.app/bfhl' \
  -H 'Content-Type: application/json' \
  -d '{"data":["a","1","334","4","R","$"]}'
```

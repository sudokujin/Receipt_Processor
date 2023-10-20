# Receipt-Processor-Challenge
The project is written with JavaScript (node.js).
Tested endpoints with Postman.

## Overview

The Receipt Processor Challenge requires building a web service that processes receipt data and calculates reward points according to the given rules. The solution includes an Rest based API to process receipts, store them in memory, and provides an endpoint to retrieve reward points based on the receipt ID.

## API Specification

The solution follows the API specification provided in the challenge:

- **Endpoint: Process Receipts**
  - Path: `/receipts/process`
  - Method: POST
  - Payload: Receipt JSON
  - Response: JSON containing an ID for the receipt.
  - Example: {"id": "f06c6c2b-5857-4e66-b2d5-50ecbac06338"}

- **Endpoint: Get Points**
  - Path: `/receipts/{id}/points`
  - Method: GET
  - Response: A JSON object containing the number of points awarded.
  - Example: {"points": 109}

## Setup and Running
1. Clone the repository to your local machine
2. In order to run the app, use docker command: **docker build -t receipt-processor .**
3. Then, run the docker container **docker run -p 3000:3000 receipt-processor**
4. The application should be running on http://localhost:3000
5. Now, a POST request can be made (with tools like Postman) to **http://localhost:3000/receipts/process** with the receipts data in the request body
![Alt text](<Screen Shot 2023-10-19 at 7.34.56 PM.png>)
6. After getting the id, a GET request can be made to **http://localhost:3000/receipts/{id}/points** to get the points for a receipt id
![Alt text](<Screen Shot 2023-10-19 at 7.35.10 PM.png>)

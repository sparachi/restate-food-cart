# Restate Food Cart

A simple example of a food ordering app with **durable execution** using [Restate](https://restate.dev).



## Usage
1. Install dependencies:
   ```bash
   npm install
   ```

2. In `package.json` there are individual commands to run `npm run foodCart` or `npm run restaurant` 
If you prefer run all services at once using `npm run dev`

3. Follow the [instructions](https://docs.restate.dev/get_started/quickstart) to setup `restate` server locally.

4. Once restate server is running, register the deployments in the admin UI.

### To view xstate machine in VS Code

1. Install the `XState VSCode` extension from statelyai


### Postman Collection to test the changes
Import the collection `rvajs demo.postman_collection.json` to your postman app to test the changes.

### FoodCart Virtual Object
- Add items
```
curl --location 'http://127.0.0.1:8080/FoodCart/user1/add' \
--header 'Content-Type: application/json' \
--data '{
    "id": "item-001",
    "name": "pizza",
    "quantity": 1
}'
```
- Remove items
```
curl --location --request POST 'http://127.0.0.1:8080/FoodCart/user1/remove'
```
- Get all items
```
curl --location --request POST 'http://127.0.0.1:8080/FoodCart/user1/getCartItems'
```

### Restaurant Service
- Confirm Order
```
curl --location 'http://127.0.0.1:8080/Restaurant/confirmOrder' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user1",
    "creditCard": "1234567890123456",
    "foodItems": [
        {
            "id": "item-001",
            "name": "pizza",
            "quantity": 1
        }
    ]
}'
```
- Handover Food items
```
curl --location 'http://127.0.0.1:8080/Restaurant/pizzeria1/handOverFoodItems' \
--header 'Content-Type: application/json' \
--data '{
    
}'
```
### FoodOrderMachine
- Create Order
```
curl --location --request POST 'http://127.0.0.1:8080/FoodOrderStateMachine/test1/create'
```
- Confirm Order
```
curl --location 'http://127.0.0.1:8080/FoodOrderStateMachine/test/send' \
--header 'Content-Type: application/json' \
--data '{
    "event": {
        "type": "CONFIRM"
    }
}'
```
- NotifyCustomer
- Approve or reject
```
curl --location 'http://127.0.0.1:8080/FoodOrderStateMachine/test/send' \
--header 'Content-Type: application/json' \
--data '{
    "event": {
        "type": "REJECTED"
    }
}'
```

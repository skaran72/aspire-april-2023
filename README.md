# aspire-april-2023


## Instructions to run the app, locally:

1. `npm install`
2. `npm run dev`

```
> aspire-take-home-assignment@1.0.0 dev
> ts-node-dev --respawn --pretty --transpile-only src/index.ts

[INFO] 20:42:45 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.0.3)
3001
Listening on port 3001
```

Sample request curl:
```
curl --request POST \
  --url http://localhost:3001/api/v1/generate-mutation \
  --header 'Content-Type: application/json' \
  --data '{
        "document": {
            "_id": 1,
            "name": "Johnny Content Creator",
            "humans": [
                {
                    "_id": 2,
                    "value": "one",
                    "mentions": []
                },
                {
                    "_id": 3,
                    "value": "two",
                    "mentions": [
                        {
                            "_id": 5,
                            "text": "apple"
                        },
                        {
                            "_id": 6,
                            "text": "orange"
                        }
                    ]
                },
                {
                    "_id": 4,
                    "value": "three",
                    "mentions": []
                },
                {
                    "_id": 7,
                    "value": "four",
                    "mentions": [
                        {
                            "_id": 8,
                            "text": "plum"
                        },
                        {
                            "_id": 9,
                            "text": "avocado"
                        },
                        {
                            "_id": 10,
                            "text": "grapes"
                        }
                    ]
                }
            ]
        },
        "mutation": {
            "humans": [
                { "_id": 3, "value": "too" },
								{ "_id": 3, "mentions": {"_id": 5, "text": "mango"} },
								{ "_id": 3, "value": "too", "_delete": true }
            ]
        }
    }
  
```


## Improvements:
1. Current logic only supports 1 mutation of each type in 1 request, We can add logic to the service method to in case the mutation input has more than 1 
mutation of the same type e.g add, update or remove
2. We can add more unit test cases for individual util and operations methods.
3. Tests can include e2e test with http request and corresponding response types

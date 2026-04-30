import json

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Day 1 API working"
            "received": event
          
        })
    }

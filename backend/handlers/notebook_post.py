import json

def notepad_post(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Day 1 API working"
            "received": event
          
        })
    }

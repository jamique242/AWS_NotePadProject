import json
import uuid
import os
import boto3
from datetime import datetime

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])

def notepad_post(event, context):
    body = json.loads(event.get("body", "{}"))

    item = {
        "note_id": str(uuid.uuid4()),
        "content": body.get("content"),
        "created_at": datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)

    return {
        "statusCode": 200,
        "body": json.dumps(item)
    }

import json

def notepad_update(event, context):

    note_id = event["pathParameters"]["id"]

    body = json.loads(event.get("body", "{}"))

    updated_note = {
        "note_id": note_id,
        "content": body.get("content"),
        "message": "Note updated successfully"
    }

    return {
        "statusCode": 200,
        "body": json.dumps(updated_note)
    }

def notepad_delete(event, context):

    note_id = event["pathParameters"]["id"]

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": f"Note {note_id} deleted successfully"
        })
    }

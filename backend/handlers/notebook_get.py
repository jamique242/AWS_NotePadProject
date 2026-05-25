import json

def notepad_get(event, context):

    notes = [
        {
            "note_id": "1",
            "content": "First mock note"
        },
        {
            "note_id": "2",
            "content": "Second mock note"
        }
    ]

    return {
        "statusCode": 200,
        "body": json.dumps(notes)
    }

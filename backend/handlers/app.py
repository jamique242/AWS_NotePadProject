import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notebook')


def lambda_handler(event, context):
    method = event['requestContext']['http']['method']
    if method == 'GET':
        #note_id = event['pathParameters']['id']
        response = table.scan()
        items = response['Items']
        items.sort(key=lambda item: item.get('created_at') or item.get('updated_at'), reverse=True)
        return {
            'statusCode': 200,
            # "headers": {
            #             "Access-Control-Allow-Origin": "*",
            #             "Access-Control-Allow-Headers": "*",
            #             "Access-Control-Allow-Methods": "*"
            #         },
            'body': json.dumps(items)
        }
    elif method == 'POST':
        if 'body' not in event:
            return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'bad request ❌'})
                }
        note = json.loads(event['body'])
        note['noteId'] = str(uuid.uuid4())
        note['created_at'] = datetime.now().isoformat()
        if 'title' not in note or 'note' not in note:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'message': 'Missing required fields ❌'
                })
            }
        table.put_item(Item=note)
        return {
            'statusCode': 201,
            'body': json.dumps(
                {
                    'message':'Note posted ✅',
                    'title': note['title'],
                    'note': note['note']
        })
        }
    elif method == 'PUT':
        if 'body' not in event:
            return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'bad request ❌'})
                }
        updated_note = json.loads(event['body'])
        updated_note['updated_at'] = datetime.now().isoformat()
        note_id = event['pathParameters']['id']
        table.update_item(
            Key={'noteId': note_id},
            UpdateExpression = '''
            SET note = :n,
            title = :t,
            updated_at = :u
            ''',
            ExpressionAttributeValues = {
                ':t': updated_note['title'],
                ':n': updated_note['note'],
                ':u': updated_note['updated_at']
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps(
                {
                    'message':'Note updated ✅',
                    'title': updated_note['title'],
                    'note': updated_note['note']
        })
        }
    elif method == 'DELETE':
        note_id = event['pathParameters']['id']
        if note_id is None:
            return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'bad request ❌ - note_id doesnt exist'})
                }
        note = table.get_item(
            Key={
                'noteId': note_id
            }
        )
        table.delete_item(
            Key={
                'noteId': note_id
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps(
                {
                    'message':'Note deleted 🗑️',
                    'note': note['Item']
        })
        }

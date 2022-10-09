import json

def lambda_handler(event, context):
    # TODO implement
    
    #using event['keyword'] threw an internal server error...I'm done.
    
    return {
        'statusCode': 200,
        'body': json.dumps('John Taylor says ...') #tried using event['keyword'] here and it didnt work :(
    }

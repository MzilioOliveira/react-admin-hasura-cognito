## Work in Progress

- follow the integration between hasura and cognito in https://hasura.io/docs/latest/graphql/core/guides/integrations/aws-cognito.html
- client settings: disable generate secret key client ```https://localhost:3000/cognito-callback``` ```https//localhost:3000/logout```
- up hasura https with ngrok http 8080 to use the link on lambda
- the lambdas:

```javascript
exports.handler = (event, context, callback) => {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        "https://hasura.io/jwt/claims": JSON.stringify({
          "x-hasura-user-id": event.request.userAttributes.sub,
          "x-hasura-default-role": "admin",
          // do some custom logic to decide allowed roles
          "x-hasura-allowed-roles": ["admin"],
        }),
      },
    },
  };
  callback(null, event);
};
```

```javascript
const https = require("https");

exports.handler = async (event, context, callback) => {
  const userId = event.userName;
  const hasuraAdminSecret = "";
  const url = "https url hasura endpoint";
  const upsertUserQuery = `
    mutation($userId: String!){
      insert_users(objects: [{ id: $userId }], on_conflict: { constraint: users_pkey, update_columns: [] }) {
        affected_rows
      }
    }`;
  const graphqlReq = { query: upsertUserQuery, variables: { userId: userId } };

  https.post(
    {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": hasuraAdminSecret,
      },
      url: url,
      body: JSON.stringify(graphqlReq),
    },
    function (error, response, body) {
      callback(null, response, context);
    }
  );
};
```
- after that create a user in your cognito pool, then set the password permanently using aws-cli:

```
aws --profile <profile> cognito-idp admin-set-user-password --user-pool-id <user-pool-id> --username <username> --password <password> --permanent
```
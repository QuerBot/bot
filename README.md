# QuerBot

Analyzing Twitter Acocunts from specific bubbles

## Using Twitter API

We are using the npm package `twitter-api-v2`

### ToDos

#### Cron Logic

Iterare through mentions and save mentions in db (`tweet.service.js`), so child-bots can grab them from db

#### Cache Logic

Make sure rate limits and next-tokens are always up to date with the current one so we don't run into errors from the `twitter-api`.

#### Cache Service

(If needed): Functions to interact with the cache.

#### Tweet Service

Should be outsourced to the child bot.

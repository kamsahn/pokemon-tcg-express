# Pokemon TCG Deck Builder Back End

![github image](https://i.imgur.com/wTsBind.png)

The PokeDeck Builder app is a deck builder for the Pokemon TCG, specifically generations 1 and 2 (before Wizards of the Coast sold to Nintendo). Users can sign up to CRUD decks with cards from the selected sets of cards. The app is made with React and a mobile-first mind set. This is a simple-to-use app for nostalgic Pokemon card players.

## Links

Deployed Client: https://kamsahn.github.io/pokemon-tcg-react

Client Repo: https://github.com/kamsahn/pokemon-tcg-react

Deployed API: https://pokemon-deckbuilder.herokuapp.com

## Technologies Used

- JavaScript
- React
- CSS/SCSS
- Express
- MongoDB
- Mongoose
- Node

## Unsolved Problems / Future Plans

- [] Styling and user experience upgrade
- [] Deck copying for smaller edits
- [] Hand draw simulator for testing deck viability
- [x] 60 card deck limit
- [x] 4 of a kind rule for cards (excluding energy cards)
- [] Win/lose counter for deck resource
- [] Have a current deck, making adding cards more seemless
- [] Advanced search filters

## The Story

Well before I started development, I sought out a deck builder app for Pokemon TCG (unsuccessfully). Me and my friends were rapidly building, playing and breaking apart new deck concepts. We ran into the problem of not remembering a build that we liked and having to piece it back together on memory. Enter Pokemon TCG deck builder app (working title PokeDeck Builder).

### Planning

There were several initial issues when laying out the app for planning including:

- Where to get the card information from
- How to organize the database
- How to display cards/decks for the user

Through some research, I managed to find an opensource [Pokemon TCG API](https://pokemontcg.io/) that solved my issue of where to find the card information. As for the database, I decided to run with Express, Node and MongoDB. I figured start up time for my backend would be very quick and scalling up for future features would be more seemless. I decided to make some document "relationships" with the Mongoose [populate method](https://mongoosejs.com/docs/populate.html), leveraging SQL functionality in a noSQL database. Finally, I decided to let users search by name or by set to begin with, leaving advanced search filters for later. I wanted cards to be listed out vertically (as to be mobile friendly) and to be easy enough to click into and add to user decks. I decided to use React to quickly and efficiently display information relevent to the current component. I also used React Router to give my SPA a navigational feel for enhanced UX.

### Process

After creating user stories and mapping out my tech stack and database, I started the project in earnest. Early days of development included testing out the 3rd party API. Once I had read through documentation and tested with curl, I moved into creating my back end. Because of my experience with Express and the nature of the framework, it was easy to spin up a skeleton version of my custom API. I made very basic user, deck and card resources, tested them and deployed a beta version. Finally, I moved to the client using React. This being my first project using React, I was sure to be methodical about my approach, but soon found the framework to be very intitive. I found it easy to manage my time with the natural break points of React's components. Once I built and tested a beta client, I deployed and tested for a minimum viable product. Once I was satisfied, I jumped into feature addition, which was particularly exciting as this was an app that I was excited to use.

### Problem Solving

Though the process was largely smooth, it was not without it's issues. I ran into a few snags when talking to two different API's, using a new framework (React), and upgrading my back end part way through development. Whenever the app behaved in error (which happened plenty in develpoment) I would stop progress and try to debug from the root, starting from component mounting and following the life cylce events on the front end or from model to routes on the back end. Reading terminal errors and console error messages typically got me to the root of the problem easily. If that was not enough, Google and Stack Overflow typically yielding good results for strange errors. If all else failed, I had a few senior team members to take questions to, where I could voice my concerns and receive guidance to lead me to a solution. All in all, the parts that went poorly were just as helpful to learning as the parts that went well.

## Entity Relationship Diagram

![github image](https://i.imgur.com/5pzYs9m.jpg)

## API

Scripts are included in [`curl-scripts`](curl-scripts) to test built-in actions.

### Authentication

| Verb   | URI Pattern            | Controller#Action             |
|--------|------------------------|-------------------------------|
| POST   | `/sign-up`             | `users.post/sign-up`          |
| POST   | `/sign-in`             | `users.post/sign-in`          |
| PATCH  | `/change-password`     | `users.patch/change-password` |
| DELETE | `/sign-out`            | `users.delete/sign-out`       |

#### POST /sign-up

Request:

```sh
curl https://pokemon-deckbuilder.herokuapp.com/sign-up \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'
```

```sh
EMAIL=ava@bob.com PASSWORD=hannah curl-scripts/auth/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "ava@bob.com"
  }
}
```

#### POST /sign-in

Request:

```sh
curl https://pokemon-deckbuilder.herokuapp.com/sign-in \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'
```

```sh
EMAIL=ava@bob.com PASSWORD=hannah curl-scripts/auth/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "ava@bob.com",
    "token": "BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f"
  }
}
```

#### PATCH /change-password

Request:

```sh
curl --include --request PATCH "https://pokemon-deckbuilder.herokuapp.com/change-password" \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'
```

```sh
OLDPW='hannah' NEWPW='elle' TOKEN='BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f' sh curl-scripts/auth/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out

Request:

```sh
curl https://pokemon-deckbuilder.herokuapp.com/sign-out \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN='BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f' sh curl-scripts/auth/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```


### Deck
| Verb    | URI Pattern           | Route Action      |
|---------|-----------------------|-------------------|
| POST    | `/decks`              | `create`          |
| GET     | `/decks`              | `decks#index`     |
| GET     | `/decks/:id`          | `decks#show`      |
| PATCH   | `/decks/:id`          | `decks#update`    |
| DELETE  | `/decks/:id`          | `decks#destroy`   |

#### POST /decks
Request:

```sh
curl "https://pokemon-deckbuilder.herokuapp.com/decks" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "deck": {
      "title": "'"${TITLE}"'"
    }
  }'
```

#### GET /decks
Request:
```sh
curl "https://pokemon-deckbuilder.herokuapp.com/decks" \
  --include \
  --request GET \
  ```

#### GET /decks/:id
Request:
```sh
curl "https://pokemon-deckbuilder.herokuapp.com/decks/${ID}" \
  --include \
  --request GET \
  ```

#### PATCH /decks/:id
Request:
```sh
curl "https://pokemon-deckbuilder.herokuapp.com/decks/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "deck": {
      "title": "'"${TITLE}"'"
    }
  }'
```

#### DELETE  /decks/:id
Request:
```sh
curl "https://pokemon-deckbuilder.herokuapp.com/decks/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request DELETE \
```

### cards
| Verb    | URI Pattern           | Route Action                 |
|---------|-----------------------|------------------------------|
| POST    | `/cards`              | `router.create(/cards)`      |
| DELETE  | `/cards/:id`          | `router.delete(/cards/:id)`  |


#### POST /cards
Request:

```sh
curl "https://pokemon-deckbuilder.herokuapp.com/cards" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "name": "'"${NAME}"'"
    }
  }'
```

#### DELETE  /cards/:id
Request:
```sh
curl "https://pokemon-deckbuilder.herokuapp.com/cards/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request DELETE \
```

## Back End Installation Guide

Most easily, the deck builder API can be accessed through it's [client](https://kamsahn.github.io/pokemon-tcg-react) in your favorite web browser. If you want to run this locally, fork and clone this repo and in your terminal run `npm run start`. You will have to sign up/in to access the database with the following commands:

```
EMAIL=ash@ash PASSWORD=ash sh curl-scripts/auth/sign-up.sh
```

```
EMAIL=ash@ash PASSWORD=ash sh curl-scripts/auth/sign-in.sh
```

WARNING! this is a toy application and the data you send to the API will NOT be private. Do not use any real emails or passwords for authentication.

Once signed in, use the user TOKEN to CRUD decks and create/destroy cards

```
TOKEN=<unique-user-token-for-ash> TITLE='All Water' sh curl-scripts/decks/create.sh
```

```
TOKEN=<unique-user-token-for-ash> NAME='Blastoise' DECK=<unique-deck-id-for-All-Water> sh curl-scripts/card/create.sh
```

```
TOKEN=<unique-user-token-for-ash> ID=<unique-deck-id-for-All-Water> sh curl-scripts/decks/show.sh
```

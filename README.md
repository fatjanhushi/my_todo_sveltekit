# To-Do app in Sveltekit

I built this todo app to try sveltekit and I loved it.
My goal was to create a full stack app with login a system using SvelteKit and mongoDB for persistence.

> Demo: https://todo-sveltekit.herokuapp.com/

It uses cookie authentication. A Cookie for every user is stored on the MongoDb Atlas DB platform. User passwords are encrypted. Each user can see only his todo's. Every time user logs in, the cookie is updated on the db so you can not log in on multiple devices simultaneusly. Routes are protected if you are not logged in.

Feel free to clone this app or if you find any issues or if you can improve it, create a pull request.

> ISSUE note: I don't know if it is a problem with sveltekit at the monent, since it's still in beta, but everytime a todo is added from the /todos page it seems that the index is lost and if you update the todo it doesn't work. If you refresh the page everything works ok.

## Run this app

You need to provide your own MONGODB_URI and DB_NAME enviroment variables using .env file:

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building for production

To create a production version of your app:

```bash
npm run build
```

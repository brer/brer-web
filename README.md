# BRER

## Welcome to Brer front-end application [brer-web]

This repository contains the Brer front-end application and related libraries developed by the Evologi team.

## Fist steps

### Environment variables

It's necessary to create a `.env` file at the root of the project with two variables.<br>
Without these variables the application <b>will not work properly</b>.

| Name                | Description                                                    | Default |
| ------------------- | -------------------------------------------------------------- | ------- |
| NEXT_PUBLIC_API_URL | The public web url of Brer instance                            | -       |
| NEXT_LOCALHOST      | Indicates if the application is working in a local environment | TRUE    |

<br>

> N.B. for local development it's required to run brer backend too.

<br>

### Install dependencies

Run the following command to install the few dependencies of the application:

```
npm i
```

### Run the project

And finally, the following command will start the application in development mode. It'll available at the url `http://localhost:3000`.

```
npm run dev
```

Enjoy it!

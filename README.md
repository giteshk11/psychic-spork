# Quasar App (aspire-task)

A Quasar Project

## Application Hosted at

[https://634d542cbdabef2b3df4fea9--lively-halva-a645b7.netlify.app/](https://634d542cbdabef2b3df4fea9--lively-halva-a645b7.netlify.app/)

## Overview

Created UI based on the sample design provided with the task. Using Quasar as the framework/css for building the UI

## **Features**

### Add new card:

- Click on new card to add a new card
- A modal/page will open where the user can add the card name and submit the new card the expiration date and card number.
- Card will be added to the local storage.
- The card will be appended in the carousel together with the other cards
- Note: Use 4111 1111 1111 1111 or any valid card number to add a card else it would result in validation error.

### Freeze/Unfreeze card

- On click of the freeze card the card will get the status of frozen
- The frozen card will look different as the opacity is decreased.
- The freeze button will change label in unfreeze for the frozen card
- Unfreeze card will unfreeze the button again

### Cancel card

- On click open a modal where a confirmation action is asked remove card from the list

## Framework/Packages used

- Vue 3
- Quasar
- Form validation using in-built quasar form validation
- keen-slider (for card slider)
- vite-svg-loader (for loading svg as components and manipulate)

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

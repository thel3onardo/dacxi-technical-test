# dacxi-technical-test

## Goal

This is a solution for the front-end technical test of Dacxi/Wealth99 company. My goal was to build a simple app which the user could see the current price of certain coins, using the CoinGecko API.

## Stack

- Vue 3
- Pinia
- TailwindCSS

## Comments

I enjoyed programming the idea of this project and trying to apply new things. I don't think I'm 100% satisfied with what was delivered because I had a certain problem regarding the deadline for delivery. Nevertheless, I tried to deliver the main functionalities and ensure that the main flows were functional.

I tried to stay as far away as possible from external UI libraries to demonstrate my skills by building components and integrating their functionalities from scratch, even if it cost me less time to integrate all the functionalities.

Regarding architecture, I tried to simplify as much as possible and reduce possible complexities that could arise. I centralized the API calls in a services folder, which could later be scalable as the project required. To centralize component information, I used Pinia (a state management library), which greatly simplifies the process and avoids prop drilling or other commonly known problems.

I felt it was a good option to use the following libraries:

- vue-sonner - To create very beautiful toasts that matched my design idea.
- iconify - To use a vast collection of icons in my project.
- fontsource - Used to use fonts in the project.

The design was entirely conceptualized and implemented by me. The idea, initially, was to have a very simple UI but with a modern atmosphere (to match the proposal of virtual currencies, etc.).

Initially, my idea was to deliver both unit tests and E2E tests. However, I didn't have enough time for that because, overall, I had just under 6 hours to create and finalize the project from scratch. However, I have knowledge in unit and integration tests and actively use them in professional code.

I am available to discuss the project and the decisions I made while creating it if you are interested. Thank you

## Running the project

In order to run the project in your machine, you will need to have the following dependencies installed in your machine:

- nodejs 20.11.0
- pnpm 8.15.4
- git

Now, follow the steps below:

### Clone the repo

```bash
git clone https://github.com/thel3onardo/defsafe-code-challenge
```

### Installing dependencies

After cloning the project, install the dependencies using:

```bash
pnpm install
```

### Open a dev server

After installing the dependencies, you can open a dev server and try the project yourself.

```bash
pnpm dev
```

### Building

If you want to build the project and see the results locally, you can execute the following pnpm commands:

```bash
pnpm build
pnpm preview
```

Found any problems? Feel free to open an issue in the project, or send me an email at leonardo.geral03@gmail.com

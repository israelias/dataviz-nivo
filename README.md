# Frontend Challenge 

[<div style="text-align:center"><img src="docs/radar_repooling.gif" width="800" alt="pokedex sample"/></div>](docs/radar_repooling.gif)

## Joem Elias Sanez

Development submission of PokeDex. Dashboard that dynamically animates a graph visualization as you scroll through the deck of data. The data exposes the varieties and relationships of weight/size to Combat Power/Hit Points of a given Pokemon. 

Mock Sign in with:
- `admin@admin.com`
- `admin`

## Branches

Development has been on-going on `lux-dev`, not having merged with `main` since submission.
A copy of the `main` branch from submission date has been forked to `lux-submission` with consideration to reviewing the state of the project at deadline. Recent progress in `lux-dev` has been merged to main to maintain docs and update deps.
## Production Feature Predicates
#### Pokedex `roledex` wheel

[<div style="text-align:center"><img src="docs/radar_one.gif" width="800" alt="pokedex sample"/></div>](docs/radar_one.gif)

#### Pagination Repooling
[<div style="text-align:center"><img src="docs/radar_selection.gif" width="800" alt="pokedex sample"/></div>](docs/radar_selection.gif)

## Development Feature Predicates

Currently in development, on `lux-dev` branch with a preview on vercel. Along with a production deployment on `main`. 

- Dev 
[lux-dev.vercel.app](https://lux-dev.vercel.app/)
- Prod
[lux-frontend.vercel.app](https://lux-frontend.vercel.app/)

#### Pokedex `roledex` wheel
- See [issue](https://gitlab.com/israelias/lux-frontend/-/issues/1) regarding Nivo's radar component.
- The graph on the right animates as one flips through the left deck in batches of at least 25 objects intersecting the screen.
- Works in dev better than prod, but buggy.

#### Pagination UI is disabled
- Please review the declarative approach to pagination on the client side, which, was lower on the MVP list given the `roledex` approach.
- The ambition was to pre-fetch static paths from the list of Pokemons, their slice in the finite array, and their slice's key to a static integer to `shallow-fetch` the url as the deck is spinning. The result is pagination reacting to animation without page refresh.
- Note: Still in development.

### Context API, In-Memory Cache and the Client
- Context API is used to provide in-memory storage and for another back-up cache under `apollo-client`. Authorization, ensuring `token`, in this case, justt `email`, can be passed down to fragments of the component tree as a resource for a feature or a security requirement.
- The signature auth try,-> fetch.then -> catch ---> finally chain works well in a provider but not in the case of this project. You will see that I was not able to provide a mock auth that at-least calls /api on the client side via `swr`. Thhis should `req`-`res` even on a mock, but presently still disabled.
- Note: Context Providers were not the most ideal choice in a NextJS environment, but it still adds considerable utility when reducing, slicing, referencing a constant from a fork of a source. The most visible benefit is never having undefined props from the top of the component tree.
- Note: The downside is that the data will refresh on Next unless it's shallow fetch. Regardless, somce combo in wordth considering.


- 

## Bugs
- Intersection observer is not pairing well with NextJS SSR. 
- useSWR config needs to be replaced with isomorphic-unfetch for auth (a mock is currently in place).
- ...tbc
 


### Brief

This is a frontend project that simulates a potential real-life designer hand-off that is given to a software engineer to implement. You have 24 hours to complete this challenge.

Your task is to implement the two Figma designs to spec, and integrate it with a real, public GraphQL api.

You are free to use any web-framework and technology, as long as the core frontend stack is based on React.

We recommend highlighting these skills if you have familiarity with it, however this is optional and not necessary. Usage of these libraries will not impact the scoring of our code-review:
- Next.js or CRA
- Typescript
- CSS-in-JS (styled-components, emotion, etc.)
- Tailwind CSS
- XState

## Task Description
You are building two very simple flows. The first is a login page. 
This login page will simply check static credentials (e.g. admin/admin) which if work, should redirect the user to the main page. 
DO NOT build a full auth system for this. We do not expect you to build a backend.

When reviewing the login page, we are looking for an understanding of:
- Ability to create forms
- Ability to implement the various form states (field validation, error, success etc)
- Ability to implement style to spec
- Responsiveness

After the login page, you will be dropped into a "Pokedex", a simply dashboard that renders a list of Pokemon. When a Pokemon is selected, the selected Pokemon shows up on the right side with more details.

You will notice that in the selected section, only the header is designed for you. You have free autonomy over how to design the details section, and you are encouraged to implement the details page yourself.

You will be judged for an understanding of:
- Ability to use Graphql correctly
- Ability to integrate a real API
- Ability to implement a pagination API
- Clean-code and seperation of component concerns
- Ability to design new UIs

## Figma Link
https://www.figma.com/file/lv57Aog6JVWqWJH4STVKeL/frontend-challenge?node-id=0%3A1

## Graphql API
https://graphql-pokemon2.vercel.app/

Example query:
```graphql
{
  pokemons(first: 10) {
    id
    number
    name
    image
    classification
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
  }
}
```


# Deployment


## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-typescript)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

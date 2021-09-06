[[hiring]] [[luxor]]

# Frontend Challenge

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

import { range } from '../utils/array';

//TODO Option to getStaticProps and attach page props to segments of static, pre-fetched pokemons

export default [
  {
    x: 1,
    first: 25,
    limit: range(0, 26),
  },
  {
    x: 2,
    first: 50,
    limit: range(25, 51),
  },
  {
    x: 3,
    first: 75,
    limit: range(50, 76),
  },
  {
    x: 4,
    first: 100,
    limit: range(75, 101),
  },
  {
    x: 5,
    first: 125,
    limit: range(100, 126),
  },
  {
    x: 6,
    first: 150,
    limit: range(125, 151),
  },
];

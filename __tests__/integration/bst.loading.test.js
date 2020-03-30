const faker = require('faker');
const BST = require('../../src/BST');

const MAX = 1000000;

describe('comom tests', () => {
  const bst = new BST();

  it('case one', () => {
    for (let i = 0; i < MAX; ++i) {
      const key = faker.random.uuid();
      const point = { lat: faker.random.number(), lon: faker.random.number() };
      const velocity = faker.random.number();
      bst.put(key, { point, velocity });
    }
    expect(bst.check()).toBe(true);
  });
});

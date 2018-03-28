const getNow = require('./getNow');

test('return defined', () => {
  expect(getNow()).toBeDefined();
})
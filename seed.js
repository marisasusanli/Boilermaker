const { green, red } = require('chalk');
const { db, Puppy } = require('./server/db');

const puppies = [
  { name: 'Lucky', age: 1 },
  { name: 'Spot', age: 2 },
  { name: 'Rocko', age: 1 },
  { name: 'Fuzzy', age: 2 },
  { name: 'Oscar', age: 3 },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      puppies.map((puppy) => {
        return Puppy.create(puppy);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}

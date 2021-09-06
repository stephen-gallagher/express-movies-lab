const mongoose = require('mongoose');

const Celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/express-movies');

const celebrities = [
  {
    name: 'Jeffrey Hitchcock',
    occupation: 'Wizard',
    catchPhrase: 'You better watch out or I will do a spell',
  },
  {
    name: 'Mary Mendez',
    occupation: 'Celebrity Animal Medium',
    catchPhrase: 'I know what your dead goldfish really thinks about you',
  },
  {
    name: 'Samantha Chipper',
    occupation: 'Furniture Impersonator',
    catchPhrase: 'Im not actually a couch, im Samantha',
  },
];

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(
      `Success - ${celebrities.length} celebs seeded to the database`
    );
  })
  .catch((err) => {
    console.log(err);
  });

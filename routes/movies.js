const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');
const { populate } = require('../models/movie');

const router = require('express').Router();

router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then((celebrityFromDB) => {
    // console.log(celebrityFromDB);
    res.render('movies/new', { celebrities: celebrityFromDB });
  });
});

router.post('/movies', (req, res, next) => {
  //   console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then((createdMovie) => {
      res.redirect(`movies/${createdMovie._id}`);
    })
    .catch((err) => next(err));
});

router.get('/movies', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render('movies/index', { movies: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((movieFromDB) => {
      //   console.log(movieFromDB);
      res.render('movies/show', { movie: movieFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate('cast')
    .then((movieFromDB) => {
      Celebrity.find().then((celebritiesFromDB) => {
        let list = '';
        for (let celebrity of celebritiesFromDB) {
          let castArrayToCheck = movieFromDB.cast.map(
            (element) => element.name
          );

          castArrayToCheck.includes(celebrity.name)
            ? (list += `<option value="celebrity.name" selected>
                  ${celebrity.name}
                </option>`)
            : (list += `<option value="celebrity.name">
                  ${celebrity.name}
                 </option>`);
        }
        console.log('these are the selected celebrities', list);

        // console.log('this is the movie', movieFromDB);
        res.render('movies/edit', { movie: movieFromDB, list });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(
    movieId,
    {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
    },
    { new: true }
  )
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

// Handlebars.registerHelper('loop', function (array) {
//     for (let object of array) {
//       return object;
//     }
//   });

// for (let id of cast) {
//   if (id.includes(celebrity)) {
//     celebrity.value = selected;
//   }
// }

const Celebrity = require('../models/celebrity');

const router = require('express').Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      console.log('heres the celebs', celebritiesFromDB);
      res.render('celebrities/index', { celebrities: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/celebrities', (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      res.redirect(`celebrities/${createdCelebrity._id}`);
    })
    .catch((err) => next(err));
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render('celebrities/show', { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then((celebrityFromDB) => {
      res.render('celebrities/edit', { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  const celebId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(
    celebId,
    {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    },
    { new: true }
  )
    .then((updatedCeleb) => {
      res.redirect(`/celebrities/${updatedCeleb._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => next(err));
});

module.exports = router;

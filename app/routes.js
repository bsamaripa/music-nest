require('./models/artist');

module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all artists
  app.get('/api/artist', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(todos); // return all artists in JSON format
    });
  });

  // delete an artist
  app.delete('/api/artist/:artist_id', function(req, res) {
    artist.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};

module.exports = {
  index(req, res) {
    res.status(200);
  },

  onLost(req, res) {
    res.status(404).json({
      url: req.url,
    });
  },

  onError(err, req, res, next) {
    res.status(500).json({
      name: err.name,
      message: err.message,
    });
  },
};

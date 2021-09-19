const getActualRequestDurationInMillis = (start) => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to millis
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logger = (req, res, next) => {
  const currentDatetime = new Date();
  const start = process.hrtime();
  res.on("finish", function () {
    const processTimeMS = getActualRequestDurationInMillis(start);
    console.log(
      `[${currentDatetime.toISOString()}] ${req.method}:${req.url} ${
        res.statusCode
      } ${processTimeMS.toLocaleString()} ms`
    );
  });
  next();
};

module.exports = logger;

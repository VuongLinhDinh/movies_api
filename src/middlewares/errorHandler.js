const errorHadler = (err, req, res, next) => {
  console.log(">>> ERROR LOG: ", new Date().toISOString());
  console.log(">>> REQUEST:  ", req.method, req.originalUrl);
  console.log(">>> PARAMS: ", req.params);
  console.log(">>> BODY: ", req.body);
  console.log(">>> QUERY:  ", req.query);
  console.log(">>> ERR ", err);
  console.log(">>> ERR Stack ", err.stack);
  console.log("-----------------------------------------------------");

  // Format err:
  const messageError = err.messageObject || err.message;
  const error = {
    status: "error",
    error: messageError
  };
  const status = err.status || 400;
  return res.status(status).json(error);
};
export default errorHadler;

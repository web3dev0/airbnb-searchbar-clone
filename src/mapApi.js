export const textSearch = (keyword) => {
  return new Promise((resolve, reject) => {
    window.service.getQueryPredictions(
      { input: keyword },
      (predictions, status) => {
        if (Array.isArray(predictions)) {
          resolve(predictions);
        } else {
          resolve([]);
        }
      }
    );
  });
};

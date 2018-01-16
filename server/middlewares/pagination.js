/**
 * @description handles server side pagination
 * @param {Number} queryLimit
 * @param {Number} queryPage
 * @return {Object} - object of {limit, page, offset}
 */
export default (queryLimit, queryPage) => {
  let limit = null;
  if (parseInt(queryLimit, 10)) {
    limit = queryLimit || null;
  }
  const page = parseInt(queryPage, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;
  return { limit, page, offset };
};


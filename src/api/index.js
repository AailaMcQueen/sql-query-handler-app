import { dummyData } from './constants';

/**
 *
 * @param {Object} rowData any row from rows of sql query response
 * @returns {[Object]} returns an array of objects mapped on keys from the input
 */

const parseColumns = (rowData) => {
  return Object.keys(rowData).map((val) => ({
    id: val,
    label: val
  }));
};

/**
* a helper function to replicate behaviour of API calls for running queries
* with a 4 percent probabilty of failing
* @param {String} query sql query to be executed
* @param {Number} index used to map predefined queries with particular results
*                       in actual implemetation, this becomes redundant
* @return {Promise} the function return a promise which either resolves with 
                    query response along with parsed columns or gets rejected 
                    error message
*/
export const runQuery = (_query, index) => {
  let isFailing = Math.random() * 100 > 95;
  index = index === -1 ? 4 : index;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFailing) reject('Failed to run query');
      let columns = parseColumns(dummyData[index].rows[0]);
      resolve({
        columns,
        rows: dummyData[index].rows
      });
    }, 1000);
  });
};

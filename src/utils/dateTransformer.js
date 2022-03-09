
const moment = require('moment');

const dateTransformer = (date) => {

    const newDate2 = moment.utc(date).format("MMM Do, YYYY");
    return newDate2;
};

export default dateTransformer;
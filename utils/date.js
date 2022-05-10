import Moment from "react-moment";

const DateMoment = ({ date }) => {
  return <Moment format="DD-MM-YYYY">{date}</Moment>;
};

export default DateMoment;

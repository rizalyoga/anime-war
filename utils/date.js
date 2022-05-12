import Moment from "react-moment";

const DateMoment = ({ date }) => {
  return <Moment format="DD/MM/YYYY, h:mm a">{date}</Moment>;
};

export default DateMoment;

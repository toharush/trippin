import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { selectDateAndTime } from "../store/selectors/dateAndTime";
import { SetDateAndTime } from "../store/slices/dateAndTime";
import { DateAndTime } from "../interfaces/dateAndTime/dateAndTime";

const useDateAndTime = () => {
  const dispatch = useAppDispatch();
  const dateAndTime = useSelector(selectDateAndTime);
  
  const setDateAndTime = (dateAndTime: DateAndTime) => {
    dispatch(SetDateAndTime(dateAndTime));
  };

  const getDurationInDays = () => {
    const departureDate = dateAndTime.departureDate;
    const returnDate = dateAndTime.returnDate;
    const duration = returnDate.diff(departureDate, "day") + 1;
    return duration;
  };

  return {
    dateAndTime,
    setDateAndTime,
    getDurationInDays,
  };
};

export default useDateAndTime;

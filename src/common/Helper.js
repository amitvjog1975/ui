import dayjs from "dayjs";

export const FormatDate = (date, format) => {    
    return dayjs(date).format(format);  
  };

const Helper = {
  FormatDate
}  

export default Helper;
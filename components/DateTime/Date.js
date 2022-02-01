import React, { useState } from "react";
import DatePicker from "react-datepicker";

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export default function DatePicker2({setData = false }) {
  const [date, setDate] = useState(new Date());
  return (
    <DatePicker dateFormat="yyyy/MM/dd" selected={date} onChange={date => {
      setDate(date)
      setData(convert(date))
    }} />
  );
}
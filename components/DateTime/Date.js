import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export default function DatePicker2({data = false, setData = false }) {
  const [date, setDate] = useState(new Date());
  const [updateData, setUpdateData] = useState()
  useEffect(() => {
    setData(convert(data))
    data !== false && setUpdateData(data)
  }, [data])
  return (
    <DatePicker dateFormat="yyyy/MM/dd" placeholderText={updateData !== '' ? updateData : data !== false && data} selected={data === false && date} onChange={date => {
      setUpdateData(convert(date))
      setDate(date)
      setData(convert(date))
    }} />
  );
}
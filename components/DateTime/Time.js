import React, { useEffect, useState } from "react";
import Datetime from 'react-datetime'
import Image from "next/image";
import moment from 'moment';
var yesterday = moment().subtract(1, 'day');
var valid = function (current) {
  return current.isAfter(yesterday);
};

const datetimePlaceholder = { placeholder: "Select Time and Date" };

export function Time({ setDate = false, data = false }) {
  const [value, setValue] = useState(new Date())
  const changeData = () => {
    console.log(value)
    const format = 'HH:mm'
    const dateTime = moment(value).format(format)
    if (setDate !== false) {
      setDate(dateTime)
    }
  }
  useEffect(() => {
    const format = 'HH:mm'
    if (data !== false) {
      const dateTime = moment(data).format(format)
      if (setDate !== false) {
        setDate(dateTime)
      }
    }
  }, [])

  return (
    <Datetime inputProps={datetimePlaceholder} dateFormat={false} renderInput={renderInput} isValidDate={valid} value={data !== false ? data : value} onChange={() => {
      setValue()
      changeData()
      // set
    }} />
  )
}

function renderInput(props, openCalendar, closeCalendar) {
  return (
    <div className="flex justify-between justify-content border p-4 rounded-lg">
      <input {...props} />
      <div className="cursor-pointer" onClick={openCalendar}><Image src="/asset/icon/table/fi_clock.png" height={16} width={16} /></div>
    </div>
  );
}

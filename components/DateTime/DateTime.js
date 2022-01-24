import React, { useState } from "react";
import Datetime from 'react-datetime'
import Image from "next/image";
import moment from 'moment';
var yesterday = moment().subtract(1, 'day');
var valid = function (current) {
  return current.isAfter(yesterday);
};

const datetimePlaceholder = { placeholder: "Select Time and Date" };

export function MyDTPicker({setDate = false}) {
  const [value, setValue] = useState(new Date())

  const changeData = () => {
    const format = 'YYYY-MM-DD HH:mm'
    const dateTime = moment(value).format(format)
    if(setDate !== false){
      setDate(dateTime)
    }
  }

  return (
    <Datetime inputProps={datetimePlaceholder} renderInput={renderInput} isValidDate={valid} value={value} onChange={() => {
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
      <div className="cursor-pointer" onClick={openCalendar}><Image src="/asset/icon/table/fi_calendar.png" height={16} width={16} /></div>
    </div>
  );
}

// export class MfyDTPicker extends React.Component {
//   render() {
//     return <Datetime inputProps={datetimePlaceholder} renderInput={this.renderInput} isValidDate={valid} value={ } />;
//   }
//   renderInput(props, openCalendar, closeCalendar) {
//     function clear() {
//       props.onChange({ target: { value: '' } });
//     }
//     return (
//       <div className="flex justify-between justify-content border p-4 rounded-lg">
//         <input {...props} />
//         <div className="cursor-pointer" onClick={openCalendar}><Image src="/asset/icon/table/fi_calendar.png" height={16} width={16} /></div>
//       </div>
//     );
//   }
// }
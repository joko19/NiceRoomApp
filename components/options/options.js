
import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

let renderCount = 0;

export default function Option({ indexQuestion, indexitemAnswer }) {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ title: "", correct: 0 }]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `questions[${indexQuestion}].question_items[${indexitemAnswer}].options`
    }
  );

  const onSubmit = (data) => console.log("data", data);

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  renderCount++;

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return (
    <>
      <ul>
        {fields.map((itemAnswer, indexAnswer) => {
          console.log(itemAnswer)
          return (
            <div key={item.id} className={`${itemAnswer.correct === 1 ? 'bg-blue-6 border-blue-1' : 'bg-white'} my-2  p-4 border rounded-lg`} key={indexAnswer}>

            </div>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => {
          append({
            correct: 0,
            title: ''
          });
        }}
      >
        append
      </button>
    </>
  );
}
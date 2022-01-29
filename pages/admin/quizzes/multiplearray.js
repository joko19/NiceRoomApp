import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function Consentments() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "consenments",
    option: [{
      title: '',
      correct: 0
    }]
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
           
           <input {...register(`consenments`)} />

            {/* <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            /> */}
            option
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div onClick={() => setConsentment([...consenment, ''])} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Consentment</div>
      <button
        type="button"
        onClick={() => append({ consenments: '' })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}

import { useState } from "react";

import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...(register("email"), { require: true })}
          placeholder="Email"
        />
        <input
          {...(register("firstName"), { require: true })}
          placeholder="First Name"
        />
        <input
          {...(register("lastName"), { require: true })}
          placeholder="Last Name"
        />
        <input
          {...(register("username"), { require: true })}
          placeholder="Username"
        />
        <input
          {...(register("password"), { require: true })}
          placeholder="Password"
        />
        <input
          {...(register("password2"), { require: true })}
          placeholder="Password2"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;

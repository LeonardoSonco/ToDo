import React from "react";

interface ToDoProps {
  todo: string;
  complete:boolean;
}

const ToDo: React.FC<ToDoProps> = ({ todo, complete }) => {
  console.log(todo)
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center max-md:mx-10 border-2 px-4 py-4 mt-3">
          <div className="">
            <h4 className="text-lg">{todo}</h4>
          </div>
          <div className="flex gap-2">
            <span className="material-symbols-outlined hover:cursor-pointer">
              edit_square
            </span>
            <span className="material-symbols-outlined hover:cursor-pointer">
              cancel
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;

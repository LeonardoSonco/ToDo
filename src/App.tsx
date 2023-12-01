import React from "react";
import "./App.css";
//import ToDo from "./components/ToDo/ToDo";
import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import AddTask from "./components/AddTask/AddTask";
import axios from "axios";
import ToDo from "./components/ToDo/ToDo";

/*const endpoint = "https://parseapi.back4app.com/parse/classes/ToDo";
const headers = {
  "X-Parse-Application-Id": "pJoTe98MO9Nsgr84JTf2o7uZzWDDmpLogBUQNtYp",
  "X-Parse-REST-API-Key": "iCmrkT5LChgoHLKTWzOYRwGRNXK997bj1hsRnjUS",
  "content-type": "application/json"
};
const response = await axios.get(endpoint,{headers});

const listTask = response.data.results*/

const listTask = [
  {
    name: "Trabalho do Bof",
    complete: false,
  },
  {
    name: "Trabalho do Marcelo",
    complete: false,
  },
];

function App() {
  return (
    <div>
      <Header />
      <h2 className="text-center text-3xl mt-20">
        What's the Plan for Today?{" "}
      </h2>

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center max-md:mx-10 px-4 py-4 mt-3 max-sm:justify-center max-sm:flex-col max-sm:gap-5 ">
          <AddTask />
          <Filter />
        </div>
        {listTask.length === 0 ? (
          <p>Não há tarefas registradas.</p>
        ) : (
          listTask.map((todo: { name: string; complete: boolean }) => (
            <ToDo todo={todo.name} complete={todo.complete} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

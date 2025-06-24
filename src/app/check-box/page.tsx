"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const groceriesData = [
  {
    id: 1,
    name: "Apple",
    checked: false,
  },
  {
    id: 2,
    name: "Banana",
    checked: false,
  },
  {
    id: 3,
    name: "Orange",
    checked: false,
  },
  {
    id: 4,
    name: "Pineapple",
    checked: false,
  },
];

const CheckBox = () => {
  const [groceries, setGroceries] = useState(groceriesData);
  const handleChange = (id: number) => {
    setGroceries(
      groceries.map((grocery: any) => ({
        ...grocery,
        checked: grocery.id === id ? !grocery.checked : grocery.checked,
      }))
    );
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Groceries</h1>
      <ul className="flex flex-col items-start justify-center gap-2 p-4">
        {groceries.map((grocery: any) => (
          <li
            key={grocery.id}
            className="flex items-center justify-center w-full"
          >
            <label className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 w-full items-center">
              <input
                type="checkbox"
                checked={grocery.checked}
                onChange={() => handleChange(grocery.id)}
                className="hidden"
              />
              {/* Check icon */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
                animate={grocery.checked ? "checked" : "unchecked"}
                initial={false}
              >
                {/* check outline path */}
                <motion.path
                  d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                  variants={{
                    checked: {
                      fill: "rgb(37 99 235)",
                      stroke: "rgb(37 99 235)",
                      transition: { duration: 0.2 },
                    },
                    unchecked: {
                      fill: "transparent",
                      stroke: "rgb(107 114 128)",
                      transition: { duration: 0.2 },
                    },
                  }}
                />
                {/* check path */}
                <motion.path
                  d="M9 12l2 2l4 -4"
                  stroke="white"
                  variants={{
                    checked: {
                      pathLength: 1,
                      transition: { duration: 0.2, delay: 0.1 },
                    },
                    unchecked: {
                      pathLength: 0,
                      transition: { duration: 0.2 },
                    },
                  }}
                />
              </motion.svg>

              {/* strike through the text when checked */}
              <motion.div
                animate={{
                  color: grocery.checked ? "rgb(107 114 128)" : "rgb(0 0 0)",
                }}
                transition={{
                  duration: 0.3,
                }}
                className="relative"
              >
                {grocery.name}
                <motion.div
                  className="absolute top-1/2 left-0 h-0.5 bg-gray-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: grocery.checked ? "100%" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckBox;

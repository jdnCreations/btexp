"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateProps {
  date: Date;
  setDate: React.SetStateAction<React.SetStateAction<Date>>;
}

const ExampleDate: React.FC<DateProps> = ({ date, setDate }) => {
  // const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date!)}
      className=" text-blue-950"
      dateFormat="dd/MM/YY"
    />
  );
};

export default ExampleDate;

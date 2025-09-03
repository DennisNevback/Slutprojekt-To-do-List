import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchUserTodos from "../components/FetchUserTodos"

export default function Home() {


  return (
    <div>
      <FetchUserTodos/>
      <p>This is a home page</p>
    </div>)
 }
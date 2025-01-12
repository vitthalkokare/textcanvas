import React from "react";
import Myapp from "./Draw/Myapp";
import Draw from "./Draw/Draw";
import { Topnav } from "./Components/Topnav";
import Ma from "./Knova/Ma";

export default function Home() {
  return (
    <main className="scr">
    <Topnav/>
      <Draw/>
    </main>
  );
}

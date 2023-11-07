import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Routes>
      <Route path="2" element={"Hello 2"} />
      <Route path="1" element={"Hello 1"} />
      <Route path="*" element={"Hello"} />
    </Routes>
  );
}

import { Sidebar } from "../App/Editor/Sidebar";
import { Topbar } from "../App/Editor/Topbar";
import { Main } from "../App/Editor/Main";

export default function Editor() {
  return (
    <section className="dotted-pattern overflow-x-clip w-full h-full absolute flex ">
      <section className=" w-full flex flex-col">
        <Topbar />
        <Main />
      </section>
    </section>
  );
}

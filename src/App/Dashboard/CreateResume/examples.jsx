import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTemplateId } from "../../../store/editorSlice";
import { templates } from "../../../libs/templatesData";

export default function Examples() {
  const dispatch = useDispatch();
  const { templateId } = useSelector((state) => state.editor);
  const { appearance } = useSelector((state) => state.preferences);
  const navigate = useNavigate();

  return (
    <section
      className={`w-full h-full pt-8 max-sm:pb-10 sm:pt-16 px-4 sm:px-12 xl:px-16 2xl:px-24 overflow-auto ${
        appearance.theme == "dark" ? "bg-[#202020]" : "bg-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2
            className={`text-xl sm:text-2xl xl:text-3xl font-semibold font-satoshi ${
              appearance.theme == "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Choose your template
          </h2>
          <p
            className={`text-sm xl:text-base font-satoshi mt-1 ${
              appearance.theme == "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Select a layout structure for your resume
          </p>
        </div>
        <button
          onClick={() => navigate("/editor")}
          className="bg-orange-500 text-white cursor-pointer rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-orange-600 transition-colors font-satoshi font-medium w-full sm:w-auto justify-center"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-6 2xl:gap-8">
        {templates.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => dispatch(saveTemplateId(item.id))}
              className={`cursor-pointer ${
                item.id == templateId
                  ? "ring-2 ring-orange-500 ring-offset-2 rounded-xl"
                  : ""
              }`}
            >
              <div
                className={`relative rounded-lg overflow-hidden ${
                  appearance.theme == "dark"
                    ? "bg-[#202020] border-slate-700"
                    : "bg-white border-slate-200"
                } ${item.id == templateId ? "shadow-lg" : "shadow-sm"} border`}
              >
                <div className="h-50 xl:h-56  2xl:h-64 p-1">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                </div>
              </div>
              <p
                className={`text-sm xl:text-base font-satoshi font-medium text-center mt-2 ${
                  item.id == templateId
                    ? "text-orange-600"
                    : appearance.theme == "dark"
                      ? "text-white"
                      : "text-slate-600"
                }`}
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </section>
    </section>
  );
}

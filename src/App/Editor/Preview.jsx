import { useRef, useState, useMemo, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { useSelector } from "react-redux";
import { templates } from "../../libs/templatesData";
import ClassicProfessional from "../../assets/templates/ClassicProfessional";
import { THEME_COLORS } from "./ThemeSelector";
import { transformResumeData } from "../../utils/renderResume";
import { useCallback } from "react";

const PAGE_HEIGHT_PX = 297 * 3.7795;
const MINI_HEADER_PX = 40;

let measurer = null;

function getMeasurer() {
  if (!measurer) {
    const div = document.createElement("div");
    div.style.cssText =
      "position:fixed;left:-9999px;top:0;width:210mm;padding:0;box-sizing:border-box;background:white;z-index:-1;";
    document.body.appendChild(div);
    measurer = { div, root: createRoot(div) };
  }
  return measurer;
}

function getItemList(rawData) {
  const exps = rawData.work?.experiences || [];
  const projs = rawData.work?.projects || [];
  const edus = rawData.education?.educations || [];
  return [
    ...exps.map((_, i) => ({ section: "experience", index: i })),
    ...projs.map((_, i) => ({ section: "projects", index: i })),
    ...edus.map((_, i) => ({ section: "education", index: i })),
  ];
}

function buildPageData(rawData, items, includeHeader) {
  const expIndices = new Set(
    items.filter((i) => i.section === "experience").map((i) => i.index),
  );
  const projIndices = new Set(
    items.filter((i) => i.section === "projects").map((i) => i.index),
  );
  const eduIndices = new Set(
    items.filter((i) => i.section === "education").map((i) => i.index),
  );

  return {
    personal: {
      ...rawData.personal,
      contactDetails: includeHeader
        ? rawData.personal.contactDetails
        : {
            fullName: rawData.personal?.contactDetails?.fullName,
            email: "",
            phone: "",
            location: "",
            jobTitle: "",
          },
      onlineLinks: includeHeader ? rawData.personal.onlineLinks : [],
      summary: includeHeader ? rawData.personal.summary : "",
    },
    work: {
      ...rawData.work,
      experiences: (rawData.work?.experiences || []).filter((_, i) =>
        expIndices.has(i),
      ),
      projects: (rawData.work?.projects || []).filter((_, i) =>
        projIndices.has(i),
      ),
    },
    education: {
      ...rawData.education,
      educations: (rawData.education?.educations || []).filter((_, i) =>
        eduIndices.has(i),
      ),
      languages: includeHeader ? rawData.education?.languages || [] : [],
    },
    credentials: includeHeader
      ? rawData.credentials
      : {
          skills: [],
          certifications: [],
          achievements: [],
        },
  };
}

function greedyPaginate(rawData, Template, styles) {
  const { div, root } = getMeasurer();
  const items = getItemList(rawData);

  if (items.length === 0) return [{ data: rawData, pageNumber: 1 }];

  const pages = [];
  let cursor = 0;

  while (cursor < items.length) {
    const pageNum = pages.length + 1;
    const isFirst = pageNum === 1;
    const availHeight = PAGE_HEIGHT_PX - (isFirst ? 0 : MINI_HEADER_PX);

    let lo = cursor;
    let hi = items.length;

    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      const pageRaw = buildPageData(rawData, items.slice(cursor, mid), isFirst);
      const pageTransformed = transformResumeData(pageRaw, { styles });
      pageTransformed.pageNumber = pageNum;
      pageTransformed.totalPages = 0;

      flushSync(() => {
        root.render(<Template data={pageTransformed} />);
      });

      if (div.scrollHeight <= availHeight) {
        lo = mid;
      } else {
        hi = mid - 1;
      }
    }

    const taken = items.slice(cursor, lo);
    if (taken.length === 0) {
      taken.push(items[cursor]);
      cursor++;
    } else {
      cursor = lo;
    }

    pages.push({
      data: buildPageData(rawData, taken, isFirst),
      pageNumber: pageNum,
    });
  }

  flushSync(() => {
    root.render(<></>);
  });

  const totalPages = pages.length;
  return pages.map((p) => ({ ...p, totalPages }));
}

export function Preview() {
  const personal = useSelector((state) => state.personal);
  const work = useSelector((state) => state.work);
  const education = useSelector((state) => state.education);
  const credentials = useSelector((state) => state.credentials);
  const { templateId, size, font, weight, height, theme, contrast } =
    useSelector((state) => state.editor);
  const SelectedTemplate =
    templates.find((item) => item.id == templateId)?.component ||
    ClassicProfessional;

  const previewRef = useRef(null);
  const hasPaginatedRef = useRef(false);
  const [pages, setPages] = useState(null);

  const getTypeScale = (base) => ({
    name: base * 2.4,
    sectionHead: base * 1.3,
    jobTitle: base * 1.1,
    body: base * 1.0,
    subtle: base * 0.9,
  });

  const typeScale = getTypeScale(size);
  const weightMap = useMemo(
    () => ({
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
    }),
    [],
  );

  const themeColors =
    THEME_COLORS[theme || "monochrome"] || THEME_COLORS.monochrome;

  const applyContrast = useCallback(
    (hex) => {
      if (!hex) return hex;
      const factor = Number(contrast) || 1;
      const num = parseInt(hex.replace("#", ""), 16);
      const r = Math.min(
        255,
        Math.max(0, Math.floor(((num >> 16) & 0xff) / factor)),
      );
      const g = Math.min(
        255,
        Math.max(0, Math.floor(((num >> 8) & 0xff) / factor)),
      );
      const b = Math.min(255, Math.max(0, Math.floor((num & 0xff) / factor)));
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    },
    [contrast],
  );

  const styles = useMemo(
    () => ({
      fontFamily: font,
      name: {
        size: typeScale.name,
        weight: weightMap[weight] || "font-bold",
        style: "normal",
        case: "none",
        spacing: 2,
        color: applyContrast(themeColors.name),
      },
      sectionHeader: {
        size: typeScale.sectionHead,
        weight: weightMap[weight] || "font-bold",
        style: "normal",
        case: "uppercase",
        spacing: 1,
        color: applyContrast(themeColors.sectionHeader),
      },
      company: {
        size: typeScale.body,
        weight: weightMap[weight] || "font-medium",
        style: "normal",
        case: "none",
        spacing: 0,
        color: applyContrast(themeColors.company),
      },
      jobTitle: {
        size: typeScale.jobTitle,
        weight: weightMap[weight] || "font-medium",
        style: "italic",
        case: "none",
        spacing: 0,
        color: applyContrast(themeColors.jobTitle),
      },
      bodyText: {
        size: typeScale.body,
        weight: "font-normal",
        style: "normal",
        case: "none",
        spacing: 0,
        leading: height,
        color: applyContrast(themeColors.bodyText),
      },
      date: {
        size: typeScale.subtle,
        weight: "font-normal",
        style: "italic",
        case: "none",
        spacing: 0,
        color: applyContrast(themeColors.date),
      },
      contact: {
        size: typeScale.subtle,
        weight: "font-normal",
        style: "normal",
        case: "none",
        spacing: 0,
        color: applyContrast(themeColors.contact),
      },
    }),
    [font, weight, height, applyContrast, themeColors, typeScale, weightMap],
  );

  const userData = useMemo(
    () =>
      transformResumeData(
        { personal, work, education, credentials },
        { styles },
      ),
    [personal, work, education, credentials, styles],
  );

  const dataHash = useMemo(
    () => JSON.stringify({ personal, work, education, credentials }),
    [personal, work, education, credentials],
  );

  useLayoutEffect(() => {
    hasPaginatedRef.current = false;
    setPages(null);

    queueMicrotask(() => {
      if (!previewRef.current || hasPaginatedRef.current) return;
      const el = previewRef.current;
      if (el.scrollHeight > el.clientHeight) {
        hasPaginatedRef.current = true;
        const rawData = { personal, work, education, credentials };
        const result = greedyPaginate(rawData, SelectedTemplate, styles);
        setPages(result);
      }
    });
  }, [dataHash, SelectedTemplate, styles]);

  if (pages) {
    return (
      <div className="flex flex-col gap-4 items-center">
        {pages.map(({ data: pageData, pageNumber, totalPages }) => {
          const transformed = transformResumeData(pageData, { styles });
          transformed.pageNumber = pageNumber;
          transformed.totalPages = totalPages;
          return (
            <section
              key={pageNumber}
              className="bg-white rounded-xl w-[210mm] h-[297mm] shadow-2xl p-0 overflow-hidden"
            >
              <SelectedTemplate data={transformed} />
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <section
      id="resume-preview"
      ref={previewRef}
      className="bg-white rounded-xl w-[210mm] h-[297mm] shadow-2xl p-0 overflow-hidden"
    >
      <SelectedTemplate data={userData} />
    </section>
  );
}

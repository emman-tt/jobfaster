import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  job: {
    description: "",
    company: "",
    hiringManager: "",
    location: "",
    tone: "Formal",
    email: "",
    includeCoverLetter: false,
  },
  uploadedUserFileData: {
    data: {},
  },
  tailoredResume: null,
  pdfUrl: null,
};
export const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    saveJobDetails(state, action) {
      const { category, value } = action.payload;
      state.job[category] = value;
    },
    saveUserFileData(state, action) {
      const { option, value } = action.payload;
      state.uploadedUserFileData[option] = value;
    },
    saveTailoredResume(state, action) {
      state.tailoredResume = action.payload;
    },
    savePdfUrl(state, action) {
      state.pdfUrl = action.payload;
    },
  },
});

export const {
  saveCorrections,
  saveJobDetails,
  saveCorrectionAnswers,
  saveUserFileData,
  saveTailoredResume,
  savePdfUrl,
} = aiSlice.actions;

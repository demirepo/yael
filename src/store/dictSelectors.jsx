export const getExamples = (state) => state.dict.examples;
export const getSession = (state) => {
  return { sid: state.ajax.sid, yu: state.ajax.yu, yum: state.ajax.yum };
};
export const getTranslation = (state) => state.dict.translation;

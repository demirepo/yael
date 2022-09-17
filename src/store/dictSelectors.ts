import { RootState } from './store';

export const getExamples = (state: RootState) => {
  return state.dict.examples;
};
export const getSession = (state: RootState) => {
  return { sid: state.ajax.sid, yu: state.ajax.yu, yum: state.ajax.yum };
};
export const getTranslation = (state: RootState) => state.dict.translation;

import { all } from "redux-saga/effects";
import statsSagas from "./stats/saga";

export default function* rootSaga() {
  yield all([statsSagas()]);
}

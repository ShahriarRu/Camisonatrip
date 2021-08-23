import { all, call, fork, put, takeLeading } from "redux-saga/effects";

import {
  GET_LABELS,
  GET_PROPERTIES,
  GET_OBJECTS,
  GET_TEXTS,
  GET_PHOTO_SCORE,
  GET_FACES,
  LOADING,
  GET_EXIF,
} from "../actions";

import {
  loadingSuccess,
  loadingError,
  getLabelsSuccess,
  getLabelsError,
  getPropertiesSuccess,
  getPropertiesError,
  getObjectsSuccess,
  getObjectsError,
  getTextsSuccess,
  getTextsError,
  getPhotoScoreSuccess,
  getPhotoScoreError,
  getFacesSuccess,
  getFacesError,
  getExifSuccess,
  getExifError,
} from "./actions";

import {
  getLabels as getLabelsAPI,
  getProperties as getPropertiesAPI,
  getObjects as getObjectsAPI,
  getTexts as getTextsAPI,
  getPhotoScore as getPhotoScoreAPI,
  getFaces as getFacesAPI,
  getExif as getExifAPI,
} from "../../api/stats";

const getLabelsRequest = async (url, user, docID) => {
  // eslint-disable-next-line no-return-await

  const response = await getLabelsAPI(url, user, docID);
  return response.data.labels;
};

function* getStatsLabels({ url, user, docID }) {
  try {
    const response = yield call(getLabelsRequest, url, user, docID);
    yield put(getLabelsSuccess(response));
  } catch (error) {
    yield put(getLabelsError(error));
  }
}

const getPropertiesRequest = async (url, user, docID) => {
  // eslint-disable-next-line no-return-await

  const response = await getPropertiesAPI(url, user, docID);
  return response.data.colors;
};

function* getStatsProperties({ url, user, docID }) {
  try {
    const response = yield call(getPropertiesRequest, url, user, docID);
    yield put(getPropertiesSuccess(response));
  } catch (error) {
    yield put(getPropertiesError(error));
  }
}

const getObjectsRequest = async (url, user, docID) => {
  const response = await getObjectsAPI(url, user, docID);
  return response.data;
};

function* getStatsObjects({ url, user, docID }) {
  try {
    const response = yield call(getObjectsRequest, url, user, docID);
    yield put(getObjectsSuccess(response));
  } catch (error) {
    yield put(getObjectsError(error));
  }
}

// TEXTS
const getTextRequest = async (url, user, docID) => {
  const response = await getTextsAPI(url, user, docID);
  return response.data;
};

function* getStatsTexts({ url, user, docID }) {
  try {
    const response = yield call(getTextRequest, url, user, docID);
    yield put(getTextsSuccess(response));
  } catch (error) {
    yield put(getTextsError(error));
  }
}

// PHOTO SCORE
const getPhotoScoreRequest = async (url, user, docID) => {
  const response = await getPhotoScoreAPI(url, user, docID);
  return response.data.photo_score;
};

function* getStatsPhtoScore({ url, user, docID }) {
  try {
    const response = yield call(getPhotoScoreRequest, url, user, docID);
    yield put(getPhotoScoreSuccess(response));
  } catch (error) {
    yield put(getPhotoScoreError(error));
  }
}

// FACES
const getFacesRequest = async (url, user, docID) => {
  const response = await getFacesAPI(url, user, docID);
  return response.data;
};

function* getFaces({ url, user, docID }) {
  try {
    const response = yield call(getFacesRequest, url, user, docID);
    yield put(getFacesSuccess(response));
  } catch (error) {
    yield put(getFacesError(error));
  }
}

// EXIF
const getExifRequest = async (url, user, docID) => {
  const response = await getExifAPI(url, user, docID);
  return response.data;
};

function* getExif({ url, user, docID }) {
  try {
    const response = yield call(getExifRequest, url, user, docID);
    yield put(getExifSuccess(response));
  } catch (error) {
    yield put(getExifError(error));
  }
}

// LOADING
const loadingRequest = async () => {
  console.log("Calling loading action");
  setTimeout(() => {
    return true;
  }, 10000);
};

function* loading() {
  try {
    yield call(loadingRequest);
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingError(error));
  }
}

export function* watchGetLabels() {
  yield takeLeading(GET_LABELS, getStatsLabels);
}

export function* watchGetProperties() {
  yield takeLeading(GET_PROPERTIES, getStatsProperties);
}

export function* watchGetObjects() {
  yield takeLeading(GET_OBJECTS, getStatsObjects);
}

export function* watchGetTexts() {
  yield takeLeading(GET_TEXTS, getStatsTexts);
}

export function* watchGetPhtoScore() {
  yield takeLeading(GET_PHOTO_SCORE, getStatsPhtoScore);
}

export function* watchGetFaces() {
  yield takeLeading(GET_FACES, getFaces);
}

export function* watchGetExif() {
  yield takeLeading(GET_EXIF, getExif);
}

export function* watchLoading() {
  yield takeLeading(LOADING, loading);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetLabels),
    fork(watchGetProperties),
    fork(watchGetObjects),
    fork(watchGetTexts),
    fork(watchGetPhtoScore),
    fork(watchGetFaces),
    fork(watchGetExif),
    fork(watchLoading),
  ]);
}

import {
  GET_LABELS,
  GET_LABELS_SUCCESS,
  GET_LABELS_ERROR,
  GET_PROPERTIES,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_ERROR,
  GET_OBJECTS,
  GET_OBJECTS_SUCCESS,
  GET_OBJECTS_ERROR,
  GET_TEXTS,
  GET_TEXTS_SUCCESS,
  GET_TEXTS_ERROR,
  GET_PHOTO_SCORE,
  GET_PHOTO_SCORE_SUCCESS,
  GET_PHOTO_SCORE_ERROR,
  GET_FACES,
  GET_FACES_SUCCESS,
  GET_FACES_ERROR,
  GET_EXIF,
  GET_EXIF_SUCCESS,
  GET_EXIF_ERROR,
  LOADING,
  LOADING_SUCCESS,
  LOADING_ERROR,
} from "../actions";

// LOADING
export const loading = (url) => ({
  type: LOADING,
  url: url,
});

export const loadingSuccess = (items) => ({
  type: LOADING_SUCCESS,
  payload: items,
});

export const loadingError = (error) => ({
  type: LOADING_ERROR,
  payload: error,
});
// LABELS
export const getLabels = (url, user, docID) => ({
  type: GET_LABELS,
  url: url,
  user: user,
  docID,
});

export const getLabelsSuccess = (items) => ({
  type: GET_LABELS_SUCCESS,
  payload: items,
});

export const getLabelsError = (error) => ({
  type: GET_LABELS_ERROR,
  payload: error,
});

// PROPERTIES
export const getProperties = (url, user, docID) => ({
  type: GET_PROPERTIES,
  url: url,
  user: user,
  docID,
});

export const getPropertiesSuccess = (items) => ({
  type: GET_PROPERTIES_SUCCESS,
  payload: items,
});

export const getPropertiesError = (error) => ({
  type: GET_PROPERTIES_ERROR,
  payload: error,
});

// OBJECTS
export const getObjects = (url, user, docID) => ({
  type: GET_OBJECTS,
  url: url,
  user: user,
  docID,
});

export const getObjectsSuccess = (items) => ({
  type: GET_OBJECTS_SUCCESS,
  payload: items,
});

export const getObjectsError = (error) => ({
  type: GET_OBJECTS_ERROR,
  payload: error,
});

// TEXTS
export const getTexts = (url, user, docID) => ({
  type: GET_TEXTS,
  url: url,
  user: user,
  docID,
});

export const getTextsSuccess = (items) => ({
  type: GET_TEXTS_SUCCESS,
  payload: items,
});

export const getTextsError = (error) => ({
  type: GET_TEXTS_ERROR,
  payload: error,
});

// PHOTO SCORE
export const getPhotoScore = (url, user, docID) => ({
  type: GET_PHOTO_SCORE,
  url: url,
  user: user,
  docID,
});

export const getPhotoScoreSuccess = (items) => ({
  type: GET_PHOTO_SCORE_SUCCESS,
  payload: items,
});

export const getPhotoScoreError = (error) => ({
  type: GET_PHOTO_SCORE_ERROR,
  payload: error,
});

// FACES
export const getFaces = (url, user, docID) => ({
  type: GET_FACES,
  url: url,
  user: user,
  docID,
});

export const getFacesSuccess = (items) => ({
  type: GET_FACES_SUCCESS,
  payload: items,
});

export const getFacesError = (error) => ({
  type: GET_FACES_ERROR,
  payload: error,
});

// EXIF
export const getExif = (url, user, docID) => ({
  type: GET_EXIF,
  url: url,
  user: user,
  docID,
});

export const getExifSuccess = (items) => ({
  type: GET_EXIF_SUCCESS,
  payload: items,
});

export const getExifError = (error) => ({
  type: GET_EXIF_ERROR,
  payload: error,
});

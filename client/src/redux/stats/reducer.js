import {
  GET_LABELS,
  GET_LABELS_SUCCESS,
  GET_LABELS_ERROR,
  GET_PROPERTIES,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_ERROR,
  GET_TEXTS,
  GET_TEXTS_SUCCESS,
  GET_TEXTS_ERROR,
  GET_OBJECTS,
  GET_OBJECTS_SUCCESS,
  GET_OBJECTS_ERROR,
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

const INIT_STATE = {
  labels: [],
  colors: [],
  objects: [],
  objects_image_url: "",
  texts: [],
  texts_image_url: "",
  photo_score: "",
  // faces
  faces: [],
  faces_image_url: "",
  exif: [],
  loading: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // LOADING
    case LOADING:
      return { ...state };

    case LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case LOADING_ERROR:
      return { ...state, error: action.payload };

    // LABELS
    case GET_LABELS:
      return { ...state };

    case GET_LABELS_SUCCESS:
      return {
        ...state,
        labels: action.payload,
      };

    case GET_LABELS_ERROR:
      return { ...state, error: action.payload };

    // PROPERTIES
    case GET_PROPERTIES:
      return { ...state };

    case GET_PROPERTIES_SUCCESS:
      return {
        ...state,
        colors: action.payload,
      };
    case GET_PROPERTIES_ERROR:
      return { ...state, error: action.payload };

    // OBJECTS
    case GET_OBJECTS:
      return { ...state };

    case GET_OBJECTS_SUCCESS:
      return {
        ...state,
        objects: action.payload.objects,
        // objects_image_url: action.payload.url,
      };

    case GET_OBJECTS_ERROR:
      return { ...state, error: action.payload };

    // TEXTS
    case GET_TEXTS:
      return { ...state };

    case GET_TEXTS_SUCCESS:
      return {
        ...state,
        texts: action.payload.texts,
        texts_image_url: action.payload.url,
      };

    case GET_TEXTS_ERROR:
      return { ...state, error: action.payload };

    // PHOTO SCORE
    case GET_PHOTO_SCORE:
      return { ...state };

    case GET_PHOTO_SCORE_SUCCESS:
      return {
        ...state,
        photo_score: action.payload,
      };

    case GET_PHOTO_SCORE_ERROR:
      return { ...state, error: action.payload };

    // FACES
    case GET_FACES:
      return { ...state };

    case GET_FACES_SUCCESS:
      return {
        ...state,
        faces: action.payload.faces,
        faces_image_url: action.payload.url,
      };

    case GET_FACES_ERROR:
      return { ...state, error: action.payload };

    // FACES
    case GET_EXIF:
      return { ...state };

    case GET_EXIF_SUCCESS:
      return {
        ...state,
        exif: action.payload.exif,
      };

    case GET_EXIF_ERROR:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};

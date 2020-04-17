/**
 * This is also am important file that grabs data from API.
 * I need to find a way to understand this file.
 */

// Libraries
import { useEffect, useReducer } from "react";
import axios from "axios";
// Reducers
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  INCREASE_DAYS_SPOTS,
  DECREASE_DAYS_SPOTS,
} from "reducers/application";

/**
 * This is the hook that connects to the API server and interacts with data.
 *
 * @param initial
 */
export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  // This is the main useEffect thing.
  // I'm not quite sure how should I explain this.
  // It grabs data from the API server whenever a change happens on the UI.
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      });
    // It may be a good idea to catch some errors. I'm not quite sure what errors might happen yet.
    // I guess the API server not running is probably the biggest error.
    // Anyway, I'm not quite sure what should I do with the error stuff yet.
    }).catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  // An empty array here means this useEffect block will only be triggered once.
  }, []);

  const setDay = day => {
    return dispatch({ type: SET_DAY, day });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(
        dispatch({ type: SET_INTERVIEW, id, interview })
      ).then(dispatch({ type: DECREASE_DAYS_SPOTS }));
  };

  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(
        dispatch({ type: SET_INTERVIEW, id, interview })
      );
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(dispatch({ type: INCREASE_DAYS_SPOTS }));
  };


  // In what is being returned, only state is a object (or you can say an interface to access the current state).
  // All other stuff are functions, waiting to be called.
  return {
    state,
    setDay,
    bookInterview,
    editInterview,
    cancelInterview
  };
}
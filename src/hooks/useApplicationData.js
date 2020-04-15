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
    });
  // I'm still not quite sure what is the condition that cause this useEffect to trigger.
  // I think maybe it only triggers once...? Then how am I interacting with the API?
  // Wait maybe it means I'm not interacting with the API? I'm just writing stuff to the API?
  //TODO Figure out if using an empty array here is an issue.
  }, []);

  return {
    state,

    setDay: day => dispatch({ type: SET_DAY, day }),

    bookInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      return axios.put(`/api/appointments/${id}`, appointment)
        .then(
          dispatch({ type: SET_INTERVIEW, id, interview })
        ).then(dispatch({ type: DECREASE_DAYS_SPOTS }));
    },

    editInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      return axios.put(`/api/appointments/${id}`, appointment)
        .then(
          dispatch({ type: SET_INTERVIEW, id, interview })
        );
    },

    cancelInterview: (id) => axios
      .delete(`/api/appointments/${id}`)
      .then(dispatch({ type: INCREASE_DAYS_SPOTS })),
  };
}
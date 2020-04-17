// Libraries
import { useState } from "react";

export default function useVisualMode(initial) {
  // Q Should I make history not a state? It's never accessed from outside this class.
  // A No, history must be a state to be remembered.
  //   Everything you see in this function only runs once when initializing an instance of a hook.

  // The states can be considered as the "main public variables" of this class.
  // As in, they need to be accessed from outside this class thing.
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Useless debug function
  // const logHistory = function() {
  //   let output = "";
  //   for (const entry of history) {
  //     output += entry + ", ";
  //   }
  //   // output = output.substring(0, -2);
  //   console.log("History is " + output);
  // };

  /**
   * Transition into another mode.
   *
   * @param {*} newMode
   * @param {*} shouldReplace - Set true when the transition should replace the last mode in history
   */
  const transition = function(newMode, shouldReplace = false) {
    setMode(newMode);

    if (shouldReplace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  /**
   * Go back to the previous mode.
   */
  const back = function() {
    // Can't go back if there isn't any history.
    if (h.length <= 1) {
      return;
    }

    // Go back to the second last mode of the history
    setMode(history[history.length - 2]);
    // Remove the last mode of history
    setHistory(history.slice(0, -1));
  };

  return { mode, transition, back };
}
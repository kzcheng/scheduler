// Libraries
import { useState } from "react";

export default function useVisualMode(initial) {
  // Q Should I make history not a state? It's never accessed from outside this class.
  // A No, history must be a state to be remembered.
  //   Everything you see in this function only runs once when initializing an instance of a hook.

  //TODO Consider renaming this hook to something like useAppointmentMode to make the definition easier to understand

  //TODO Also, I may need to rewrite this function a bit on how it works.
  //     I remember there were some bugs for the history system.
  //     A rewrite might be required.

  // The states can be considered as the "main public variables" of this class.
  // As in, they need to be accessed from outside this class thing.
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const logHistory = function() {
    let output = "";
    for (const entry of history) {
      output += entry + ", ";
    }
    // output = output.substring(0, -2);
    console.log("History is " + output);
  };

  // const transition = function(newMode, shouldReplace = false) {
  //   if (shouldReplace) {
  //     history.pop();
  //   }

  //   setMode(newMode);
  //   setHistory(prev => [...history, newMode]);
  // };

  const transition = function(newMode, shouldReplace = false) {
    // console.log(`newMode is ` + newMode);
    
    setMode(newMode);
    console.log("Current Mode:", mode);
    console.log("New Mode:", newMode);

    if (shouldReplace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }

    console.log("History:", history);
    
    
    // setTimeout(() => {
    // }, 1000);
  };

  const back = function() {
    if (history.length <= 1) {
      return;
    }

    setMode(history[history.length - 2]);
    setHistory(history.slice(0, -1));
  };

  return { mode, transition, back };
}
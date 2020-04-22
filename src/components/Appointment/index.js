import React from 'react';

import "styles/Appointment.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


// Constants
// Useful for code safety
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {

  // This is the main hook.
  // mode is a state.
  // transition and back are functions.
  const { mode, transition, back } = useVisualMode(
    // If there is an interview, show the interview. Else, display an empty block.
    props.interview ? SHOW : EMPTY
  );

  const saveInterview = function(student, interviewer, isNewCreation) {
    const interview = {
      student,
      interviewer
    };

    transition(SAVING);

    props.setInterview(props.id, interview, isNewCreation)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const deleteInterview = function() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
            return props.onAdd;
          }}
        />)}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM_DELETE)}
          onEdit={() => transition(EDIT)}
        />)}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(...parm) =>  saveInterview(...parm, true)}
        />)}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(...parm) =>  saveInterview(...parm, false)}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />)}

      {mode === SAVING && (
        <Status
          message={"Saving"}
        />)}

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />)}

      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteInterview}
          onCancel={back}
        />)}

      {mode === ERROR_SAVE && (
        <Error
          message={"Error Saving"}
          onClose={back}
        />)}

      {mode === ERROR_DELETE && (
        <Error
          message={"Error Deleting"}
          onClose={() => transition(SHOW)}
        />)}
    </article>
  );
}
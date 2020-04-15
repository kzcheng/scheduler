import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/**
 * This is the component that the user sees when they are trying to create or edit an appointment.
 * @param {*} props
 */
export default function Form(props) {
  // Those are the states this component will use.
  // It may be a better idea to use some other kind of method to store data. But I'm not sure what kinds are available now.
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Trigger this function when the user cancels the attempt to make an appointment.
  const cancel = function() {
    setName("");
    setInterviewer(null);
    props.onCancel();
  };

  // This function will check if the things details inputted are valid.
  // Currently, it only checks if the name is empty.
  // To be honest, I'm not sure what will happen if you try to save an interview with no interviewer selected.
  // So we might need to work on here more after the project is done.
  //TODO After the project is completed, check if having no interviewer selected is possible to book an interview.
  const validate = function() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {
            validate();
          }}>Save</Button>
        </section>
      </section>
    </main>
  );
}
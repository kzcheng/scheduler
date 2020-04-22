import React from "react";

import "styles/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import Appointment from "components/Appointment";
import DayList from "components/DayList";

export default function Application(props) {
  const {
    state,
    setDay,
    setInterview,
    cancelInterview,
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          setInterview={setInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm"/>
        </section>
      </section>

    </main>
  );
}


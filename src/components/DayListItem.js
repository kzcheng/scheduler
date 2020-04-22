import React from "react";
import classnames from "classnames";

import "styles/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = function(spots) {
    switch (spots) {
    case 0:
      return "no spots remaining";
    case 1:
      return `${spots} spot remaining`;
    default :
      return `${spots} spots remaining`;
    }
  };

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props && props.selected,
    "day-list__item--full": props && props.spots === 0
  });

  return (
    <li
      className={dayClass}
      onClick={() => props && props.setDay && props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props && props.name}</h2>
      <h3 className="text--light">{props && formatSpots(props.spots)}</h3>
    </li>
  );
}
src/
  Main source code. Most important parts of the program are inside.
- index.js
    The main executable being run when the server launches.
- components/
  - Application.js
    Main component, wraps the whole application.
    May be separated into sidebar and schedule parts in future.
  - Button.js
  - DayList.js
  - DayListItem.js
  - InterviewerList.js
  - InterviewerListItem.js
  - Appointment/
    - index.js
    - Header.js
    - Form.js
    - Error.js
    - Empty.js
    - Confirm.js
    - Show.js
    - Status.js
- hooks/
  - useApplicationData.js
  - useVisualMode.js
- reducers/
  - application.js
- helpers/
  - selectors.js
- styles/
    All scss styles files are in here.



# Notes for Code Reviewer
I customized this project a lot where I see fit. So the code is starting to look really different from the skeleton provided by LHL.
Some files may be where you didn't think they will be. Come and check out this file if you can't find something.
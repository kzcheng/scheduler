# Known Bugs

## [Fixed] Failed edit attempt will occur as if successful
When the user tries to submit an edit of a appointment, if the submit fails (usually due to API server down), after clicking the cross to go back, the information about the appointment will appear to be changed. A refresh will cause the bug to go away.

Fixed: Turns out it's an issue where I should have warped what to do after API access is successful in a callback function.

## [Fixed] Remainder counters on left side changed without confirmation
  
This is pretty much the second part of the same bug, as above.

When then user creates or deletes an appointment, the counter on the left sidebar instantly responds.
Like, it just "assumes" the server will successfully execute the action.

To fix this bug, I'll probably have to change how the side bar works completely.

Fixed: Same as above, a minor change fixed all bugs.
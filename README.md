# snapped!

Mobile-first React application. Built with:

-
-
-
-
-
-
-

## Issues

- Initally allowed user to change their username in "account" page. Due to Firebase's inability to perform a single query that alters two different collections, when the "userDoc" had been updated, I had to perform a separate query to update any username-matching "postDoc" to have the new username.

Whilst this worked, it became apparent that if a user commented on a post, the
every "postDoc.comments.comment.username" would need to be changed too. If a user has made 1000 comments, changing the username for each comment would be highly inefficient. As a result, I have decided to no longer let the user change their username. This will also allow me to store followers/followees by this unique "username" rather than their "userId". This will enable me to make less queries (pertaining to followers/followees) to the database too.

I intend to remedy this practice when I use a NoSQL database.

-
-
-
-
-
-
-

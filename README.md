## Coding Challenge

### Guidelines

Please organize, design, test, document and deploy your code as if it were going into production, then send
us a link to the hosted repository (e.g. Github, Bitbucket...).

### Functional Spec

Create an application that allows a user to search for a GitHub username. On a successful search return,
display the user's GitHub handle, follower count, and a list of the user's followers (just the avatar is fine).
Since some users (e.g. mrdoob, holman, etc.) have many thousands of followers, GitHub only returns a
portion of the followers with each request. Create a "load more" button that, when clicked, fetches the next
payload of followers. This button should persist until there are no more pages of followers to fetch.

Information on the GitHub API is available here:  https://developer.github.com/v3/

The UX/UI is totally up to you. If you like, get creative and add additional features a user might find useful!

### Technical Spec

The front‐end should ideally be a single page app with a single index.html linking to external JS/CSS/etc.
Please take take this opportunity to demonstrate your CSS3 and HTML5 knowledge. Please use ReactJS to complete 
the coding challenge.

### Host It!

When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, etc.).

## Solution Details

### Cloud Hosting

This project is hosted on Heroku at URL (https://shrouded-brook-46780.herokuapp.com/).

### Implementation Caveats

I thoroughly read through the GitHub API online documentation and even reviewed questions posted on Stack Overflow
by other developers seeking to use the GitHub API in similar ways.  While the research helped me formulate a proper
URL to retrieve a GitHub user by user name, nowhere could I find out how to:

A) Obtain the total number of followers of a requested GitHub user <br>
B) Construct a REST GET URL that would return subsequent sets of followers after the initial 30.

The output of the user search is shockingly missing the total followers count.  Attempts at adding...

### `page=2&per_page=30`

...to the URL that returns followers...

### `/users/${userName}/followers`

...failed.

Since I feel that the true goal of this exercise is to demonstrate the creation of a single page application utilzing
React and to host it on a cloud server, I have fulfilled this criteria. 
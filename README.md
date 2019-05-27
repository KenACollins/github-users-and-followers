## Introduction

I created this repository to show my source code as part of a coding challenge I was given by Ritani for
the final step in their hiring process.

The description of the coding challenge is below followed by Solution Details where I document the approach
I took to solving the problem.

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

This project is hosted on Heroku at URL https://shrouded-brook-46780.herokuapp.com/.

In case you are unfamiliar with Heroku, they assign ridiculous subdomains to each project when you are using a free account
as I am. This is where "shrouded-brook-46780" comes from.

### Components

I coded the solution in React and created the following components:

#### App

Main component at top of hierarchy.

#### SearchBar

Displays an input field with a hardcoded label.

#### UserCard

Used for both the requested GitHub user and his or her followers.  Contains avatar image and metadata that includes
the GitHub username.  When used to display the requested GitHub user, will also display a small people icon with a 
total count of followers.

### Third Party Tools

#### Axios

I opted to use axios for Ajax calls instead of fetch() since I like the way I can set HTTP request headers in axios
and the GitHub API documentation urged passing an Accept header to force the usage of the version 3 API.

#### Semantic UI

No sense in reinventing the wheel, I relied on Semantic UI, https://semantic-ui.com/, for UI sample code.

### Features

I set a per page count of 50 followers as 100 seemed too much.  When the "See More Followers" button is clicked, rather
than swap in a new set of 50 followers, I append the new followers to the previously loaded ones.  React is smart enough
not to re-render the previously loaded followers.  The only downside to this decision is that if one tries to load all
followers of a hugely popular GitHub user, it probably will bog down the browser.

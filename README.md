## Specifications

### Functional Spec

The application allows a user to search for a GitHub username and get back metadata for that user and his or her followers. 

The solution encompasses the GitHub API documented here:  https://developer.github.com/v3/

On return from a successful search of one GitHub user, the screen displays the found GitHub user (avatar, username, 
follower count) along with a list of that user's followers (just username and avatar). Since some users (e.g. mrdoob, 
holman, etc.) have many thousands of followers, GitHub only returns a portion of the followers with each request (at time
of this writing, the cap is 30 followers). In these situations, a "load more" button is displayed that when clicked fetches 
the next payload of followers. This button persists until there are no more pages of followers to fetch.

### Technical Spec

The front‐end is implemented in React as a single page application (SPA) with just one index.html linking to external JS and CSS.

## Implementation Details

### Cloud Hosting

Try out the application! It is currently up and running on cloud host provider Heroku at URL https://shrouded-brook-46780.herokuapp.com/.

In case you are unfamiliar with Heroku, they assign ridiculous subdomains to each project when you are using a free account
as I am. This is where "shrouded-brook-46780" comes from.

### Design

I coded the solution in React, creating the following components:

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

#### jQuery

Wait, what, mixing jQuery and React in the same project?!! Am I nuts? Okay, I know that jQuery is all about DOM
manipulation and with React, developers don't have to deal with that thanks to the way React handles it through
comparing its virtual DOM with the real one. 

The reason that I make use of jQuery is purely to support the nice "Back to Top" feature described below. I had 
already built this "Back to Top" feature in jQuery for another client and did not have time to revisit how to 
accomplish the same thing in pure React.

### Features

#### Adding More Followers

I set a per page count of 50 followers as 100 seemed too much. When the "See More Followers" button is clicked, rather
than swap in a new set of 50 followers, I append the new followers to the previously loaded ones. React is smart enough
not to re-render the previously loaded followers. This approach allows a user to see all of the followers for users with
a reasonable number of them. The only downside to this decision is that if one tries to load all followers of a hugely 
popular GitHub user, it probably will bog down the browser.

#### Back to Top

When you scroll down through the followers and maybe click the button to load more, you end up scrolling down the single
page application (SPA) fairly far.  To make it easy to shoot back up to the top of the screen to begin a new search, I 
provide a 'Back to Top' floating icon fixed in the bottom right corner of the screen that is initially absent when you are
already at the top, but fades in as you scroll the page.  When clicked, this icon gently glides the page upwards until it 
reaches the top.
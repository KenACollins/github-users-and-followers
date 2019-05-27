/**
 * UserCard - Component used to display both the GitHub user being searched and all of his/her followers.
 * o Contains avatar image on top and metadata below.
 * o Metadata comprises GitHub user name, and if a count is available, the number of followers positioned
 *   to the right of a little people icon.
 * o The GitHub API (v3), when providing a list of followers, does not return the followers count for each
 *   of those individuals, so this portion of the ImageCard is skipped for followers.
 */
import React from 'react';

// Display followers smaller than the GitHub user they are following.
const reduceFollowerSize = isFollower => {
    if (isFollower) {
        return '200px';
    }
    return '';
};

// Skip metadata related to followers count if this data is not available.  It will be available for the 
// searched GitHub user but not for any of the followers.
const showFollowersCount = followersCount => {
    if (Number.isInteger(followersCount)) {
        return (
            <div className="extra content">
                <a href="/">
                    <i className="user icon"></i>
                    {followersCount} Followers
                </a>
            </div>
        );
    }
};

const UserCard = props => {
    return (
        <div className="ui card" style={{ width: reduceFollowerSize(props.isFollower) }}>
            <div className="image">
                <img alt="avatar" src={props.githubUser.avatar_url} />
            </div>
            <div className="content">
                <a href="/" className="header">{props.githubUser.login}</a>
            </div>
            {showFollowersCount(props.githubUser.followers)}
      </div>
    );
};

export default UserCard;
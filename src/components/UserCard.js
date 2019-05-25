import React from 'react';

const reduceFollowerSize = isFollower => {
    if (isFollower) {
        return '200px';
    }
    return '';
};

const showFollowersCount = followersCount => {
    if (followersCount > 0) {
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
    console.log('UserCard props', props);   // TESTING
    return (
        // <div className="ui card" style={{ width: '200px'}}>
        <div className="ui card" style={{ width: reduceFollowerSize(props.isFollower) }}>
            <div className="image">
                <img alt="avatar" src={props.githubUser.avatar_url} />
            </div>
            <div className="content">
                <a href="/" className="header">{props.githubUser.login}</a>
            </div>
            {showFollowersCount(props.followersCount)}
      </div>
    );
};

export default UserCard;
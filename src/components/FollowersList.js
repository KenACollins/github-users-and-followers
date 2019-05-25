import React from 'react';
import UserCard from './UserCard';

const FollowersList = props => {
    const followers = props.followers.map(follower => {
        return <UserCard key={follower.id} githubUser={follower} isFollower  />;
    });

    return <div className="ui cards">{followers}</div>;
}

export default FollowersList;
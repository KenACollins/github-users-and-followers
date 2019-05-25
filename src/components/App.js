import React from 'react';
import github from '../api/github';
import SearchBar from './SearchBar';
import UserCard from './UserCard';
import FollowersList from './FollowersList';

class App extends React.Component {
    state = { githubUser: {}, followers: [], followersCount: 0 };

    onSearchSubmit = async userName => { 
        // Retrieve data for requested Github user.
        const response1 = await github.get('/search/users', {
            params: { q: `${userName} in:login type:user` }
        });
        
        // Retrieve data for requested Github user's followers.
        const response2 = await github.get(`/users/${userName}/followers`);

        // Update state with data returned from API calls.
        this.setState({ githubUser: response1.data.items[0], followers: response2.data, followersCount: response2.data.length });
    }

    // Wait for search results.  Otherwise, we would be showing heading and empty user card.
    showRequestedGithubUser = () => {
        if (this.state.githubUser && this.state.githubUser.login) {
            return (
                <div>
                    <h4>Requested Github User</h4>
                    <UserCard githubUser={this.state.githubUser} followersCount={this.state.followersCount} />
                </div>
            );
        }
    };

    // Wait for search results.  Otherwise, we would be showing heading with no content below.
    showFollowers = () => {
        if (this.state.followers.length > 0) {
            return (
                <div style={{marginTop: '10px'}}>
                    <h4>Followers</h4>
                    <FollowersList followers={this.state.followers} />
                </div>
            );
        }
    };

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <h4>Search Criteria</h4>
                <SearchBar onSubmit={this.onSearchSubmit} />
                {this.showRequestedGithubUser()}
                {this.showFollowers()}
            </div>
        );
    }
}

export default App;
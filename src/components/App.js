import React from 'react';
import github from '../api/github';
import SearchBar from './SearchBar';
import UserCard from './UserCard';
import FollowersList from './FollowersList';

class App extends React.Component {
    state = { githubUser: {}, followers: [], errorMessage: "" };
    maxFollowersPerPage = 50;
    currentFollowersPage = 0;
    currentFollowersCount = 0;

    onSearchSubmit = async userName => { 
        try {
            // Retrieve data for requested Github user.
            const response1 = await github.get(`/users/${userName}`);

            // Retrieve data for requested Github user's followers.
            this.currentFollowersPage++;
            const response2 = await github.get(`/users/${userName}/followers`, {
                params: { per_page: this.maxFollowersPerPage, page: this.currentFollowersPage }
            });

            // Keep track of current count of followers retrieved.
            this.currentFollowersCount = response2.data.length;
    
            // Update state with data returned from API calls.
            this.setState({ githubUser: response1.data, followers: response2.data, errorMessage: "" });
        }
        catch (err) {
            // Update state with error message but also clear the previous state for the githubUser and followers
            // properties so that previously successful search results do not linger on-screen.
            this.setState({ githubUser: {}, followers: [], errorMessage: err });
        }
    }

    // Wait for search results.  Otherwise, we would be showing heading and empty user card.
    showRequestedGithubUser = () => {
        if (this.state.githubUser && this.state.githubUser.login) {
            return (
                <div>
                    <h4>Requested Github User</h4>
                    <UserCard githubUser={this.state.githubUser} />
                </div>
            );
        }
    }

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
    }
    
    showMoreFollowersButton = () => {
        if (this.currentFollowersCount === this.maxFollowersPerPage) {
            return (
                <button 
                    className="ui purple button"
                    style={{marginTop: '20px', marginBottom: '10px'}}
                    onClick={this.showMoreFollowers}>
                    Show More Followers
                </button>
            );
        }
    }
        
    showMoreFollowers = async () => {
        // Retrieve next page of data for requested Github user's followers.
        this.currentFollowersPage++;
        const response = await github.get(`/users/${this.state.githubUser.login}/followers`, {
            params: { per_page: this.maxFollowersPerPage, page: this.currentFollowersPage }
        });

        // Keep track of current count of followers retrieved.
        this.currentFollowersCount = response.data.length;
        
        /**
         * Update followers state by adding new followers to existing ones, rather than replacing previous people.
         * Amazingly, React does not rebuild the user cards for the people it already built, it just adds the new
         * ones below and keeps the web page scrolled to the spot where you clicked the button so you see the new
         * folllowers appear below the previous set and the "See More Followers" button just appears at the new
         * bottom of the screen.
         */
        this.setState({ followers: [...this.state.followers, ...response.data] });

        if (this.state.followers.length > 0) {
            return (
                <div style={{marginTop: '10px'}}>
                    <FollowersList followers={this.state.followers} />
                </div>
            );
        }
    }

    showErrorMessage = () => {
        if (this.state.errorMessage !== "") {
            if (this.state.errorMessage.toString().includes("404")) {
                return (
                    <div>
                        <h4>Requested Github User</h4>
                        <div>Requested GitHub username was not found.</div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h4>Requested Github User</h4>
                        <div>An unexpected error occurred...<br></br>
                        {this.state.errorMessage}</div>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <h4>Search Criteria</h4>
                <SearchBar onSubmit={this.onSearchSubmit} />
                {this.showRequestedGithubUser()}
                {this.showFollowers()}
                {this.showMoreFollowersButton()}
                {this.showErrorMessage()}
            </div>
        );
    }
}

export default App;
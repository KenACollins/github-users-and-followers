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
        // Initialize all state properties and instance variables before processing current search.
        this.setState({ githubUser: {}, followers: [], errorMessage: "" });
        this.currentFollowersPage = 0;
        this.currentFollowersCount = 0;

        try {
            // Retrieve data for requested GitHub user.
            const response1 = await github.get(`/users/${userName}`);
   
            // Update state with data returned from API call.
            this.setState({ githubUser: response1.data, errorMessage: "" });

            // Retrieve data for requested GitHub user's followers.
            this.getFollowers();
        }
        catch (err) {
            /**
             * Update state with error message but also reset all other state properties and instance
             * variables so that previously successful search results do not linger on-screen.
             */
            this.setState({ githubUser: {}, followers: [], errorMessage: err });
            this.currentFollowersPage = 0;
            this.currentFollowersCount = 0;
        }
    }

    // Wait for search results.  Otherwise, we would be showing heading and empty user card.
    showRequestedGitHubUser = () => {
        if (this.state.githubUser && this.state.githubUser.login) {
            return (
                <div>
                    <h4>Requested GitHub User</h4>
                    <UserCard githubUser={this.state.githubUser} />
                </div>
            );
        }
    }

    /**
     * On initial GitHub user search, retrive first page of followers data.  When "Show More Followers"
     * button is clicked, retrieve next set of followers data.
     */
    getFollowers = async () => {
        this.currentFollowersPage++;
        const response = await github.get(`/users/${this.state.githubUser.login}/followers`, {
            params: { per_page: this.maxFollowersPerPage, page: this.currentFollowersPage }
        });

        // Keep track of current count of followers retrieved.
        this.currentFollowersCount = response.data.length;
        
        /**
         * Update followers state by adding new followers to existing ones, rather than replacing previous people.
         * Amazingly, when showFollowers() runs, React does not rebuild the user cards for the people it already built, 
         * it just adds the new ones below and keeps the web page scrolled to the spot where you clicked the button so 
         * you see the new folllowers appear below the previous set and the "See More Followers" button just appears at 
         * the new bottom of the re-rendered screen.
         */
        this.setState({ followers: [...this.state.followers, ...response.data] });
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
        if (this.state.followers.length > 0 && this.currentFollowersCount === this.maxFollowersPerPage) {
            return (
                <button 
                    className="ui purple button"
                    style={{marginTop: '20px', marginBottom: '10px'}}
                    onClick={this.getFollowers}>
                    Show More Followers
                </button>
            );
        }
    }

    showErrorMessage = () => {
        if (this.state.errorMessage !== "") {
            if (this.state.errorMessage.toString().includes("404")) {
                return (
                    <div>
                        <h4>Requested GitHub User</h4>
                        <div>Requested GitHub username was not found.</div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h4>Requested GitHub User</h4>
                        <div>An unexpected error occurred...<br></br>
                        {this.state.errorMessage.toString()}</div>
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
                {this.showRequestedGitHubUser()}
                {this.showFollowers()}
                {this.showMoreFollowersButton()}
                {this.showErrorMessage()}
            </div>
        );
    }
}

export default App;
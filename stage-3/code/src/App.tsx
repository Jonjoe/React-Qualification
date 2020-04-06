// Every react component needs to have this imported to bootstrap JSX with react support
import * as React from "react";

// This is an async function to get the github data. Async function names are prefixed with "async"
async function asyncGetRepos() {
  // Define the api url
  const queryUrl = "https://api.github.com/users/jonjoe/repos?per_page=100";

  // Define the api header options
  const queryOptions = {
    headers: {
      Accept: "application/vnd.github.mercy-preview+json"
    }
  };

  // Make the api call
  const response = await fetch(queryUrl, queryOptions);

  // return the response json data only
  return response.json();
}

// This is the main app component
function App() {
  // At the top of all react functions we define any state elements we want to use

  // This piece of state defines the search term and thye function to set the search term
  const [searchTerm, setSearchTerm] = React.useState("");

  // This piece of state defines the githuib repos array and the funtion to set the array
  const [repos, setRepos] = React.useState([]);

  // This piece of state defines the loading status of the repo async data.
  const [reposLoading, setReposLoading] = React.useState(true);

  // useEffect is the API that creates an entry point into our components life cycle
  React.useEffect(() => {
    // inside here we are reloading the api data then this component mounts
    asyncGetRepos().then(data => {
      // saving the data into the repos state
      setRepos(data);

      // setting the async loading to false as its finished
      setReposLoading(false);
    });

    // This array defines when the useEffect should fire. Leaving it empty tells react to only fire this when the comoinent mounts.
  }, []);

  // All react components return JSX as rendered. In future iterations we will see how we can clean this up to remove all logic from it and abstract it into other components and external pure functions.
  

  // The repos are first filtered by search term and then mapped into JSX. The input field updates the searchTerm state that will then trigger a rerender when updated. 
  return (
    <div>
      <input
        onChange={event => setSearchTerm(event.target.value)}
        value={searchTerm}
      />

      {reposLoading ? (
        <p>loading ...</p>
      ) : (
        <ul>
          {repos
            .filter((repo: any) => repo.name.includes(searchTerm))
            .map((repo: any) => (
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;

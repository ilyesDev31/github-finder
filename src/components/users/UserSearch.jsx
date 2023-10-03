import { useState, useContext } from "react";
import GitHubContext from "../../context/globalContext";
import AlertContext from "../../context/AlertContext";
import { fetchUsers } from "../../context/Github actions/GithubActions";
const UserSearch = () => {
  const { users, dispatch } = useContext(GitHubContext);
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState("");
  const changed = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const data = await fetchUsers(text);
      dispatch({ type: "GET_USERS", payload: data });
    }
    setText("");
  };
  const clearing = () => {
    dispatch({ type: "CLEAR_USERS" });
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={changed}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={clearing}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;

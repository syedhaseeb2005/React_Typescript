import { useState, useEffect } from "react";
import "./App.css";

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

function App() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    fetchUserData("https://api.github.com/users");
  }, []);

  async function fetchUserData(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchUser = username.toLowerCase();
    try {
      const filteredUsers = userData.filter((user) =>
        user.login.toLowerCase().includes(searchUser)
      );
      setUserData(filteredUsers);
      if (filteredUsers.length === 0) {
        `<p className="empty-msg">User Not Found!</p>`
      }
    } catch (error) {
      console.error("Error filtering users:", error);
    }
  };

  return (
    <>
      <section>
        <div className="search_input">
          <form id="user" onSubmit={handleSubmit}>
            <input
              type="text"
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Search Username..."
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="main_container">
          {userData.length > 0 &&
            userData.map((user) => (
              <div className="card" key={user.id}>
                <img src={user.avatar_url} alt={user.login} />
                <hr />
                <div className="card-footer">
                  <img src={user.avatar_url} alt={user.login} />
                  <h3>{user.login}</h3>
                  <a href={user.url}>Github</a>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;

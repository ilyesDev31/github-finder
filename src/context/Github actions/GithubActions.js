import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = import.meta.env.VITE_TOKEN;

const github = axios.create({
  baseURL: url,
  headers: {
    Authorization: `token ${token}`,
  },
});

export const fetchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const res = await github.get(`/search/users?${params}`);

  return res.data.items;
};

// get User and Repos

export const getUserAndRepos = async (logins) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${logins}`),
    github.get(`/users/${logins}/repos`),
  ]);
  return { user: user.data, repos: repos.data };
};

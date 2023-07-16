import { getUserInfo } from './test.js';

async function main() {
  const userInfo = await getUserInfo();

  userInfo.forEach(({ fName, sName, username }) => {
    // Display the user data on the page
    document.getElementById('firstname').textContent = fName;
    document.getElementById('lastname').textContent = sName;
    document.getElementById('email').textContent = username;
  });
}

main();

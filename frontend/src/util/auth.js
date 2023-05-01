// Function to extract the token from the local storage
const getAuthToken = () => {
    const token = localStorage.getItem('token');

    return token;
};
export default getAuthToken;

import api from "./axios";

export async function getUsersByFilter(controller, email, phoneNumber = null) {
    let url = `users?email=${email}`;
    if (phoneNumber) {
        url += `&phoneNumber=${phoneNumber}`;
    }
    let users = [];
    await api
        .get(url, {
            signal: controller.signal,
        })
        .then((response) => (users = response.data))
        .catch((e) => {
            throw new Error(e);
        });
    return users;
}

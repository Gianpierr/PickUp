import axios from "axios";

export const SignUpAPI = async (formData) => {
  return axios.post("http://localhost:8000/api/signup/", {
    username: formData.email,  // if backend expects username
    first_name: formData.firstName,
    last_name: formData.lastName,
    birthday: formData.birthday,
    skill_level: formData.skill_level,
    gender: formData.gender,
    email: formData.email,
    password: formData.password,
  });
};

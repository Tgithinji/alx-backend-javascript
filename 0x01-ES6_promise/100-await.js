import { uploadPhoto, createUser } from "./utils";

export default async function asyncUploadUser() {
    let userObj = {};
    try {
      const photoDetails = await uploadPhoto();
      const userDetails = await createUser();
      userObj.photo = photoDetails;
      userObj.user = userDetails;
    } catch (e) {
        userObj = {
            photo: null,
            user: null,
        };
    }
    return userObj;
}

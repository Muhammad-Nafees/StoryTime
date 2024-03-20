import { Base_Url, get_story_byId, story_profile, user_profile } from "../../index"



export const fetch_users_stories = async ({
    type,
    recordingPage,
    isincognitoPage,
    user
}) => {


    let url;
    if (isincognitoPage) {
        url = `${Base_Url}${story_profile}?page=${isincognitoPage}&limit=${10}&type=${type}`;
    } else {
        url = `${Base_Url}${story_profile}?page=${recordingPage}&limit=${10}&type=${type}&user=${user}`;
    };

    console.log("url ---- :", url);
    console.log("user in api---- :", user);

    try {
        const responseData = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const response = responseData.json();
        return response;
    } catch (error) {
        console.log("error===", error);
    }
};



export const getStory_Byid = async (storyuserId) => {
    try {
        let url = `${Base_Url}${get_story_byId}${storyuserId}`;
        const responseData = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const response = responseData.json();
        return response
    }
    catch (err) {
        console.log(err);
    }
};

export const toggle_publicandPrivateMode = async () => {

    try {
        let url = `${Base_Url}user/profile-mode`;
        const responseData = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const response = responseData.json();
        return response;
    }
    catch (err) {
        console.log(err);
    }
};


export const tag_Friends = async ({ userid, storyId }) => {

    try {
        let url = `${Base_Url}story/tag-friend`;
        const responseData = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taggedUserId: userid,
                storyId: storyId
            })
        });
        const response = responseData.json();
        return response;
    }
    catch (err) {
        console.log(err);
    }
};

export const hide_Story = async (storyId) => {

    try {
        let url = `${Base_Url}story/hide/${storyId}`;
        const responseData = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const response = responseData.json();
        return response;
    }
    catch (err) {
        console.log(err);
    }
};

export const getUsers_Profile = async ({ user }) => {
    console.log("user----", user)
    let url = `${Base_Url}${user_profile}?user=${user}`;

    try {
        const responseData = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const response = responseData.json();
        return response;
    }
    catch (err) {
        console.log(err);
    }
};

import { Base_Url, get_story_byId, story_profile } from "../../index"

export const fetch_users_stories = async ({ type, recordingPage }) => {
    console.log("type----", type);

    let url = `${Base_Url}${story_profile}?page=${recordingPage}&limit=${10}&type=${type}`;

    try {
        const responseData = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const response = responseData.json();
        // console.log("responseProfile", response);
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

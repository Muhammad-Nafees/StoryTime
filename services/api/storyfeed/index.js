import axios from "axios";
import { Base_Url, addComment_endpoint, follow_Unfollow_endpoint, getAllUsers_endpoint, getComment_endpoint, storyLikedfeed, storyfeed_Endpoint } from "../.."


export const fetchallFeedStories = async (paginations) => {
    const { limit, pagination } = paginations;
    try {
        const responseData = await fetch(Base_Url + storyfeed_Endpoint + `?page=${pagination}&limit=${limit}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await responseData.json();
        return response;
    } catch (error) {
        console.log(error)
    }
};

export const storyLikedFeed = async (storyId) => {
    try {
        const url = `${Base_Url}story/like/${storyId}`;
        const responseData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await responseData.json();
        console.log("feedCategoryResponse========", response)
        return response;
    }
    catch (error) {
        console.log("err===", error)

    }
};

export const storydisLikedFeed = async (storyId) => {
    console.log("storyId==", storyId)
    try {
        const url = `${Base_Url}story/dislike/${storyId}`;
        const responseData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await responseData.json();
        console.log("feedCategoryResponse========", response)
        return response;
    }
    catch (error) {
        console.log("err===", error)

    }
};


export const getAllUsers_api = async (paginations) => {
    try {
        const { limit, pagination } = paginations;
        const responseData = await fetch(Base_Url + getAllUsers_endpoint + `?page=${pagination}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await responseData.json();
        return response;
    }
    catch (error) {
        console.log("err===", error)
    }
};

export const follow_unfollow_api = async (userids) => {
    try {

        const responseData = await fetch(Base_Url + follow_Unfollow_endpoint, {
            method: "POST",
            body: JSON.stringify({ following: userids }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await responseData.json()
        console.log("response=====", response)
        return response
    }
    catch (err) {
        console.log(err)
    }
};

export const add_comment_api = async (formsdata) => {
    const formData = new FormData();

    if (formsdata.story) {
        formData.append('story', formsdata.story);
    }
    if (formsdata.media) {
        formData.append('media', formsdata.media);
    }
    if (formsdata.text) {
        formData.append('text', formsdata.text);
    }
    if (formsdata.parent) {
        formData.append('parent', formsdata.parent);
    };

    try {
        const responseData = await fetch(Base_Url + addComment_endpoint, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (responseData.ok) {
            // JSON data ko parse karein aur use karein
            const jsonData = await responseData.json();
            return jsonData;

        } else {
            throw new Error(`Request failed with status: ${responseData.status}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};


export const get_Comment_api = async (paginations) => {
    const { storyId, page, limit, } = paginations;
    console.log("=====================", page, limit, storyId);
    try {
        const url = `${Base_Url}story/comments/${storyId}?page=${page}&limit=${limit}`;
        console.log("url===", url)
        const responseData = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await responseData.json()
        console.log("response=====", response)
        return response
    } catch (error) {
        console.log(error)
    }
};


export const createStory_api = async ({ type, creator, category, subCategory, contributors, content }) => {

    console.log("CREATORS=====", creator, category, subCategory, contributors);
    console.log("CONTENT=====", content);

    let textstory = {};
    if (contributors) {
        textstory = {
            type,
            creator,
            category,
            subCategory,
            contributors,
            content
        }
    } else {
        textstory = {
            type,
            creator,
            category,
            subCategory,
            content
        }
    }
    console.log("textstory== :", textstory);
    let url = Base_Url + "story";
    try {
        const responseData = await axios.post(url, textstory);
        return responseData.data;
    } catch (error) {
        throw error;
    }
};


export const blockUser_Story = async ({ blockId }) => {
    try {
        const url = Base_Url + "user/block";
        const responseData = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                blockId: blockId
            })
        });
        const response = await responseData.json()
        console.log("response=====", response)
        return response
    } catch (error) {
        console.log(error)
    }
};

export const reportUser_Story = async ({ text, storyId }) => {

    try {
        const url = Base_Url + "user/report-user";
        const responseData = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                story: storyId,
                text: text
            })
        });
        const response = await responseData.json()
        return response
    } catch (error) {
        console.log(error)
    }
};


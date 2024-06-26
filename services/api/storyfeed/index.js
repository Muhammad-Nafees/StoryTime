import { Base_Url, addComment_endpoint, follow_Unfollow_endpoint, getAllUsers_endpoint, getComment_endpoint, storyLikedfeed, storyfeed_Endpoint } from "../.."


export const fetchallFeedStories = async (paginations) => {
    const { limit, pagination } = paginations;
    console.log("===Apipage========", paginations)

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
        console.log("response=====", response)
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


export const createStory_api = async ({ creator, category, subCategory, contributors, content }) => {
    console.log("creatorsss=====", creator, category, subCategory, contributors, content)

    try {
        const url = Base_Url + "story";
        const responseData = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "text",
                creator,
                category,
                subCategory,
                contributors,
                content
            })
        });
        const response = await responseData.json()
        console.log("response=====", response)
        return response
    } catch (error) {
        console.log(error)
    }
};



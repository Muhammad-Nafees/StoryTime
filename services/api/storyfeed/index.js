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
    console.log("storyId==", storyId)
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
        console.log("===paginationInApi======", paginations)
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
    console.log("useridsapi-====", userids)
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

    const { story, text, media } = formsdata;
    console.log("mediaApiInn==========", media)
    console.log("textapi==========", text)
    console.log("storyapi==========", story)
    const formData = new FormData();
    formData.append('text', text);
    formData.append('story', story);
    formData.append('media', media);

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
            // Agar response successful nahi hai, toh error handle karein
            throw new Error(`Request failed with status: ${responseData.status}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error; // Calling code mein error handle karne ke liye error ko dobara throw karein
    }
};

export const get_Comment_api = async (storyId) => {
    console.log("storyidGetComment=========", storyId)

    try {
        const url = `${Base_Url}story/comments/${storyId}`;
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

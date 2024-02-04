// function to create a new post
const newPost = async (event) => {
    event.preventDefault();

    // get values from contents and title input field
    const contents = document.querySelector('#newContent').value.trim();
    const title = document.querySelector('#newTitle').value.trim();

    // if both values received
    if(title && contents) {
        // post request on the api/blogs route
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // once response ok, render dashboard with the new blogpost
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog');
        }
    }
};

// create a newpost once button is clicked
document.querySelector('#createBtn').addEventListener('click', newPost);
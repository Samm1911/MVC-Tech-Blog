// create a new comment
const createNewComment = async (event) => {
    event.preventDefault();
    // get the current blog id
    const blog_id = event.target.getAttribute('data-id');
    // and get the content of the comment inside the input field
    const contents = document.querySelector('#comment').value.trim();

    // if there is content
    if (contents) {
        // fetch request to the api/comments route, post request, stringify the contents and the blog_id to create comment for specific blog
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ contents, blog_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // if response ok, replace the current location with the blogs route and the current blog_id --> reloads the page and displays new comment
        if(response.ok) {
            window.location.replace(`/blogs/${blog_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

// eventlistener to submit the button and execute the createNewComment function
document.querySelector('#submitbtn').addEventListener('click', createNewComment);
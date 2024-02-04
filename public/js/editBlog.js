// editblog function
const editBlog = async (event) => {
    // if dataid found
    if(event.target.getAttribute('data-id')) {
        // get the current id
        const id = event.target.getAttribute('data-id');
        // get the input field for the new title
        const title = document.querySelector('#editTitle').value.trim();
        // get the input field for the new content
        const contents = document.querySelector('#editContent').value.trim();

        // fetch request to perform a put request on the specific blog with the specific id
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            // replace title and contents
            body: JSON.stringify({title, contents}),
            // use the json application
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // go to dashboard and display edited blog once response ok
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit blog');
        }
    }
}

// delete a post function 
const deletePost = async (event) => {
    // if post with dataid found 
    if (event.target.hasAttribute('data-id')) {
        // get the current id
        const id = event.target.getAttribute('data-id');

        // perform a delete request on specific blog
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        // go back to the dashboard and you will see the blog is deleted
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog');
        }
    }
};

// eventlisteners for the edit and delete buttons
document.querySelector('#editBtn').addEventListener('click', editBlog);
document.querySelector('#deletebtn').addEventListener('click', deletePost);

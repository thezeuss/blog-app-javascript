document.addEventListener('DOMContentLoaded', function () {
    const blogList = document.getElementById('blog-list');
    const addBlogBtn = document.getElementById('add-blog-btn');
    const titleInput = document.getElementById('title-input');
    const bodyInput = document.getElementById('body-input');

    // Fetch blogs from API
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(blogs => {
            blogs.forEach(blog => {
                addBlogToList(blog);
            });
        });

    // Add blog to UI
    function addBlogToList(blog) {
        const blogItem = document.createElement('li');
        blogItem.className = 'blog-item';
        blogItem.innerHTML = `
            <h3 class="blog-title">${blog.title}</h3>
            <p class="blog-body">${blog.body}</p>
            <button class="delete-btn" data-id="${blog.id}">Delete</button>
        `;
        blogList.appendChild(blogItem);
    }

    // Add new blog
    addBlogBtn.addEventListener('click', function () {
        const title = titleInput.value;
        const body = bodyInput.value;

        // Create a new blog object
        const newBlog = {
            title: title,
            body: body
        };

        // Send a POST request to the API to add the new blog
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        })
            .then(response => response.json())
            .then(blog => {
                addBlogToList(blog);
                titleInput.value = '';
                bodyInput.value = '';
            });
    });

    // Delete blog
    blogList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const blogId = event.target.getAttribute('data-id');

            // Send a DELETE request to the API to delete the blog
            fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        event.target.parentElement.remove();
                    }
                });
        }
    });
});

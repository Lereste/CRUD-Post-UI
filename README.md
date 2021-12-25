# CRUD Post UI | Lereste

View live demo: [https://crud-with-api.vercel.app/](https://crud-with-api.vercel.app/)

This simple website has 3 pages:
- Home page: `/`
- Add/Edit a post page: `/add-edit-post.html`
- Post detail page: `/post-detail.html`

## :question: Questions you may have

> What is query params and example?

- Query params is the parts after question mark.

```
Let break the following url into smaller parts:
URL: https://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1

- origin: "https://js-post-api.herokuapp.com"
- pathname: "/api/posts"
- search: "?_page=1&_limit=6&title_like="
- When you parse search, you'll get query params object with two keys:
  - `_page`: 1
  - `_limit`: 6
  - `title_like=`: name
  
  name: mean your title of post you want to search
  
```

> How to know whether add or edit mode when visit `/add-edit-post.html` page?

- Well, depend on the availability of query param `postId`.
  If it exists, then `edit` mode, otherwise `add` mode.

> How to know which post to show detail when visiting `/post-detail.html`?

- Same as above. Let check `postId` query param.

> How many external libs used in the final project?

- [Boostrap](https://getbootstrap.com/): Used for building responsive layout
- [Bootstrap Carousel](https://getbootstrap.com/docs/4.0/components/carousel/): Used for slide show on Home page.
- [Fetch](https://github.com/github/fetch): Used for working with API.
- [Axios](https://github.com/axios/axios): Used for working with API.
- [Dayjs](https://day.js.org/docs/en/installation/node-js): Used for show time when create post.
- 

Happy Coding ^^~

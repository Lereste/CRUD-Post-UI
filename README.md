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
- [Bootstrap Carousel](https://getbootstrap.com/docs/5.1/components/carousel/): Used for slide show on Home page.
- [Bootstrap Modal](https://getbootstrap.com/docs/5.1/components/modal/): Used for show modal at post-detail and confirmation when remove post.
- [Bootstrap Pagination](https://getbootstrap.com/docs/5.1/components/pagination/): Used for handle prev/next button.
- [Fetch](https://github.com/github/fetch): Used for working with API.
- [Axios](https://github.com/axios/axios): Used for working with API.
- [Dayjs](https://day.js.org/docs/en/installation/node-js): Used for show time when create post.
- [Lodash.debounce](https://www.npmjs.com/package/lodash.debounce): Used for search post with "title_like="
- [Toastify](https://github.com/apvarun/toastify-js/blob/master/README.md): Used for show toast message.

## :tada: Post API Guide

- API_URL: `https://js-post-api.herokuapp.com/api`

### Get a list of posts

```sh
GET /posts
```


Supported query params:
- `_limit`: Limit the number of items per page.
- `_page`: Current page.
- `_sort`: Indicate which field should be sorted on
- `_order`: Indicate sort direction.

*Eg: Get page 2 posts with 6 posts/page*

```sh
GET /posts/:postId?_limit=10&_page=2
```

*Eg: Sort post to get the latest posts first.*

```sh
GET /posts/:postId?_sort=updatedAt&_order=desc
```


### To get a post detail

```sh
GET /posts/:postId
```

### To add a new post

```sh
POST /posts
```

Sample payload:

```js
{
  title: 'Some cool title',
  author: 'Po Nguyen',
  description: 'Awesome post',
  imageUrl: 'https://picsum.photos/id/580/1368/400',
}
```

### To update a post

```sh
PATCH /posts/:postId
```

Please ONLY include changes to your payload:

```js
{
  id: 'your-post-id',
  title: 'My new title',
}
```

### To remove a post

```sh
DELETE /posts/:postId
```

## :heart_eyes: General requirement

- Learn to use Post API: `https://js-post-api.herokuapp.com`
- Implement 3 pages with details described below.
- Learn to use Github.
- Deploy your page to Github Page.
- Use `axios` to work with API.
- (Optional) Use anime.js to add animation.


Happy Coding ^^~

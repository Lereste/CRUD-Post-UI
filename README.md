# CRUD Post UI | Lereste

View live demo: [https://crud-with-api.vercel.app/](https://crud-with-api.vercel.app/)

Api: [https://app.swaggerhub.com/apis/paulnguyen.mn/easy-javascript/](https://app.swaggerhub.com/apis/paulnguyen.mn/easy-javascript/)

Thanks [Paul Nguyen](https://github.com/paulnguyen-mn) for teaching me to complete this project.

This simple website has 3 pages:
- Home page: `/`
- Add/Edit a post page: `/add-edit-post.html`
- Post detail page: `/post-detail.html`

## :question: Questions you may have

> What is query params and example?

- Query params is the parts after question mark.

```
Let break the following url into smaller parts:
URL: https://js-post-api.herokuapp.com/api/posts?_limit=6&_page=1

- origin: "https://js-post-api.herokuapp.com"
- pathname: "/api/posts"
- search: "?_limit=6&_page=1&title_like="
- When you parse search, you'll get query params object with two keys:
  - `_limit`: 6
  - `_page`: 1
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

## :house: Home page

### Render list of posts

- Research `Bootstrap Carousel` and add to home page.
  - Include 3 slides
  - Each slide has title and description.
  - Auto move the next slide.
- Fetch list of posts and render to UI.
- Search post with title.
- Pagination to be able to to fetch posts by page and limit the number of posts per page.

### Handle event on each post item

- `Click`: Go to detail page and show detail of clicked post.
- `Edit button click`: Go to edit page and populate detail of clicked post to form.
- `Remove button click`: Show a modal confirmation to remove? If yes, remove it and show a toast with message `Remove post successfully`. Otherwise, do nothing :P


## :heavy_plus_sign: Add/Edit post page

- Add form validation
  - Require `title` field
  - Require `author` field

**ADD MODE** (if `postId` query param doesn't exist)

- Handle form submit
  - Show error if validation is failed. Stop form submit.
  - Add new post with submitted values: `title`, `author`, `description` and `imageUrl`
  - If add successfully, show a toast with message `Save post successfully` and redirect to Edit page of the new post.
  - If failed, show a toast with error message.

**EDIT MODE** (if `postId` query param exists)

- Get post detail and set initial value for form.
- Handle form submit
  - Do nothing if user doesn't change anything.
  - Show error if validation is failed. Stop form submit.
  - Update existing post with field that has changes. Don't include unchanged properties inside payload.
  - If update successfully, show a toast with message `Save post successfully`.
  - If failed, show a toast with error message.

## :eyes: Post detail page

- Get post detail.
- Update corresponding DOM: `title`, `description`, `author`, `createdAt` and `imageUrl`.
- Integrate with `Lightbox` to view image when click on image.

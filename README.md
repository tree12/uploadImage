
# Project Title

This project demostrates how to upload image with nextjs and laravel, being able to use drag&drop too.

In this project I use drag&drop library from https://react-dropzone.js.org/
## 🚀 Tool
Nodejs 22.18.0

Laravel Framework 12.36.1

Nextjs version 16.0.1
## 🚀 Installation
### Backend
 First for my-backend API(laravel), run this command to run the project
```bash
php artisan serve

```

Make sure the url of this backend should be 
```bash
  INFO  Server running on [http://127.0.0.1:8000].  

  Press Ctrl+C to stop the server
```

If it appears another url or port please change the url in frontend which I will mention later.

### Frontend
Second for my-app frontend(nextjs), after download the code brrowse to  my-app folder and run this command to install neccessory library.
```bash
npm install
```

Open the file name as config.tsx at my-app>src>app make sure you have the correct api url 
```js

export const config = {
    //apiUrl: 'http://localhost:8000/api',
    apiUrl: 'http://127.0.0.1:8000/api',
   
}

export default config;
```

Run the program with this command
```bash
npm run dev
```

## Additional
For creating the project from scratch, I recommend to follow the official document as this link(Laravel) https://laravel.com/docs/12.x/installation

and 
(Nextjs) https://nextjs.org/docs/app/getting-started/installation


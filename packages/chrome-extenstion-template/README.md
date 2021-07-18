# @aiou/chrome-extenstion-template
*build chrome crx application*

[![npm](https://img.shields.io/npm/v/@aiou/chrome-extenstion-template)](https://github.com/JiangWeixian/templates/tree/master/packages/chrome-extenstion-template) [![GitHub](https://img.shields.io/npm/l/@aiou/chrome-extenstion-template)](https://github.com/JiangWeixian/templates/tree/master/packages/chrome-extenstion-template)

## features

* Support hot reload
* Build with `webpack`, and to `.zip`
* Build UI interface with `react`
* Process page element with `JQuery`
* Process multiple dom event with `rxjs`

## usage

- custom package info in `package.json & publick/manifest.json`

## development

- **Setup** - `yarn && yarn dev`
- **Build** - `yarn build`

## different crx type

### content mode

active when click crx icon, in default, this template work on any live webpage

### newtab mode 

active when open new tab

1. create `src/tab.tsx`
2. create `public/tab.html`

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <title>New Tab</title>
    </head>

    <body>
      <div id="APP"></div>
      
      <script src="js/vendor.js"></script>
      <script src="js/myPage.js"></script>
    </body>
    </html>
    ```

    modify `webpack.common.js`

    ```tsx
    entry: {
      ...
      tab: path.join(__dirname, srcDir + 'tab.tsx'),
    }
    ```

    modify `public/manifest.json`

    ```json
    {
      "chrome_url_overrides" : {
        "newtab": "myPage.html"
      },
    }
    ```



## Q&A

* Q1 - How to load extension to chrome?

  Open `Setting->Extenstion->Load unpack extenstion`

  Then, Load `dist` directory

  or Check this [video](https://www.notion.so/Chrome-Extentions-23d3afc128644457bfb08022713fe2b1#20aadfedc6cc4b32b6979decbea644ea)

* Q2 - How to management dom?

  ```js
  const main = document.querySelector('#main')
  const p = document.createElement('p')
  p.innerText = 'this is p'
  main.appendChild(p)
  ```

* Q3 - How to use axios in chrome-extenstion

  ```js
  // in content.ts
  document.addEventListener('click', (e: any) => {
    axios.get('https://www.google.com')
      .then(res => {
        console.log(res)
      })
  })
  ```
* Q4 - How to inject css to with content scripts ? - **See it in manifest.json**

* Q5 - How to use third-party `.css` or `.js` files in popup.html

  ```json
  {
    // ...other config in manifes.json
    "content_security_policy": "script-src 'self' https://code.getmdl.io/1.3.0/material.min.js 'self'; object-src 'self'",
  }
  ```

* Q6 - How to publish - see this [video](https://www.youtube.com/watch?v=DpdYTAhDWbs)

* Q7 - How to switch to different ctx mode ? 

    check [#custom section]((#different-ctx-type))
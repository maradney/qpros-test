This is a [Next.js 13](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) for QPros - test.

## Getting Started

First, install depencencies:

```bash
npm run install
```

then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You should find a button and a disabled input that displays the status.
- Pressing the button will enter the loading state
- Icon/message changes depending on status

## Setting up selenium
Right now clicking the button will show an error, You need to set a `.env` file in project root and set ```SE_MANAGER_PATH``` value to an executable `selenium-manager` file.

ex: `SE_MANAGER_PATH=/Users/user/Sandbox/qpros-test/bin/macos/selenium-manager/selenium-manager`

I left the file I used as an example in the repo but you need to download your own depending on the OS you're using.

- [Find selenuim-manager here](https://github.com/SeleniumHQ/selenium/tree/trunk/common/manager)
- [More about selenuim-manager](https://www.selenium.dev/blog/2022/introducing-selenium-manager/)

Also, I'm using firefox so I recommend having it installed and updated.

If you want to use chrome for example make sure it's installed and updated and set `SE_BROWSER=chrome` in your `.env` file.

## Important
Make sure the downloaded `selenuim-manager` file is executable.

For macos it's as simple as running `chmod 755` to the file and `xattr -d com.apple.quarantine <name-of-executable>` in case it's showing "Developer can't be verified error".

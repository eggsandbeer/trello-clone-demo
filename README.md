This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## NOTES

Using nextjs, react/redux, tailwind and some headless ui components (modal, dropdown menu, listbox).

Definitely eyeballing colours, spacing — this is limitation of getting a static png instead of a sigma/zeplin doc where I can inspect things. Assuming on job, it won’t just be a png I’m working off of, so figured it was OK here to not be fully to spec and just use tailwind defaults.

No tests — I usually write a lot of tests and am not doing it here just to save time.

Definitely more work to do to make this feature complete from the mock ups — mostly adding all the header elements and all the individual card elements (card comments, card attachments, card stepper, add users, etc.) Really just added some basic editable elements to the card so hopefully you can see I’m comfortable with forms, editing.

With tailwind — still feel need a better approach to the unwieldily classNames, which are kinda all over the place here in terms of how to format. Would consider this and
Things like:
https://www.wearecogworks.com/blog/how-to-use-tailwind-with-bem/
https://github.com/michal-wrzosek/cntl

Some any return types, functions with no param types/return signature snuck in — I believe just in the cards. Little lazy on my part — probably could do more to separate out component prop types  needed for render from data (store) types. Things like index probably won’t exist on server but are passed from component to component during render. Maybe should be saving a position variable on the Card model.

No local storage or data persistence. Probably could’ve add some easy local cache push funcs on card data update, move — load that up on app load.

Not using next’s routing/img/static assets at all — on job, would 100% do the proper nextJS use so things are served up properly, use server side rendering, etc.

Could probably refactor sidebar items so that subitem isn’t needed — just make a single item that takes that side arrow as a decorator prop.

Mobile is somewhat functional — didn’t add a mobile sidebar menu, but site shouldn’t break, though I haven’t tested drag and drop with a phone at all.

Thanks guys!

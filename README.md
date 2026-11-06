# Kitchen District — website pitch demo

A responsive, buildless restaurant concept. Plain HTML, CSS, and JavaScript. Zero backend, accounts, API calls, analytics, booking submissions, or stored guest information.

## Preview

Run `python -m http.server 4173 --directory dist` from this folder, then open http://localhost:4173.

The `dist` folder is the complete portable website. No installation or build is needed.

## Vercel deployment

Import this repository with its root directory set to the repository root and the framework preset set to **Other**. The root `vercel.json` sets the output directory to `dist`, so Vercel serves `dist/index.html` at `/` and its CSS, JavaScript, and images at their expected paths. No install or build command is required.

If `/` returns `404 NOT_FOUND` while `/dist/index.html` loads, the repository root was published instead of the `dist` directory. Deploy the commit containing `vercel.json`; redeploying an older commit will retain the error.

## Interactions

- Accessible menu category tabs with keyboard navigation.
- Two-photo gallery and native-dialog lightbox.
- Responsive navigation.
- Reservation preview with local date validation and editable summary. This never makes a real booking.
- Real phone and directions links.

## Reference notes

Restaurant identity, address, contact number, menu selections, and imagery were taken from the supplied official restaurant page and Google Maps listing. The official Hyatt dining page was used to cross-check details.

- https://www.hyattrestaurants.com/en/new-delhi/restaurant/kitchen-district-1
- https://www.hyattrestaurants.com/en/new-delhi/restaurant/kitchen-district-1/menu
- https://www.hyatt.com/hyatt-centric/en-US/delct-hyatt-centric-janakpuri-new-delhi/dining
- Google Maps coordinates: 28.6289244, 77.0789652

Hours differ between the official hotel page and Maps, so the concept directs guests to call for opening hours. No invented reviews, awards, prices, or availability are displayed. Menu dishes were verified against the official restaurant menu. Photography remains the property of its respective owner; this is an independent presentation concept, not an official restaurant website.

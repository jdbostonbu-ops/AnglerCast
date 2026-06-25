# Prompt History

## 1. RED 28.1 - Save Profile Name

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. Do not change, edit, weaken, rename, or delete any test file. Do not run any tests, commands, or git operations — Jacqueline runs everything herself.

There is a RED test at src/lib/profile.test.ts that imports saveProfileName from @/lib/profile, which does not exist yet. Write ONLY the implementation file src/lib/profile.ts to make RED 28.1 pass.

## 2. RED 28.1 - Save Profile Name, Schema Already Present

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.1 — A user can save a profile name to their account (section 28, the Profile in the nav bar feature).

The RED test at src/lib/profile.test.ts imports saveProfileName from @/lib/profile, which does not exist yet. Write ONLY the implementation file src/lib/profile.ts to make RED 28.1 pass.

## 3. RED 28.2 - Save Profile Image

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.2 — A user can save a profile image URL to their account (section 28, the Profile in the nav bar feature).

The RED test at src/lib/profile.test.ts calls saveProfileImage from @/lib/profile, which does not exist yet. Add ONLY the saveProfileImage function to src/lib/profile.ts to make RED 28.2 pass.

## 4. RED 28.3 - Display Avatar Image

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.3 — getDisplayAvatar returns the image URL when one is set.

Add ONLY the getDisplayAvatar function to src/lib/profile.ts to make RED 28.3 pass.

## 5. RED 28.4 - Display Avatar Letter

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.4 — getDisplayAvatar falls back to the first letter of the email when no image is set.

Modify ONLY the getDisplayAvatar function body in src/lib/profile.ts to make RED 28.4 pass while keeping RED 28.3 still passing.

## 6. RED 28.6 - NavBar Profile Avatar and Name

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.6 — The NavBar renders the profile avatar and display name on the right when a profile is set.

Modify src/components/NavBar.tsx to make RED 28.6 pass.

## 7. RED 28.7 - NavBar Letter Avatar

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.7 — The NavBar renders the letter avatar when no profile image is set.

Modify src/components/NavBar.tsx to make RED 28.7 pass.

## 8. RED 28.8 - NavBar Set Up Profile Prompt

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.8 — The NavBar renders a "Set up profile" prompt when no profile name is set.

Modify src/components/NavBar.tsx to make RED 28.8 pass.

## 9. RED 28.9 - canPostCatch Requires Profile Name

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.9 — Posting requires a profile name; without one, canPostCatch returns false.

Add ONLY the canPostCatch function to src/lib/profile.ts to make RED 28.9 pass.

## 10. RED 28.10 - PostButton Profile Gate

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 28.10 — When canPostCatch is false, clicking Post on the feed shows the "Set up profile" dialog instead of submitting.

Create ONLY the component file src/components/PostButton.tsx to make RED 28.10 pass.

## 11. RED 29.1 - Create Catch Report

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.1 — A logged-in user can create a catch report scoped to a water type.

Create ONLY the implementation file src/lib/catchReport.ts to make RED 29.1 pass.

## 12. RED 29.2 - Get Catch Reports by Water Type

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.2 — Each feed returns only the posts for its water type.

Add ONLY the getCatchReports function to src/lib/catchReport.ts to make RED 29.2 pass.

## 13. RED 29.3 - Posts Newest First

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.3 — Posts return newest first (real-time feel).

Modify ONLY the getCatchReports function in src/lib/catchReport.ts to make RED 29.3 pass.

## 14. RED 29.4 - Include Author Display Data

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.4 — Each returned post includes the author's display name and avatar.

Modify ONLY src/lib/catchReport.ts to make RED 29.4 pass.

## 15. RED 29.5 - Update Own Post

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.5 — A user can update their OWN post.

Add ONLY the updateCatchReport function to src/lib/catchReport.ts to make RED 29.5 pass.

## 16. RED 29.6 - Cannot Update Someone Else's Post

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.6 — A user cannot update someone else's post.

Modify ONLY the updateCatchReport function in src/lib/catchReport.ts to make RED 29.6 pass.

## 17. RED 29.7 - Delete Own Post

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.7 — A user can delete their OWN post.

Add ONLY the deleteCatchReport function to src/lib/catchReport.ts to make RED 29.7 pass.

## 18. RED 29.8 - Cannot Delete Someone Else's Post

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 29.8 — A user cannot delete someone else's post.

Modify ONLY the deleteCatchReport function in src/lib/catchReport.ts to make RED 29.8 pass.

## 19. RED 30.1 - CatchPost Edit Button Ownership

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 30.1 — A pencil edit button is shown only on the user's own posts.

Create ONLY the component file src/components/CatchPost.tsx to make RED 30.1 pass.

## 20. RED 30.2 - CatchPost Edit Mode

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 30.2 — Clicking the pencil reveals an editable field and a Save button.

Modify ONLY src/components/CatchPost.tsx to make RED 30.2 pass.

## 21. RED 30.3 - CatchPost Save Calls Update

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 30.3 — Clicking Save calls the update handler with the new body.

Modify ONLY src/components/CatchPost.tsx to make RED 30.3 pass.

## 22. RED 30.4 - Delete Confirm Calls Handler

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 30.4 — Confirming the delete dialog calls the delete handler exactly once.

Modify ONLY src/components/CatchPost.tsx to make RED 30.4 pass.

## 23. RED 30.5 - Delete Cancel Does Nothing

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 30.5 — Canceling the delete dialog does nothing.

Modify ONLY src/components/CatchPost.tsx to make RED 30.5 pass.

## 24. RED 31.1 - CatchFeed Polls

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 31.1 — The feed polls for new posts on a fixed interval.

Create ONLY the component file src/components/CatchFeed.tsx to make RED 31.1 pass.

## 25. RED 31.2 - CatchFeed Shows New Posts

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 31.2 — A newly-posted catch appears in the feed without a page refresh.

Modify ONLY src/components/CatchFeed.tsx to make RED 31.2 pass.

## 26. CatchFeed Poll State Fix

The test is still failing, but partially passing now. The mount fetch renders the first batch correctly. However, after the polling interval fires and fetchReports resolves with a second, longer batch, the new post does not appear in the DOM.

Fix src/components/CatchFeed.tsx so that every call to fetchReports — both the mount fetch and each interval poll — stores its resolved array into the posts state.

## 27. RED 32.1 - ProfileForm Fields

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 32.1 — The ProfileForm component renders its fields and a Save button.

Create ONLY the component file src/components/ProfileForm.tsx to make RED 32.1 pass.

## 28. RED 32.2 - ProfileForm Save Values

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 32.2 — Filling the name and clicking Save calls onSave with the entered values.

Modify ONLY src/components/ProfileForm.tsx to make RED 32.2 pass.

## 29. RED 32.3 - ProfileForm Empty Name Error

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 32.3 — An empty profile name shows an error and does not save.

Modify ONLY src/components/ProfileForm.tsx to make RED 32.3 pass.

## 30. RED 32.4 - POST /api/profile

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 32.4 — A POST route handler saves the profile name and image for the logged-in user.

Create ONLY the route file src/app/api/profile/route.ts to make RED 32.4 pass.

## 31. Profile Page Wiring

Read AGENTS.md and follow it strictly. This is an integration/page-wiring task that is verified by eye (not unit-tested).

Create a profile setup page that renders the existing ProfileForm component and wires its onSave to POST the data to the existing /api/profile route, then point the NavBar "Set up profile" link at this new page.

## 32. RED 33.1 - Profile Image Upload Route

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 33.1 — The upload route accepts an image file, writes it to the uploads folder, and returns the saved path.

Create ONLY the route file src/app/api/profile/image/route.ts to make RED 33.1 pass.

## 33. RED 33.2 - ProfileForm File Upload

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is RED 33.2 — The ProfileForm uses a file upload (with a pencil to change the image) instead of a URL field.

Modify ONLY src/components/ProfileForm.tsx to make all tests in that file pass.

## 34. Profile Page Upload Wiring

Read AGENTS.md and follow it strictly. This is integration/page-wiring that is verified by eye (not unit-tested).

Wire the profile page so the ProfileForm's new uploadImage prop actually uploads the picked file to the existing /api/profile/image route and returns the saved path.

## 35. ProfileForm Image Preview RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the ProfileForm image preview RED.

Modify ONLY src/components/ProfileForm.tsx so the form displays a preview image of the uploaded file after a file is picked.

## 36. GET /api/profile RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the GET /api/profile RED.

Add ONLY a GET export to the existing route file src/app/api/profile/route.ts to make the new GET tests pass.

## 37. SiteNav Profile Fetch Wiring

Read AGENTS.md and follow it strictly. This is integration/fetch-wiring that is verified by eye (not unit-tested).

Make SiteNav fetch the current user's profile and pass it to NavBar as the profile prop, so the user's avatar or email-letter fallback shows in the nav.

## 38. NavBar Pencil Edit Link RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the NavBar pencil edit link RED.

Modify ONLY src/components/NavBar.tsx so a profile with a non-empty profileName renders an edit link to /profile with accessible name matching /edit profile/i.

## 39. ProfileForm Preview Size Visual Fix

Read AGENTS.md and follow it strictly. This is a visual/CSS fix that is verified by eye (not unit-tested).

Constrain the profile image preview to a small thumbnail size so it does not render at full natural size and push the Save button off screen.

## 40. GET /api/catch-reports RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the GET /api/catch-reports RED.

Create ONLY the route file src/app/api/catch-reports/route.ts to make the test pass.

## 41. POST /api/catch-reports RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the POST /api/catch-reports RED.

Add ONLY a POST export to the existing route file src/app/api/catch-reports/route.ts, keeping the existing GET handler and its tests unchanged.

## 42. Prompt Markdown File

Create a prompt mark down file in the root folder and add all prompts in there in order.

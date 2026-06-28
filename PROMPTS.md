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

## 43. CatchComposer RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchComposer RED.

Create ONLY the component file src/components/CatchComposer.tsx so users can type a catch report, submit through onPost, and see a Set up profile link when canPostCatch blocks posting.

## 44. Saltwater Catch Reports Page Wiring

Read AGENTS.md and follow it strictly. This is integration/page-wiring that is verified by eye.

Add a Catch reports feed to src/app/saltwater/page.tsx, placed side by side with the existing Saved Spots section, using CatchComposer, CatchFeed, and the catch report/profile routes.

## 45. Saltwater SavedSpotsSection Wrapping

Here is the exact bottom section of src/app/saltwater/page.tsx containing the SavedSpotsSection.

Replace only the SavedSpotsSection element by wrapping it and a new Catch reports column in a side-by-side two-column flex container.

## 46. CatchComposer Double-Submit Prevention RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchComposer double-submit prevention RED.

Modify ONLY src/components/CatchComposer.tsx so while a post is in progress, the Post button is disabled and a second click does not call onPost again.

## 47. DELETE /api/catch-reports RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the DELETE /api/catch-reports RED.

Add ONLY a DELETE export to src/app/api/catch-reports/route.ts that session-checks and calls deleteCatchReport.

## 48. PATCH /api/catch-reports RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the PATCH /api/catch-reports RED.

Add ONLY a PATCH export to src/app/api/catch-reports/route.ts that session-checks and calls updateCatchReport.

## 49. CatchFeed Renders CatchPost RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchFeed renders posts as CatchPost RED.

Modify ONLY src/components/CatchFeed.tsx so posts render through CatchPost with optional currentUserId, onUpdate, and onDelete props.

## 50. Saltwater Edit/Delete Feed Wiring

Read AGENTS.md and follow it strictly. This is integration/page-wiring that is verified by eye.

Wire the CatchFeed on src/app/saltwater/page.tsx so the current user can edit and delete their own posts through PATCH and DELETE /api/catch-reports.

## 51. CatchPost Avatar Size Visual Fix

Read AGENTS.md and follow it strictly. This is a visual/CSS fix verified by eye.

Constrain the author avatar image in src/components/CatchPost.tsx to a small round 40px avatar, and optionally match the letter avatar dimensions.

## 52. Catch Feed Textarea and Post Spacing Visual Fix

Read AGENTS.md and follow it strictly. This is a visual/CSS fix verified by eye.

Make the CatchComposer textarea full width with a reasonable height, and add padding/divider spacing to each CatchPost article.

## 53. CatchPost Double Save/Delete Prevention RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchPost double-delete and double-save prevention RED.

Modify ONLY src/components/CatchPost.tsx so slow save/delete actions cannot be triggered twice and their buttons are disabled while pending.

## 54. Textarea id/name Accessibility Fix

Read AGENTS.md and follow it strictly. This is an accessibility/correctness fix verified by eye.

Add id and name attributes to the CatchComposer textarea and CatchPost edit textarea without changing their behavior.

## 55. formatRelativeTime RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the formatRelativeTime RED.

Create ONLY src/lib/formatRelativeTime.ts to return relative time strings like just now, minutes ago, hours ago, and days ago.

## 56. CatchPost Timestamp RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchPost timestamp RED.

Modify ONLY src/components/CatchPost.tsx to render a visible relative time string using post.createdAt and formatRelativeTime.

## 57. CatchPost Name/Time Spacing Visual Fix

Read AGENTS.md and follow it strictly. This is a visual/CSS polish fix verified by eye.

Add spacing and subtle styling between the CatchPost author name and relative-time span, and show Posting... while CatchComposer is posting.

## 58. CatchPost Avatar/Name Spacing Visual Fix

Read AGENTS.md and follow it strictly. This is a visual/CSS polish fix verified by eye.

Add flex alignment and an 8px gap to the CatchPost avatar/name container.

## 59. CatchComposer Clears After Successful Post RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchComposer clears after a successful post RED.

Modify ONLY src/components/CatchComposer.tsx so successful posts clear the textarea, while failed posts keep the text.

## 60. Freshwater Catch Reports Page Wiring

Read AGENTS.md and follow it strictly. This is integration/page-wiring that is verified by eye.

Wire the catch reports feed onto src/app/freshwater/page.tsx, mirroring the saltwater page but using waterType="freshwater".

## 61. Spinner Component Visual Fix

Read AGENTS.md and follow it strictly. This is a visual fix verified by eye.

Create src/components/Spinner.tsx and render it while CatchComposer, CatchPost save, and CatchPost delete async actions are pending.

## 62. Minimum Spinner Duration UX Refinement

Read AGENTS.md and follow it strictly. This is a UX timing refinement verified by eye.

Create src/lib/withMinimumDuration.ts and wrap posting, saving, and deleting actions so the spinner remains visible for at least about 400ms.

## 63. Spinner Global CSS Animation Fix

Read AGENTS.md and follow it strictly. This is a visual fix verified by eye.

Move the spinner keyframes and class into src/app/globals.css and simplify src/components/Spinner.tsx to use the global class.

## 64. Spinner Beside Button Visual Fix

Read AGENTS.md and follow it strictly. This is a visual fix verified by eye.

Make the spinner larger/gold and move it beside the Post, Save, and Confirm buttons while keeping the button labels stable.

## 65. CatchFeed refreshKey RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchFeed immediate refresh on refreshKey change RED.

Modify ONLY src/components/CatchFeed.tsx to accept refreshKey and refetch immediately when it changes without double-fetching on mount.

## 66. Saltwater and Freshwater refreshKey Wiring

Read AGENTS.md and follow it strictly. This is integration/page-wiring verified by eye.

Wire refreshKey into both saltwater and freshwater pages so post, update, and delete actions immediately refresh CatchFeed.

## 67. CatchPost Closes Editor After Saving RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the CatchPost closes the editor after saving RED.

Modify ONLY src/components/CatchPost.tsx so a successful save exits edit mode.

## 68. Species Dropdown RED

Read AGENTS.md and TESTING.md in the repository root, and follow them strictly. We are working through TESTING.md in sequence, and the current test is the Species dropdown RED.

Modify ONLY src/components/SightingRateSearch.tsx so the Species field becomes a select dropdown populated from getSpeciesForWaterType.

## 69. SightingRateSearch Specific Dropdown Edit

Read AGENTS.md and TESTING.md and follow them strictly. Modify ONLY src/components/SightingRateSearch.tsx.

Add waterType, import getSpeciesForWaterType and WaterType, compute speciesOptions, and replace the Species input with a select whose option labels are common names and values are scientific names.

## 70. Append Missing Prompts Without Duplicates

Add the prompts in the PROMPTS.md file no duplicates.

## 71. RED 37.1 - Saltwater Agent Date Confirmation Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 37.1 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Create the minimal implementation at src/lib/saltwaterAgent.ts so that one test passes — nothing more.

Do not implement tool dispatch, tool registry, individual tool functions, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 72. RED 37.3 - Saltwater Agent Six API Sources Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 37.3 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement tool dispatch, tool registry, individual tool functions, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 73. RED 37.4 - Saltwater Agent Out-of-Scope Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 37.4 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement tool dispatch, tool registry, individual tool functions, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 74. RED 37.6 - Saltwater Agent Common-Fished Species Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 37.6 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement tool dispatch, tool registry, individual tool functions, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 75. RED 37.7 - Saltwater Agent Specific Species Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 37.7 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement tool dispatch, tool registry, individual tool functions, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 76. RED 37.8 - Saltwater Agent Tool Registry

Read AGENTS.md and TESTING.md file.

Implement RED 37.8 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Create the minimal implementation at src/lib/saltwaterAgentTools.ts so that one test passes — nothing more.

Do not implement tool dispatch, individual tool functions, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 77. RED 37.9 - Saltwater Tool Unknown Dispatcher Shape

Read AGENTS.md and TESTING.md file.

Implement RED 37.9 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement individual tool functions, the orchestration loop, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 78. RED 37.10 - Saltwater Forecast Tool

Read AGENTS.md and TESTING.md file.

Implement RED 37.10 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement the other five tool functions, orchestration loop, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 79. RED 37.11 - Saltwater Marine Tool

Read AGENTS.md and TESTING.md file.

Implement RED 37.11 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement the remaining tool functions, orchestration loop, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 80. RED 37.12 - Saltwater OBIS Tool

Read AGENTS.md and TESTING.md file.

Implement RED 37.12 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement the remaining tool functions, orchestration loop, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 81. RED 37.13 - Saltwater GBIF Tool

Read AGENTS.md and TESTING.md file.

Implement RED 37.13 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement the remaining tool functions, orchestration loop, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 82. RED 37.14 - Saltwater USGS Tool

Read AGENTS.md and TESTING.md file.

Implement RED 37.14 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement the remaining tool functions, orchestration loop, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 83. RED 37.15 - Saltwater NOAA Tool

Read AGENTS.md and TESTING.md file.

Implement RED 37.15 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update the existing implementation at src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Do not implement the orchestration loop or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 84. RED 37.16 - Saltwater Agent Sends Tool Registry

Read AGENTS.md and TESTING.md file.

Implement RED 37.16 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement tool dispatch, multi-turn loop, max iteration safety, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 85. RED 37.17 - Saltwater Agent Single Tool Call

Read AGENTS.md and TESTING.md file.

Implement RED 37.17 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement multi-turn chaining, max iteration safety, tool null recovery, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 86. RED 37.18 - Saltwater Agent Multi-Turn Tool Chain

Read AGENTS.md and TESTING.md file.

Implement RED 37.18 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement max iteration safety, tool null recovery, or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 87. RED 37.19 - Saltwater Agent Max Iteration Safety

Read AGENTS.md and TESTING.md file.

Implement RED 37.19 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the existing implementation at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

Do not implement tool null recovery or any other behaviors yet. Those are later REDs in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 88. Add Remaining Prompts

Add all remaining prompts to PROMPTS.md file.

## 89. RED 37.21 - Saltwater Chat Route Success Path

Read AGENTS.md and TESTING.md file.

Implement RED 37.21 from TESTING.md Section 37. The failing test is at src/app/api/saltwater-chat/route.test.ts. Create the minimal implementation at src/app/api/saltwater-chat/route.ts so that one test passes — nothing more.

Do not implement input validation, error handling, or any other behaviors yet. Those are later REDs (37.22 and 37.23) in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 90. RED 37.22 - Saltwater Chat Route Question Validation

Read AGENTS.md and TESTING.md file.

Implement RED 37.22 from TESTING.md Section 37. The failing test is at src/app/api/saltwater-chat/route.test.ts. Update the existing implementation at src/app/api/saltwater-chat/route.ts minimally so that test passes — nothing more.

Do not implement error handling for runSaltwaterAgent throws or any other behaviors yet. That is a later RED (37.23) in Section 37 that has not been written as a test yet.

Tell Jacqueline what command to run.

## 91. RED 37.23 - Saltwater Chat Route Agent Error

Read AGENTS.md and TESTING.md file.

Implement RED 37.23 from TESTING.md Section 37. The failing test is at src/app/api/saltwater-chat/route.test.ts. Update the existing implementation at src/app/api/saltwater-chat/route.ts minimally so that test passes — nothing more.

Do not implement any component-level behaviors or other behaviors yet. Those are later REDs (37.24+) in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 92. RED 37.24 - SaltwaterChat Initial Render

Read AGENTS.md and TESTING.md file.

Implement RED 37.24 from TESTING.md Section 37. The failing test is at src/components/SaltwaterChat.test.tsx. Create the minimal implementation at src/components/SaltwaterChat.tsx so that one test passes — nothing more.

Do not implement form submission, fetch wiring, response display, spinner, error handling, or history passing yet. Those are later REDs (37.25–37.28) in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 93. Add Remaining Prompts Again

Add the remaining prompts to PROMPTS.md file.

## 94. RED 37.25 - SaltwaterChat Submit and Response

Read AGENTS.md and TESTING.md file.

Implement RED 37.25 from TESTING.md Section 37. The failing test is at src/components/SaltwaterChat.test.tsx. Update the existing implementation at src/components/SaltwaterChat.tsx minimally so that test passes — nothing more.

Do not implement spinner, error handling, or history passing yet. Those are later REDs (37.26, 37.27, 37.28) in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 95. RED 37.26 - SaltwaterChat Spinner

Read AGENTS.md and TESTING.md file.

Implement RED 37.26 from TESTING.md Section 37. The failing test is at src/components/SaltwaterChat.test.tsx. Update the existing implementation at src/components/SaltwaterChat.tsx minimally so that test passes — nothing more.

Do not implement history passing or error handling yet. Those are later REDs (37.27, 37.28) in Section 37 that have not been written as tests yet.

Tell Jacqueline what command to run.

## 96. RED 37.27 - SaltwaterChat History

Read AGENTS.md and TESTING.md file.

Implement RED 37.27 from TESTING.md Section 37. The failing test is at src/components/SaltwaterChat.test.tsx. Update the existing implementation at src/components/SaltwaterChat.tsx minimally so that test passes — nothing more.

Do not implement error handling yet. That is a later RED (37.28) in Section 37 that has not been written as a test yet.

Tell Jacqueline what command to run.

## 97. RED 37.28 - SaltwaterChat Error Handling

Read AGENTS.md and TESTING.md file.

Implement RED 37.28 from TESTING.md Section 37. The failing test is at src/components/SaltwaterChat.test.tsx. Update the existing implementation at src/components/SaltwaterChat.tsx minimally so that test passes — nothing more.

Tell Jacqueline what command to run.

## 98. RED 37.24 Through 37.28 - SaltwaterChat Full Minimal Component

Read AGENTS.md and TESTING.md file.

The 5 failing tests in src/components/SaltwaterChat.test.tsx (RED 37.24 through RED 37.28 in TESTING.md Section 37) need an implementation. Create src/components/SaltwaterChat.tsx with the minimal implementation required to make all 5 tests pass — nothing more.

The tests describe:
- A labeled text input for the question (an <input>, not a textarea)
- A submit button
- A POST to /api/saltwater-chat with { question, history } in the body
- Rendering the agent's response text
- A spinner with role="status" while the fetch is in flight, with the submit button disabled
- Sending the prior conversation history on follow-up requests
- An error message containing "something went wrong" when the fetch fails

There is an existing src/components/Spinner component you can import.

There is also a 6th failing test in the saltwater page test file that imports SaltwaterChat — it will pass automatically once the component exists.

Do not implement anything beyond what the tests require. No chat-bubble UI, no scroll container, no styling beyond what the tests assert.

Tell Jacqueline what command to run.

## 99. RED 37.29 - Saltwater Chat Route Forwards History

RED 37.29 — POST /api/saltwater-chat forwards body.history to runSaltwaterAgent

The test posts a question plus a non-empty history array to the route and asserts runSaltwaterAgent is called with both fields. It currently fails because the route only extracts body.question and drops history silently. The component already sends history (covered by RED 37.27), but no test until now asserted the route forwards it — which is why the agent loses conversational context in dev.

275 other tests still pass.

## 100. RED 37.30 - Saltwater Agent Sends History to OpenAI

Read AGENTS.md and TESTING.md file.

Implement RED 37.30 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update the agent at src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test expects runSaltwaterAgent to accept a history parameter (an array of { role: 'user' | 'assistant'; content: string }) on its input, and to include those prior turns as { role, content } entries in the messages array sent to the OpenAI chat completion, positioned BEFORE the new question.

The system prompt should remain first in the messages array. The new question should remain last.

Do not modify any other tool, route, or component files.

Tell Jacqueline what command to run.

## 101. RED 37.31 - Saltwater Tool Registry Names Dispatch

Read AGENTS.md and TESTING.md file.

Implement RED 37.31 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update src/lib/saltwaterAgentTools.ts and/or src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test asserts that every tool declared in SALTWATER_AGENT_TOOLS, when its registered `name` is passed to runSaltwaterTool along with valid arguments, returns something other than { error: 'unknown_tool' }. The current registry uses short names (forecast, marine, obis, gbif, usgs, noaa) but the dispatcher only handles three of them and uses different long names internally. The registry names and the dispatcher must agree, and all six tools must be reachable through runSaltwaterTool.

Do not modify the tool function implementations (fetchSaltwaterForecast, etc.). Do not change tool parameter schemas. Do not change the system prompt. Those are later REDs.

Tell Jacqueline what command to run.

## 102. RED 37.32 - Saltwater Tool Parameter Schemas

Read AGENTS.md and TESTING.md file.

Implement RED 37.32 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgentTools.test.ts. Update src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

The test asserts each tool in SALTWATER_AGENT_TOOLS declares the parameters its underlying function actually needs in its JSON Schema, with a non-empty `description` on each property and each parameter listed in `required`. Specifically:

- forecast: latitude (number), longitude (number), targetDate (string)
- marine: latitude (number), longitude (number), targetDate (string)
- obis: latitude (number), longitude (number)
- gbif: latitude (number), longitude (number)
- usgs: siteId (string)
- noaa: stationId (string), targetDate (string)

The currently-shared `emptyParameters` object needs to be replaced with per-tool parameter schemas. The SaltwaterAgentTool type may need its `properties` field widened from `Record<string, never>` to a real property-schema type to accommodate the new schemas.

Do not modify tool function bodies, the dispatcher, the system prompt, or the agent orchestration. Do not change which six tools exist in the registry.

Tell Jacqueline what command to run.

## 103. RED 37.33 - Saltwater Agent Honest Tool Failure Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 37.33 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test imports `saltwaterAgentSystemPrompt` from saltwaterAgent.ts and asserts the system prompt contains:
1. Honesty enforcement language matching: /never invent|do not fabricate|do not (make up|invent)|cannot use training data|honest data|do not guess/i
2. Tool-failure handling language matching: /(tool|forecast|data|api).{0,40}(fail|error|null|empty|missing|cannot|unable)/i

Two changes are required:
1. Export `saltwaterAgentSystemPrompt` so the test can import it (it is currently a private const).
2. Add language to the prompt that satisfies both regexes. The language should instruct the model that if a tool returns null, empty, or an error, the agent must say so honestly and never fall back on training data or invent values like typical weather averages. This aligns with AnglerCast's honest-data thesis from the README ("Real data computes the facts. The AI explains and assembles — it does not invent").

Do not modify the agent orchestration loop, the tool registry, the tools themselves, or any test files.

Tell Jacqueline what command to run.

## 104. RED 37.34 - Saltwater Agent Uses Shared Tool Dispatcher

Read AGENTS.md and TESTING.md file.

Implement RED 37.34 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the agent calls the shared `runSaltwaterTool` exported from '@/lib/saltwaterAgentTools' with the tool name (e.g. 'forecast') and the parsed arguments object. The agent currently has a private `runSupportedTool` function that only handles three long names (fetchSaltwaterForecast, fetchSaltwaterMarine, fetchSaltwaterNoaa) and returns { error: 'unknown_tool' } for everything else.

Required changes:
1. Import `runSaltwaterTool` from '@/lib/saltwaterAgentTools'.
2. Replace the call site `runSupportedTool(toolCall.function.name, toolCall.function.arguments)` with a call to `runSaltwaterTool(toolCall.function.name, parsedArguments)`, where `parsedArguments` is the parsed JSON object from `toolCall.function.arguments`.
3. Delete the private `runSupportedTool` function and its helper parsers (`parseLocationDateToolArguments`, `parseStationDateToolArguments`) since `runSaltwaterTool` already handles argument coercion per RED 37.31.

Do not modify any other behavior, the system prompt, or test files. The diagnostic console.log lines currently in the file can stay; we will remove them in a separate cleanup pass.

Tell Jacqueline what command to run.

## 105. Add Remaining Prompts

Add remaining prompts in PROMPTS.md file.

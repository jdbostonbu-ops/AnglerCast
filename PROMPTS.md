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

## 106. RED 37.40 - Saltwater Open-Meteo Imperial Units

Read AGENTS.md and TESTING.md file.

Implement RED 37.40 from TESTING.md Section 37. The failing tests are at src/lib/saltwaterAgentTools.test.ts. Update src/lib/saltwaterAgentTools.ts minimally so both tests pass — nothing more.

The tests assert:
1. fetchSaltwaterForecast builds an Open-Meteo Forecast URL with three additional query parameters: temperature_unit=fahrenheit, wind_speed_unit=mph, precipitation_unit=inch.
2. fetchSaltwaterMarine builds an Open-Meteo Marine URL with one additional query parameter: length_unit=imperial.

Add the corresponding `url.searchParams.set(...)` calls in each function. Do not change any other tool function, the tool registry, the dispatcher, or the agent.

Tell Jacqueline what command to run.

## 107. RED 37.41 - Saltwater Agent Handles Missing Choices

Read AGENTS.md and TESTING.md file.

Implement RED 37.41 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test sends an OpenAI response body that has no `choices` field (e.g. an error payload like `{ error: { message: 'rate limit exceeded' } }`). The agent currently crashes with `Cannot read properties of undefined (reading '0')` because the code accesses `completion.choices[0]?.message` without guarding against `completion.choices` itself being undefined.

Fix: make the access defensive. Two existing lines need to handle the case where `completion.choices` may be undefined:
- Line accessing `completion.choices[0]?.message` after the first OpenAI call
- Same line inside the while loop after follow-up OpenAI calls

A reasonable pattern is to extract a small helper or just use `completion.choices?.[0]?.message` (note the `?.` BEFORE `[0]`).

The agent should return a `SaltwaterAgentResult` shape — either `{ response: '' }` or any non-crashing object — when this happens. Do not invent an error reason that isn't already in the SaltwaterAgentResult union; the test only asserts the function does not throw and returns a defined object.

Do not modify the system prompt, tool registry, dispatcher, or any test files.

Tell Jacqueline what command to run.

## 108. RED 37.42 - Saltwater Common-Fished Species Context

Read AGENTS.md and TESTING.md file.

Implement RED 37.42 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test asserts that the OpenAI messages array sent in the request body contains the saltwater common-fished species list. Specifically, the names "Striped Bass", "Bluefish", and "Atlantic Cod" must appear somewhere in the joined content of the messages array.

Implementation requirements:
1. Import `getSpeciesForWaterType` from '@/lib/species'.
2. Call `getSpeciesForWaterType('saltwater')` to get the species list.
3. Include those species names in the messages array sent to OpenAI — either inside the system prompt content (preferred) or as an additional system message inserted right after the main system prompt. Each species should be referenced by both common name and scientific name so OpenAI can use the scientific name as a `scientificName` argument when calling OBIS or GBIF.

Do not modify the tool registry, the dispatcher, or any test files. Do not modify the existing `saltwaterAgentSystemPrompt` constant body (the existing prompt assertions in RED 37.1 through RED 37.5 and RED 37.33 must still pass) — append the species list as a separate string concatenation or as a second system message.

Tell Jacqueline what command to run.

## 109. RED 37.43 - Saltwater Agent Handles Parallel Tool Calls

Read AGENTS.md and TESTING.md file.

Implement RED 37.43 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test asserts that when OpenAI returns an assistant message containing multiple tool_calls in a single message (e.g. two parallel calls — one to 'obis' and one to 'gbif'), the agent must:
1. Dispatch runSaltwaterTool once per tool_call in that message (so two dispatches total for two tool_calls).
2. Push the assistant message back to OpenAI exactly once, with N tool messages (one per tool_call_id) following it, before requesting the next completion.

The current loop reads only `message.tool_calls?.[0]` and dispatches a single tool. The assistant message it pushes back to OpenAI still contains both tool_calls, but only one tool response is attached. OpenAI rejects this with "An assistant message with 'tool_calls' must be followed by tool messages responding to each 'tool_call_id'".

Required change: iterate over all entries in `message.tool_calls`, dispatch each one through runSaltwaterTool, then push the single assistant message and one tool message per tool_call_id. Then continue the loop. The maxToolIterations cap counts iterations (each round-trip), not individual tool dispatches within an iteration.

Do not modify the system prompt, tool registry, dispatcher, or any test files. The existing single-tool_call tests must continue to pass.

Tell Jacqueline what command to run.

## 110. RED 37.44 - Saltwater Species Questions Redirect

Read AGENTS.md and TESTING.md file.

Implement RED 37.44 from TESTING.md Section 37. The failing test is at src/lib/saltwaterAgent.test.ts. Update src/lib/saltwaterAgent.ts minimally so that test passes — nothing more.

The test asserts:
1. When the agent is asked an open-ended species question ("What fish can I find in Boston, MA on July 4 2026?"), runSaltwaterTool is NOT called at all.
2. The system prompt sent to OpenAI contains all of the following:
   - A mention of OBIS or GBIF
   - A reference to the Sighting-rate search (matching /sighting.?rate|sighting search/i)
   - A reference to the Explore tab or its FAQ agent (matching /explore tab|FAQ/i)
   - Explicit language instructing the agent not to call those tools (matching /do not call|never call|don't call|redirect/i)

Implementation:
- Update the saltwaterAgentSystemPrompt constant (or append to it) so the prompt instructs OpenAI to redirect species questions to the in-app components instead of calling OBIS or GBIF. The redirect explanation should include:
  - The reason: OBIS contains millions of records, queries too large for the context window
  - That AnglerCast curated 40 commonly fished species (already injected via RED 37.42)
  - For "what fish in [location]" questions: point to the Sighting-rate search below on the /saltwater page, mentioning clicking a species, picking a month, and interacting with the map
  - For "tell me about [species]" questions: point to the Explore tab and its FAQ agent
  - Explicit "do not call obis or gbif for these question types" instruction
- Do not remove OBIS or GBIF from SALTWATER_AGENT_TOOLS or from the dispatcher. They stay registered intentionally.

Do not modify any other test files, the tool registry, the dispatcher, the tool functions, or the species list injection logic. Existing tests must continue to pass.

Tell Jacqueline what command to run.

## 111. REFACTOR 37.47 - Remove Obsolete Saltwater Species Prompt Language

Read AGENTS.md and TESTING.md file.

Implement REFACTOR 37.47 from TESTING.md Section 37.6. Two failing tests in src/lib/saltwaterAgent.test.ts depend on this change:
- REFACTOR 37.45 (asserts the system prompt does NOT match /narrow.{0,80}(species|list)/i)
- REFACTOR 37.46 (asserts the system prompt does NOT match /query.{0,80}(species|named|directly)/i)

Update src/lib/saltwaterAgent.ts minimally so both tests pass. Edit the saltwaterAgentSystemPrompt constant to remove the two obsolete sentences:

1. The sentence beginning "For open-ended species questions where more than 40 species would match, narrow the answer to..."
2. The sentence beginning "When the user names a specific species, query that named species directly..."

After the edit, the prompt should contain only the redirect-based species instructions added in GREEN 37.44 (which already point to the Sighting-rate search and Explore tab) plus the unchanged date-confirmation, six-data-sources declaration, out-of-scope-decline, honest-data, and tool-failure-handling instructions.

These existing tests must still pass after your edit:
- "instructs the model to confirm the user date before calling any tools" (RED 37.1)
- "declares exactly the six APIs in the system prompt as the only data sources" (RED 37.2)
- "instructs the model to decline out-of-scope requests and suggest an external source" (RED 37.3)
- "RED 37.33 — system prompt instructs the agent never to invent data when a tool fails"
- "RED 37.42 — injects the saltwater common-fished species list into the OpenAI request context"
- "RED 37.44 — redirects species questions to in-app components instead of dispatching OBIS or GBIF"

Do not modify any test files. Do not modify the tool registry, the dispatcher, or any tool functions.

Tell Jacqueline what command to run.

## 112. REFACTOR 37.52 - Remove OBIS and GBIF from Saltwater Agent Registry

Read AGENTS.md and TESTING.md file.

Implement REFACTOR 37.52 from TESTING.md Section 37.7. The failing test is at src/lib/saltwaterAgentTools.test.ts (REFACTOR 37.48 — registry expects four tools). Update src/lib/saltwaterAgentTools.ts minimally so that test passes — nothing more.

Required changes in src/lib/saltwaterAgentTools.ts:
1. Remove the two entries for 'obis' and 'gbif' from the SALTWATER_AGENT_TOOLS array. After the change, the array contains exactly four tools: forecast, marine, usgs, noaa.
2. Remove the two `if (name === 'obis')` and `if (name === 'gbif')` branches from the runSaltwaterTool function. After the change, runSaltwaterTool dispatches forecast, marine, usgs, and noaa by their registered names and returns { error: 'unknown_tool' } for any other name (including 'obis' and 'gbif').
3. Keep the fetchSaltwaterObis and fetchSaltwaterGbif exported functions in the file. They are not used by the agentic RAG, but the separate Sighting-rate search component depends on them and they must remain exported.

Do not modify any test files. Do not modify the tool parameter schemas. Do not modify the fetch function bodies. Do not modify the agent in src/lib/saltwaterAgent.ts. Existing tests that may temporarily expect six tools or reference obis/gbif in maps will be addressed in REFACTOR 37.49, 37.50, and 37.51 — leave them as-is for now.

Tell Jacqueline what command to run.

## 113. RED 38.1 - Freshwater Agent Date Confirmation Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 38.1 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Create src/lib/freshwaterAgent.ts with the minimal implementation required to make that test pass — nothing more.

The test expects:
1. An exported async function `runFreshwaterAgent` that accepts an object with at least a `question: string` field.
2. The function makes a POST to https://api.openai.com/v1/chat/completions with a JSON body containing a `messages` array.
3. At least one system message in that array contains date-confirmation language matching the regex /confirm.{0,40}date|propose.{0,40}date/i.
4. The function returns an object with a `response` field set to the content from the OpenAI assistant message.

Do NOT implement: tool dispatch, history parameter, species list injection, redirect language, the honest-data rule, or any other prompt sections beyond date confirmation. Those are separate RED tests that have not yet been written. The minimal-code rule applies — only what RED 38.1 requires.

Tell Jacqueline what command to run.

## 114. RED 38.2 - Freshwater Agent Two Data Sources Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 38.2 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the system prompt sent to OpenAI:
1. Mentions "Open-Meteo Forecast" (matching /open[-\s]?meteo.{0,20}forecast/i)
2. Mentions "USGS" (matching /usgs/i)
3. Does NOT mention "Open-Meteo Marine" (no match for /open[-\s]?meteo.{0,20}marine/i)
4. Does NOT mention "OBIS" (no match for /\bOBIS\b/)
5. Does NOT mention "GBIF" (no match for /\bGBIF\b/)
6. Does NOT mention "NOAA CO-OPS" (no match for /NOAA.{0,20}CO-OPS/i)

Update the system prompt to add a sentence declaring Open-Meteo Forecast and USGS as the only two data sources for this freshwater agent. Do not mention any other APIs. Do not add tool registry, species list, redirect language, or honest-data rule — those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 115. Add Remaining Prompts

Add all remaining prompts to PROMPTS.md file.

## 116. RED 38.3 - Freshwater Agent Out-of-Scope Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 38.3 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the system prompt sent to OpenAI contains:
1. Language about declining out-of-scope requests, matching /do not have|don't have|outside.{0,40}sources/i
2. A pointer to an external source like Google Maps, matching /google maps|external source/i

Update the system prompt to add a sentence instructing the model that if the user asks for something outside the two declared data sources (Open-Meteo Forecast and USGS), it should honestly say it does not have that data source, name the sources it does have, and suggest an external source such as Google Maps. Do not add the species list, redirect rules, tool registry, or honest-data rule — those are separate REDs.

Tell Jacqueline what command to run.

## 117. RED 38.4 - Freshwater Open-Ended Species Redirect

Read AGENTS.md and TESTING.md file.

Implement RED 38.4 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the system prompt sent to OpenAI contains:
1. A reference to the Sighting-rate search (matching /sighting.?rate|sighting search/i)
2. A reference to the freshwater page (matching /freshwater page/i)
3. Explicit language instructing the agent not to call tools for these questions (matching /do not call|never call|don't call|redirect/i)

Update the system prompt to add language that instructs the model: for open-ended "what fish in [location]" questions, redirect the user to the Sighting-rate search below on the freshwater page (click a species, pick a month, interact with the map) and do not call any tools for these questions.

Do not add the specific-species redirect (RED 38.5), the destination redirect (RED 38.6), the honest-data rule (RED 38.7), or the species list injection (RED 38.22). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 118. RED 38.5 - Freshwater Specific Species Redirect

Read AGENTS.md and TESTING.md file.

Implement RED 38.5 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the system prompt sent to OpenAI:
1. Contains a reference to the Explore tab or its FAQ agent (matching /explore tab|FAQ/i)
2. Does NOT contain language instructing the agent to query species directly (no match for /query.{0,80}(species|named|directly)/i)

Update the system prompt to add language that instructs the model: for "tell me about [species]" questions, redirect the user to the Explore tab at the top of the page and its FAQ agent for species information. Do not include any language about querying a named species directly.

Do not add the destination redirect (RED 38.6), the honest-data rule (RED 38.7), the species list injection (RED 38.22), or any tool dispatch logic. Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 119. RED 38.6 - Freshwater Destination Commonality Redirect

Read AGENTS.md and TESTING.md file.

Implement RED 38.6 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the system prompt sent to OpenAI contains:
1. A reference to a Destination component (matching /destination/i)
2. A reference to the Explore page (matching /explore page/i)

Update the system prompt to add language that instructs the model: for "what's common at [destination]" or destination-based species commonality questions, redirect the user to the Destination component on the Explore page, which provides species commonality information based on a destination's latitude and longitude. Do not call a tool for these questions.

Do not add the honest-data rule (RED 38.7), the species list injection (RED 38.22), or any tool dispatch logic. Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 120. RED 38.7 - Freshwater Agent Honest Data Prompt

Read AGENTS.md and TESTING.md file.

Implement RED 38.7 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the system prompt sent to OpenAI contains:
1. Honesty enforcement language matching /never invent|do not fabricate|do not (make up|invent)|cannot use training data|honest data|do not guess/i
2. Tool-failure handling language matching /(tool|forecast|data|api).{0,80}(fail|error|null|empty|missing|cannot|unable)/i

Update the system prompt to add language that instructs the model: never invent, do not guess, and cannot use training data to fill missing facts. If a tool, forecast, data API, or source returns null, empty, missing data, an error, or cannot be reached, say that honestly and do not make up values such as typical weather averages. This aligns with AnglerCast's honest-data thesis ("Real data computes the facts. The AI explains and assembles — it does not invent").

Do not add the species list injection (RED 38.22), tool registry, tool dispatch, or any other logic. Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 121. RED 38.8 - Freshwater Agent Tool Registry

Read AGENTS.md and TESTING.md file.

Implement RED 38.8 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgentTools.test.ts. Create src/lib/freshwaterAgentTools.ts with the minimal implementation required to make that test pass — nothing more.

The test asserts an exported constant `FRESHWATER_AGENT_TOOLS` is an array of exactly two OpenAI-shaped function tools with:
- Names: 'forecast' and 'usgs' (no other names)
- Each tool's `type` is 'function'
- Each tool's `function.name` is a non-empty string
- Each tool's `function.description` is a non-empty string
- Each tool's `function.parameters.type` is 'object'
- Each tool's `function.parameters.properties` is defined
- Each tool's `function.parameters.required` is an array

The test does NOT yet assert specific parameter schemas — that is RED 38.10, a separate test not yet written. For now the parameters object only needs to be a valid object schema with a properties field and a required array (both can be minimal). Reference src/lib/saltwaterAgentTools.ts for the established pattern, but only implement what RED 38.8 requires.

Do NOT implement: runFreshwaterTool dispatcher (RED 38.9), parameter schemas (RED 38.10), imperial units (RED 38.11), or the actual fetch functions (RED 38.12 and RED 38.13). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 122. RED 38.9 - Freshwater Tool Dispatcher

Read AGENTS.md and TESTING.md file.

Implement RED 38.9 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgentTools.test.ts. Update src/lib/freshwaterAgentTools.ts minimally so that test passes — nothing more.

The test asserts:
1. An exported async function `runFreshwaterTool(name: string, args: Record<string, unknown>)` exists.
2. When called with 'forecast' and valid arguments ({ latitude, longitude, targetDate }), it returns something OTHER than { error: 'unknown_tool' }.
3. When called with 'usgs' and valid arguments ({ siteId }), it returns something OTHER than { error: 'unknown_tool' }.
4. When called with any unregistered name (e.g. 'not_a_real_tool'), it returns { error: 'unknown_tool' }.

Implementation:
- Add two minimal exported fetch functions, fetchFreshwaterForecast and fetchFreshwaterUsgs. The test mocks the global fetch to return an empty JSON object, so the fetch functions just need to call fetch and return its parsed JSON. They do not yet need to build correct URLs, request imperial units, or parse specific response shapes — those are RED 38.11, 38.12, and 38.13 (separate REDs not yet written).
- Add a runFreshwaterTool dispatcher that switches on the tool name, calls the matching fetch function with coerced arguments (use small helpers to safely read latitude/longitude/targetDate as numbers/strings, and siteId as a string), and falls through to { error: 'unknown_tool' } for any other name.

Reference src/lib/saltwaterAgentTools.ts for the established dispatcher pattern (readNumberArg, readStringArg helpers, switch-like if/return structure). Only implement what RED 38.9 requires — minimal code only.

Do not modify any other files. Do not yet implement parameter schemas (RED 38.10), imperial units (RED 38.11), specific URL building (RED 38.12 and RED 38.13), or any agent orchestration logic.

Tell Jacqueline what command to run.

## 123. RED 38.10 - Freshwater Tool Parameter Schemas

Read AGENTS.md and TESTING.md file.

Implement RED 38.10 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgentTools.test.ts. Update src/lib/freshwaterAgentTools.ts minimally so that test passes — nothing more.

The test asserts each tool in FRESHWATER_AGENT_TOOLS declares the parameters its underlying function actually needs in its JSON Schema, with a non-empty `description` on each property and each parameter listed in `required`. Specifically:

- forecast: latitude (number), longitude (number), targetDate (string)
- usgs: siteId (string)

The currently-minimal parameter schemas need to be replaced with per-tool schemas. If the SaltwaterAgentTool-style type is being reused with a constrained `properties` type, widen it to accept real property-schema entries with type and description.

Do not modify the runFreshwaterTool dispatcher, the fetch function bodies, or any test files.

Tell Jacqueline what command to run.

## 124. RED 38.11 - Freshwater Forecast Imperial Units

Read AGENTS.md and TESTING.md file.

Implement RED 38.11 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgentTools.test.ts. Update src/lib/freshwaterAgentTools.ts minimally so that test passes — nothing more.

The test asserts that when fetchFreshwaterForecast is called, the URL it builds for Open-Meteo Forecast (api.open-meteo.com) includes three query parameters:
- temperature_unit=fahrenheit
- wind_speed_unit=mph
- precipitation_unit=inch

Update fetchFreshwaterForecast to add the corresponding url.searchParams.set(...) calls for these three parameters. Reference src/lib/saltwaterAgentTools.ts fetchSaltwaterForecast for the established pattern.

Do not modify the URL builder for fetchFreshwaterUsgs (USGS uses native parameter codes and is not affected by Open-Meteo unit parameters). Do not modify any other tool, the dispatcher, the registry, or any test files.

Tell Jacqueline what command to run.

## 125. RED 38.12 - Freshwater Forecast URL and Response

Read AGENTS.md and TESTING.md file.

Implement RED 38.12 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgentTools.test.ts. Update src/lib/freshwaterAgentTools.ts minimally so that test passes — nothing more.

The test asserts that when fetchFreshwaterForecast is called, the URL it builds for api.open-meteo.com includes:
- latitude query parameter equal to the input latitude as a string
- longitude query parameter equal to the input longitude as a string
- start_date query parameter equal to the input targetDate
- end_date query parameter equal to the input targetDate
- hourly query parameter that contains 'temperature_2m', 'wind_speed_10m', and 'precipitation'

The test also asserts the response is parsed and returned (the test verifies result.latitude equals the mocked latitude).

Update fetchFreshwaterForecast to:
1. Build the URL with the required searchParams (latitude, longitude, start_date, end_date, hourly comma-separated list including temperature_2m, wind_speed_10m, precipitation). Keep the existing imperial unit parameters from GREEN 38.11.
2. Parse the JSON response and return it (typed appropriately so the test's result.latitude access compiles cleanly).

Reference src/lib/saltwaterAgentTools.ts fetchSaltwaterForecast for the established pattern.

Do not modify fetchFreshwaterUsgs, the runFreshwaterTool dispatcher, the registry, or any test files.

Tell Jacqueline what command to run.

## 126. RED 38.13 - Freshwater USGS Tool

Read AGENTS.md and TESTING.md file.

Implement RED 38.13 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgentTools.test.ts. Update src/lib/freshwaterAgentTools.ts minimally so that test passes — nothing more.

The test asserts:
1. fetchFreshwaterUsgs builds a URL where hostname is 'waterservices.usgs.gov', pathname is '/nwis/iv/', sites=<input siteId>, and format=json.
2. The returned object has the shape:
   { siteName: string, latitude: number | null, longitude: number | null, parameters: Array<{ variableName: string, unit: string, latestValue: string, latestTime: string }> }
3. siteName comes from value.timeSeries[0].sourceInfo.siteName
4. latitude comes from value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude
5. longitude comes from value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude
6. parameters is built by mapping each timeSeries entry to { variableName, unit, latestValue, latestTime } extracted from variable.variableName, variable.unit.unitCode, values[0].value[0].value, and values[0].value[0].dateTime

Reference src/lib/saltwaterAgentTools.ts fetchSaltwaterUsgs for the established pattern (it returns exactly this shape and parses exactly these fields). The freshwater version should match.

Do not add a parameterCodes query parameter unless required by the test (it is not). Do not modify fetchFreshwaterForecast, the dispatcher, the registry, or any test files.

Tell Jacqueline what command to run.

## 127. RED 38.14 - Freshwater Agent Sends Tool Registry

Read AGENTS.md and TESTING.md file.

Implement RED 38.14 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the OpenAI request body contains:
1. A user message with content matching the input question (e.g. 'Where should I fish this Saturday?')
2. A `tools` field that is an array of length 2

Implementation:
1. Import FRESHWATER_AGENT_TOOLS from '@/lib/freshwaterAgentTools'.
2. Add the FRESHWATER_AGENT_TOOLS array to the OpenAI request body as the `tools` field.
3. Ensure the user message is included in the messages array (it likely already is, but verify against the existing prompt construction).

Do not add: history support (RED 38.20), tool dispatch loop (RED 38.16), defensive handling of missing choices (RED 38.21), species list injection (RED 38.22). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 128. RED 38.16 - Freshwater Agent Single Tool Call

Read AGENTS.md and TESTING.md file.

Implement RED 38.16 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts:
1. When OpenAI returns an assistant message with a tool_call, the agent calls runFreshwaterTool with the tool name and parsed arguments object.
2. The agent then makes a second OpenAI call.
3. The second OpenAI request body contains a tool message with role 'tool' and a matching tool_call_id ('call_1').
4. The agent returns the second OpenAI response's content as { response: string }.

Implementation:
1. Import runFreshwaterTool from '@/lib/freshwaterAgentTools'.
2. After the first OpenAI call, check if the assistant message has tool_calls. If so:
   - For each tool_call (this RED only tests one, but later REDs may require multiple — keep it simple, iterate over tool_calls), parse the arguments JSON into an object and call runFreshwaterTool(name, parsedArgs).
   - Push the assistant message back onto the messages array, then push one tool message per tool_call_id with the JSON-stringified tool result as content.
   - Make a second OpenAI call.
3. Return the latest assistant message's content as { response: string }.

Reference src/lib/saltwaterAgent.ts for the established orchestration pattern. The freshwater agent should match the same loop shape, scaled to its registry.

Do not add: max iterations cap (RED 38.18), null/error tool result recovery (RED 38.19), history support (RED 38.20), defensive choices handling (RED 38.21), species list injection (RED 38.22). Those are separate REDs not yet written. But because the loop must be able to iterate over tool_calls (the saltwater pattern), implementing a basic while-loop is acceptable as long as it satisfies only this test's assertions.

Tell Jacqueline what command to run.

## 129. RED 38.18 - Freshwater Agent Max Iteration Safety

Read AGENTS.md and TESTING.md file.

Implement RED 38.18 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test mocks OpenAI to always return an assistant message with a tool_call (no final answer), then asserts the agent returns { ok: false, reason: 'max_iterations_exceeded' }. Without an iteration cap, the agent loops forever, exhausting heap memory and crashing the test process.

Implementation:
1. Add a `maxToolIterations` constant set to 8 (matches the saltwater agent's cap).
2. Inside the tool-dispatch loop, before processing tool_calls, check whether the iteration count has reached the cap. If so, return { ok: false, reason: 'max_iterations_exceeded' }.
3. Increment the iteration count after each round of dispatching (one round = one OpenAI tool_call response, regardless of how many tool_calls it contains).

The agent's return type may need to be a union of { response: string } and { ok: false; reason: 'max_iterations_exceeded' } — reference src/lib/saltwaterAgent.ts for the established SaltwaterAgentResult union pattern. The freshwater equivalent should match.

Do not add: null/error tool result recovery (RED 38.19), history support (RED 38.20), defensive choices handling (RED 38.21), species list injection (RED 38.22). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 130. RED 38.20 - Freshwater Agent Sends History to OpenAI

Read AGENTS.md and TESTING.md file.

Implement RED 38.20 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test calls runFreshwaterAgent with { question, history } where history contains a user turn and an assistant turn, and asserts that the OpenAI messages array contains:
- The prior user message ("first question") at some index
- The prior assistant message ("first reply") at a later index
- The new question ("follow-up question") at an even later index

Implementation:
1. Accept an optional `history` parameter in the agent's input type. The history array contains entries of shape { role: 'user' | 'assistant'; content: string }.
2. Add a type guard or filter to validate history entries match the expected shape before passing them to OpenAI (defensive against malformed inputs).
3. In the messages array sent to OpenAI, insert the filtered history entries AFTER the system messages and BEFORE the new user question.

Reference src/lib/saltwaterAgent.ts for the established history pattern (RunSaltwaterAgentInput type, isSaltwaterAgentHistoryMessage type guard, message array construction). The freshwater equivalent should match.

Do not add: defensive choices handling (RED 38.21), species list injection (RED 38.22). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 131. RED 38.22 - Freshwater Common-Fished Species Context

Read AGENTS.md and TESTING.md file.

Implement RED 38.22 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts the OpenAI messages array sent in the request body contains the freshwater common-fished species list. Specifically, the names "Brook Trout", "Largemouth Bass", and "Bluegill" must appear somewhere in the joined content of the messages array.

Implementation:
1. Import `getSpeciesForWaterType` from '@/lib/species'.
2. Call `getSpeciesForWaterType('freshwater')` to get the species list (40 freshwater common-fished species).
3. Include those species names in the messages array sent to OpenAI — either inside the system prompt content or as an additional system message inserted right after the main system prompt. Each species should be referenced by both common name and scientific name, matching the saltwater pattern.

Reference src/lib/saltwaterAgent.ts for the established getSaltwaterSpeciesContext pattern. The freshwater equivalent should match.

Do not modify any other agent behavior, tool registry, dispatcher, route, component, or test files.

Tell Jacqueline what command to run.

## 132. RED 38.23 - Freshwater Chat Route Success Path

Read AGENTS.md and TESTING.md file.

Implement RED 38.23 from TESTING.md Section 38. The failing test is at src/app/api/freshwater-chat/route.test.ts. Create src/app/api/freshwater-chat/route.ts with the minimal implementation required to make that test pass — nothing more.

The test expects:
1. An exported async function `POST(request: Request): Promise<Response>`.
2. The handler parses the JSON body and extracts a `question` field.
3. The handler calls `runFreshwaterAgent` from '@/lib/freshwaterAgent' with an object containing the question.
4. The handler returns the agent's result as JSON with status 200.

Do NOT implement: 400 response for missing/empty/whitespace questions (RED 38.24), 500 response on agent errors (RED 38.25), history forwarding (RED 38.26). Those are separate REDs not yet written. The minimal-code rule applies — only what RED 38.23 requires.

Reference src/app/api/saltwater-chat/route.ts for the established pattern, but implement only the success path with no validation, no try/catch, and no history extraction.

Tell Jacqueline what command to run.

## 133. RED 38.24 - Freshwater Chat Route Question Validation

Read AGENTS.md and TESTING.md file.

Implement RED 38.24 from TESTING.md Section 38. The failing test is at src/app/api/freshwater-chat/route.test.ts. Update src/app/api/freshwater-chat/route.ts minimally so that test passes — nothing more.

The test asserts three cases:
1. POST with body `{}` (no question key) returns status 400 and never calls the agent.
2. POST with body `{ question: '' }` returns status 400 and never calls the agent.
3. POST with body `{ question: '   \n  ' }` (whitespace only) returns status 400 and never calls the agent.

Implementation:
1. After parsing the JSON body, validate the `question` field:
   - Must be a string (typeof check)
   - After `.trim()`, must be non-empty
2. If validation fails, return a JSON response with status 400 BEFORE calling runFreshwaterAgent. A reasonable body shape is `{ error: 'Question is required.' }` but the test only checks the status code.
3. Otherwise proceed to call runFreshwaterAgent as before.

Reference src/app/api/saltwater-chat/route.ts for the established validation pattern. The freshwater equivalent should match.

Do NOT add: 500 error handling (RED 38.25), history forwarding (RED 38.26). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 134. RED 38.25 - Freshwater Chat Route Agent Error

Read AGENTS.md and TESTING.md file.

Implement RED 38.25 from TESTING.md Section 38. The failing test is at src/app/api/freshwater-chat/route.test.ts. Update src/app/api/freshwater-chat/route.ts minimally so that test passes — nothing more.

The test asserts that when runFreshwaterAgent throws an error (mocked to reject with new Error('agent crashed')), the route returns a response with status 500.

Implementation:
1. Wrap the call to runFreshwaterAgent in a try/catch.
2. On catch, return a JSON response with status 500. A reasonable body shape is `{ error: 'Freshwater agent failed.' }` but the test only checks the status code.

Reference src/app/api/saltwater-chat/route.ts for the established try/catch pattern. The freshwater equivalent should match. Do not add a console.error call — the test does not require it and the minimal-code rule applies.

Do NOT add: history forwarding (RED 38.26). That is a separate RED not yet written.

Tell Jacqueline what command to run.

## 135. RED 38.26 - Freshwater Chat Route Forwards History

Read AGENTS.md and TESTING.md file.

Implement RED 38.26 from TESTING.md Section 38. The failing test is at src/app/api/freshwater-chat/route.test.ts. Update src/app/api/freshwater-chat/route.ts minimally so that test passes — nothing more.

The test asserts the route extracts body.history (in addition to body.question) and passes both fields to runFreshwaterAgent. Specifically, when POST receives a body like { question: 'July 4 2026', history: [...] }, runFreshwaterAgent must be called with { question: 'July 4 2026', history: [...] } where the history array matches exactly.

Implementation:
1. Extend the request body type to include an optional `history` field.
2. After validating the question, extract history from the body (defensively check it's an array, fall through to undefined or empty otherwise).
3. Pass both question and history to runFreshwaterAgent.

Reference src/app/api/saltwater-chat/route.ts for the established history-forwarding pattern. The freshwater equivalent should match.

Do not modify any test files, the agent, the tool registry, the dispatcher, or any other files.

Tell Jacqueline what command to run.

## 136. RED 38.27 - FreshwaterChat Initial Render

Read AGENTS.md and TESTING.md file.

Implement RED 38.27 from TESTING.md Section 38. The failing test is at src/components/FreshwaterChat.test.tsx. Create src/components/FreshwaterChat.tsx with the minimal implementation required to make that test pass — nothing more.

The test expects:
1. An exported React component named `FreshwaterChat`.
2. A labeled text input — the label text matches /question/i and the underlying element is an <input> (not textarea).
3. A submit button.

Do NOT implement: fetch on submit (RED 38.28), spinner / disabled button during loading (RED 38.29), history-tracking and sending on follow-up (RED 38.30), error message on failure (RED 38.31). Those are separate REDs not yet written. The minimal-code rule applies — only what RED 38.27 requires.

Reference src/components/SaltwaterChat.tsx for the established Section 37 pattern (minimal implementation that passes its own RED 37.24 — labeled input + button). The freshwater equivalent should match that minimal shape, with no styling beyond what HTML provides by default.

This is a 'use client' component.

Tell Jacqueline what command to run.

## 137. RED 38.28 - FreshwaterChat Submit and Response

Read AGENTS.md and TESTING.md file.

Implement RED 38.28 from TESTING.md Section 38. The failing test is at src/components/FreshwaterChat.test.tsx. Update src/components/FreshwaterChat.tsx minimally so that test passes — nothing more.

The test:
1. Stubs global fetch to resolve with { ok: true, json: async () => ({ response: 'Did you mean Saturday, June 28?' }) }.
2. Types a question into the input and clicks the submit button.
3. Asserts the response text "Did you mean Saturday, June 28?" appears somewhere in the rendered output.

Implementation:
1. Add a submit handler to the form that POSTs to /api/freshwater-chat with a JSON body containing { question: <input value> }.
2. Parse the response JSON and store the `response` field in component state.
3. Render the stored response text somewhere visible.

Do NOT implement: spinner / disabled button while loading (RED 38.29), history tracking and forwarding on follow-up (RED 38.30), error message on fetch failure (RED 38.31). Those are separate REDs not yet written. The minimal-code rule applies.

Reference src/components/SaltwaterChat.tsx Codex-minimal version for the established pattern. The freshwater equivalent should match that minimal shape.

Tell Jacqueline what command to run.

## 138. RED 38.29 - FreshwaterChat Spinner

Read AGENTS.md and TESTING.md file.

Implement RED 38.29 from TESTING.md Section 38. The failing test is at src/components/FreshwaterChat.test.tsx. Update src/components/FreshwaterChat.tsx minimally so that test passes — nothing more.

The test asserts:
1. While the fetch is pending, an element with role="status" (a spinner) is present in the DOM.
2. While the fetch is pending, the submit button is disabled.
3. After the fetch resolves and the response renders, the spinner is gone (no element with role="status") and the submit button is no longer disabled.

Implementation:
1. Add an `isLoading` boolean state, initialized to false.
2. Set `isLoading` to true immediately before the fetch and false in a `finally` block after the fetch (whether it resolves or rejects).
3. When `isLoading` is true, render a `<span role="status">` containing the existing Spinner component from '@/components/Spinner' (import it if not already imported).
4. When `isLoading` is true, set the submit button's `disabled` attribute to true.

Reference src/components/SaltwaterChat.tsx Codex-minimal version for the established Spinner + role="status" pattern. The freshwater equivalent should match.

Do NOT implement: history tracking and forwarding on follow-up (RED 38.30), error message on fetch failure (RED 38.31). Those are separate REDs not yet written.

Tell Jacqueline what command to run.

## 139. RED 38.30 - FreshwaterChat History

Read AGENTS.md and TESTING.md file.

Implement RED 38.30 from TESTING.md Section 38. The failing test is at src/components/FreshwaterChat.test.tsx. Update src/components/FreshwaterChat.tsx minimally so that test passes — nothing more.

The test:
1. Types a first question and submits — fetch resolves with response 1.
2. After the response renders, clears the input, types a second question, and submits — fetch resolves with response 2.
3. Asserts the second fetch call's request body contains:
   - question matching the second question
   - history: an array with at least 2 entries
   - The history serialized text contains both the first question's content and the first response's content

Implementation:
1. Add a `history` state, an array of `{ role: 'user' | 'assistant'; content: string }` entries.
2. Include `history` in the POST body alongside `question`.
3. After a successful response, append both the new user question and the new assistant response to history (in that order).

Reference src/components/SaltwaterChat.tsx Codex-minimal version for the established history-tracking pattern. The freshwater equivalent should match.

Do NOT implement: error message on fetch failure (RED 38.31). That is a separate RED not yet written.

Tell Jacqueline what command to run.

## 140. RED 38.31 - FreshwaterChat Error Handling

Read AGENTS.md and TESTING.md file.

Implement RED 38.31 from TESTING.md Section 38. The failing test is at src/components/FreshwaterChat.test.tsx. Update src/components/FreshwaterChat.tsx minimally so that test passes — nothing more.

The test stubs global fetch to reject with `new Error('Network down')` and asserts:
1. After the rejected fetch settles, an element containing text matching /something went wrong/i is present in the DOM.
2. After the rejected fetch settles, the spinner element (role="status") is gone.

Implementation:
1. Add an `errorMessage` state initialized to an empty string.
2. Wrap the fetch call in a try/catch. In the catch block, set errorMessage to "Something went wrong. Please try again." (or any string matching /something went wrong/i).
3. Ensure `isLoading` is set to false in a `finally` block (so the spinner clears even on error).
4. When errorMessage is non-empty, render it somewhere visible in the component.

Reference src/components/SaltwaterChat.tsx Codex-minimal version for the established try/catch/finally pattern. The freshwater equivalent should match.

Also handle the case where the fetch resolves but response.ok is false — set the same error message and return early (do not try to parse the response). The test does not assert this case explicitly but it matches the saltwater pattern and is required for honest error surfacing.

Tell Jacqueline what command to run.

## 141. RED 38.15 - Freshwater Agent Text-Only Response

Read AGENTS.md and TESTING.md file.

Implement RED 38.15 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts that when OpenAI returns an assistant message with content and no tool_calls:
1. runFreshwaterAgent returns that content unchanged as `{ response: string }`.
2. runFreshwaterTool is not called.
3. The agent makes only the initial OpenAI request.

Do not add tool dispatch behavior beyond what the test requires, do not add history support, do not add max iteration safety, and do not add species list injection. Those are separate REDs.

Tell Jacqueline what command to run.

## 142. RED 38.17 - Freshwater Agent Handles Parallel Tool Calls

Read AGENTS.md and TESTING.md file.

Implement RED 38.17 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test asserts that when OpenAI returns an assistant message containing multiple tool_calls in a single message (for example, forecast and usgs), the agent must:
1. Dispatch runFreshwaterTool once per tool_call in that message.
2. Push the assistant message back to OpenAI exactly once.
3. Push one tool message per tool_call_id after that assistant message.
4. Only then request the next OpenAI completion and return its final content.

Use the same iterate-over-all-tool_calls pattern as the saltwater agent. The iteration count is one per OpenAI tool-call response, not one per individual tool call.

Do not add max iteration safety, null/error tool recovery, history support, defensive choices handling, species list injection, or any other behavior beyond this RED.

Tell Jacqueline what command to run.

## 143. RED 38.19 - Freshwater Agent Serializes Null or Error Tool Results

Read AGENTS.md and TESTING.md file.

Implement RED 38.19 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test mocks runFreshwaterTool to return either an error shape or null, then asserts the agent:
1. Serializes that tool result into the tool message content.
2. Sends the tool message back to OpenAI.
3. Continues to the next OpenAI completion.
4. Returns the next assistant response as `{ response: string }`.

Do not invent a special result shape for tool failures. Do not add history support, defensive choices handling, species list injection, route behavior, or component behavior.

Tell Jacqueline what command to run.

## 144. RED 38.21 - Freshwater Agent Handles Missing Choices

Read AGENTS.md and TESTING.md file.

Implement RED 38.21 from TESTING.md Section 38. The failing test is at src/lib/freshwaterAgent.test.ts. Update src/lib/freshwaterAgent.ts minimally so that test passes — nothing more.

The test sends an OpenAI response body that has no `choices` field, such as `{ error: { message: 'rate limit exceeded' } }`. The agent must not crash when reading the assistant message.

Fix the OpenAI response access defensively, following the saltwater RED 37.41 pattern. A reasonable implementation is to use `completion.choices?.[0]?.message` wherever the agent reads the first message. Return a defined FreshwaterAgentResult shape such as `{ response: '' }`.

Do not modify the system prompt, tool registry, dispatcher, route, component, or any test files.

Tell Jacqueline what command to run.

## 145. Freshwater Page Wiring - Eyeball Verification

Read AGENTS.md and TESTING.md file.

Section 38 notes that RED 38.32 was dropped in favor of eyeball-verified page wiring, consistent with how saltwater shipped. Wire the freshwater page so the `FreshwaterChat` component appears on the freshwater page and can be checked manually in the browser.

Do not add or modify tests. Keep the wiring minimal and do not change the FreshwaterChat behavior beyond what the component REDs already required.

Tell Jacqueline what command to run.

# Test Run & Git Summary Report
**Generated on:** 6/28/2026, 6:44:26 PM

## 🕒 Recent Git Commit Log
* **da45611** - Jacqueline Delgado, 4 minutes ago : RED 37.34 — runSaltwaterAgent dispatches tool_calls through shared runSaltwaterTool
* **eadfdd8** - Jacqueline Delgado, 5 minutes ago : updated testing md and added more tests for agentic rag
* **b63021f** - Jacqueline Delgado, 12 minutes ago : GREEN 37.33 — system prompt forbids inventing data when a tool fails
* **848be49** - Jacqueline Delgado, 18 minutes ago : RED 37.33 — system prompt instructs the agent never to invent data when a tool fails
* **9232145** - Jacqueline Delgado, 21 minutes ago : GREEN 37.32 — tool schemas declare required parameters with descriptions
* **e9791a1** - Jacqueline Delgado, 23 minutes ago : RED 37.32 — every tool schema declares the parameters its function actually needs
* **0f32f7c** - Jacqueline Delgado, 27 minutes ago : GREEN 37.31 — registry names match dispatcher (test fixture: fresh Response per fetch call)
* **03f21f1** - Jacqueline Delgado, 35 minutes ago : RED 37.31 — every tool in SALTWATER_AGENT_TOOLS dispatches to a real tool function by its registered name
* **ab44304** - Jacqueline Delgado, 69 minutes ago : GREEN 37.30 — runSaltwaterAgent passes prior history into OpenAI messages array
* **107fe2f** - Jacqueline Delgado, 70 minutes ago : RED 37.30 — runSaltwaterAgent passes prior history into OpenAI messages array
* **f02429d** - Jacqueline Delgado, 78 minutes ago : GREEN 37.29 — route forwards body.history to runSaltwaterAgent
* **102ccf1** - Jacqueline Delgado, 79 minutes ago : RED 37.29 — POST /api/saltwater-chat forwards body.history to runSaltwaterAgent
* **e75f438** - Jacqueline Delgado, 2 hours ago : Wire SaltwaterChat into the saltwater page above the sighting-rate search
* **4d4d2d6** - Jacqueline Delgado, 3 hours ago : GREEN 37.28: SaltwaterChat shows an error message when the API call fails
* **44d6250** - Jacqueline Delgado, 3 hours ago : RED 37.28: SaltwaterChat shows an error message when the API call fails
* **77b2563** - Jacqueline Delgado, 3 hours ago : GREEN 37.27: SaltwaterChat sends prior conversation history with each follow-up request
* **7f4431b** - Jacqueline Delgado, 3 hours ago : RED 37.27: SaltwaterChat sends prior conversation history with each follow-up request
* **9fa311c** - Jacqueline Delgado, 3 hours ago : GREEN 37.26: SaltwaterChat shows a spinner and disables the button while the request is in flight
* **2835b7b** - Jacqueline Delgado, 3 hours ago : RED 37.26: SaltwaterChat shows a spinner and disables the button while the request is in flight
* **30a4f78** - Jacqueline Delgado, 3 hours ago : GREEN 37.25: SaltwaterChat displays the agent's response after a successful submission
* **b8e3fb7** - Jacqueline Delgado, 3 hours ago : RED 37.25: SaltwaterChat displays the agent's response after a successful submission
* **0d0bc99** - Jacqueline Delgado, 3 hours ago : GREEN 37.24: SaltwaterChat renders a labeled question input and a submit button
* **a2120c4** - Jacqueline Delgado, 3 hours ago : RED 37.24: SaltwaterChat renders a labeled question input and a submit button
* **cbdfaa9** - Jacqueline Delgado, 3 hours ago : GREEN 37.23: POST /api/saltwater-chat returns 500 when runSaltwaterAgent throws
* **2b30353** - Jacqueline Delgado, 3 hours ago : RED 37.23: POST /api/saltwater-chat returns 500 when runSaltwaterAgent throws
* **7c98088** - Jacqueline Delgado, 3 hours ago : GREEN 37.22: POST /api/saltwater-chat returns 400 for missing or empty question
* **ca51eb3** - Jacqueline Delgado, 3 hours ago : RED 37.22: POST /api/saltwater-chat returns 400 for missing or empty question
* **3654d7a** - Jacqueline Delgado, 3 hours ago : GREEN 37.21: POST /api/saltwater-chat surfaces runSaltwaterAgent's response
* **549fb1c** - Jacqueline Delgado, 3 hours ago : RED 37.21: POST /api/saltwater-chat surfaces runSaltwaterAgent's response
* **0ab45e5** - Jacqueline Delgado, 4 hours ago : Fix: align User test fixtures with current Prisma schema (profileName, profileImageUrl)
* **04e3009** - Jacqueline Delgado, 4 hours ago : GUARD 37.20: saltwater agent recovers when a tool function returns null or an error shape
* **f2a2c84** - Jacqueline Delgado, 4 hours ago : GUARD 37.5: saltwater agent returns the honest decline and invokes no tools
* **ccadef9** - Jacqueline Delgado, 4 hours ago : updated TESTING.md for a new agentics RAG for saltwater and freshwater pages
* **a6bf0d6** - Jacqueline Delgado, 4 hours ago : GUARD 37.2: saltwater agent returns clarifying text and invokes no tools
* **bd92121** - Jacqueline Delgado, 4 hours ago : GREEN 37.19: saltwater agent stops after max iterations to prevent infinite loops
* **84d9a68** - Jacqueline Delgado, 5 hours ago : RED 37.19: saltwater agent stops after max iterations to prevent infinite loops
* **038a8b8** - Jacqueline Delgado, 5 hours ago : GREEN 37.18: saltwater agent chains multiple tool_calls and returns the final synthesis
* **b968154** - Jacqueline Delgado, 5 hours ago : RED 37.18: saltwater agent chains multiple tool_calls and returns the final synthesis
* **8412c09** - Jacqueline Delgado, 5 hours ago : GREEN 37.17: saltwater agent dispatches a single tool_call and feeds the result back to OpenAI
* **1d9f7fd** - Jacqueline Delgado, 5 hours ago : RED 37.17: saltwater agent dispatches a single tool_call and feeds the result back to OpenAI
* **998ea4f** - Jacqueline Delgado, 5 hours ago : GREEN 37.16: saltwater agent sends user question and tool registry to OpenAI
* **c3e6c36** - Jacqueline Delgado, 5 hours ago : RED 37.16: saltwater agent sends user question and tool registry to OpenAI
* **1e2390a** - Jacqueline Delgado, 5 hours ago : GREEN 37.15: fetchSaltwaterNoaa queries NOAA CO-OPS for tide predictions
* **09b63d3** - Jacqueline Delgado, 5 hours ago : RED 37.15: fetchSaltwaterNoaa queries NOAA CO-OPS for tide predictions
* **5ae441f** - Jacqueline Delgado, 5 hours ago : GREEN 37.14: fetchSaltwaterUsgs queries USGS NWIS by site ID and parses time series
* **829672e** - Jacqueline Delgado, 5 hours ago : RED 37.14: fetchSaltwaterUsgs queries USGS NWIS by site ID and parses time series
* **2fa6555** - Jacqueline Delgado, 5 hours ago : GREEN 37.13: fetchSaltwaterGbif queries GBIF with lat/lng range, species, and limit
* **b692ef5** - Jacqueline Delgado, 5 hours ago : RED 37.13: fetchSaltwaterGbif queries GBIF with lat/lng range, species, and limit
* **784ca93** - Jacqueline Delgado, 5 hours ago : GREEN 37.12: fetchSaltwaterObis queries OBIS with geometry, species, and size
* **5088987** - Jacqueline Delgado, 5 hours ago : RED 37.12: fetchSaltwaterObis queries OBIS with geometry, species, and size
* **fbb7865** - Jacqueline Delgado, 5 hours ago : GREEN 37.11: fetchSaltwaterMarine builds Open-Meteo Marine URL and parses response
* **23f1949** - Jacqueline Delgado, 5 hours ago : RED 37.11: fetchSaltwaterMarine builds Open-Meteo Marine URL and parses response
* **0bd645c** - Jacqueline Delgado, 5 hours ago : GREEN 37.10: fetchSaltwaterForecast builds Open-Meteo URL and parses response
* **966cd86** - Jacqueline Delgado, 5 hours ago : RED 37.10: fetchSaltwaterForecast builds Open-Meteo URL and parses response
* **e665156** - Jacqueline Delgado, 5 hours ago : GREEN 37.9: saltwater agent tool dispatcher returns unknown_tool error for unknown names
* **d255bb7** - Jacqueline Delgado, 5 hours ago : RED 37.9: saltwater agent tool dispatcher returns unknown_tool error for unknown names
* **cea1fe4** - Jacqueline Delgado, 5 hours ago : GREEN 37.8: saltwater agent tool registry exposes six OpenAI-shaped function tools
* **b8e1f69** - Jacqueline Delgado, 5 hours ago : RED 37.8: saltwater agent tool registry exposes six OpenAI-shaped function tools
* **71fe2bd** - Jacqueline Delgado, 5 hours ago : GREEN 37.7: saltwater agent system prompt distinguishes specific-species queries from open-ended
* **670d51b** - Jacqueline Delgado, 5 hours ago : RED 37.7: saltwater agent system prompt distinguishes specific-species queries from open-ended
* **2f075a3** - Jacqueline Delgado, 5 hours ago : GREEN 37.6: saltwater agent system prompt instructs species narrowing on open-ended queries
* **be6909c** - Jacqueline Delgado, 5 hours ago : RED 37.6: saltwater agent system prompt instructs species narrowing on open-ended queries
* **020864e** - Jacqueline Delgado, 5 hours ago : GREEN 37.4: saltwater agent system prompt instructs decline of out-of-scope requests
* **134282b** - Jacqueline Delgado, 6 hours ago : RED 37.4: saltwater agent system prompt instructs decline of out-of-scope requests
* **36bfc14** - Jacqueline Delgado, 6 hours ago : GREEN 37.3: saltwater agent system prompt declares the six APIs
* **fa96a9f** - Jacqueline Delgado, 6 hours ago : RED 37.3: saltwater agent system prompt declares the six APIs
* **bcebfb6** - Jacqueline Delgado, 6 hours ago : GREEN 37.1: saltwater agent system prompt instructs date confirmation
* **ece7f06** - Jacqueline Delgado, 6 hours ago : RED 37.1: saltwater agent system prompt instructs date confirmation
* **8e9109a** - Jacqueline Delgado, 25 hours ago : updated test-report md file
* **ab6627e** - Jacqueline Delgado, 25 hours ago : Fix: whitelist /reset-request in route guard (forgot password flow)
* **801cbb8** - Jacqueline Delgado, 2 days ago : updated faq with new data qa md files
* **eb71110** - Jacqueline Delgado, 3 days ago : updated readme added zapier ai weekly blog
* **e84e9aa** - Jacqueline Delgado, 3 days ago : updated TESTING md
* **45fafb8** - Jacqueline Delgado, 3 days ago : test(blog): 36.3 — getLatestBlogPost returns null when BLOG_JSON_URL missing (verification)
* **c83c688** - Jacqueline Delgado, 3 days ago : test(blog): 36.2 — getLatestBlogPost returns null on fetch failure (verification)
* **307189b** - Jacqueline Delgado, 3 days ago : feat(blog): GREEN 36.1 — getLatestBlogPost fetches from BLOG_JSON_URL
* **1d58f52** - Jacqueline Delgado, 3 days ago : test(blog): RED 36.1 — getLatestBlogPost fetches BLOG_JSON_URL
* **d44a15f** - Jacqueline Delgado, 3 days ago : test(blog): 35.5 — LatestBlogPost renders nothing when no posts (verification)
* **762026c** - Jacqueline Delgado, 3 days ago : feat(blog): GREEN 35.4 — LatestBlogPost renders title and body
* **37fdebd** - Jacqueline Delgado, 3 days ago : test(blog): RED 35.4 — LatestBlogPost renders title and body
* **a27f776** - Jacqueline Delgado, 3 days ago : feat(blog): GREEN 35.3 — getLatestBlogPost returns newest or null
* **d5ddbb8** - Jacqueline Delgado, 3 days ago : test(blog): RED 35.3 — getLatestBlogPost returns newest or null
* **10bc7d8** - Jacqueline Delgado, 3 days ago : feat(blog): GREEN 35.2 — loadBlogPosts returns [] when blog dir missing
* **c8af22e** - Jacqueline Delgado, 3 days ago : test(blog): RED 35.2 — loadBlogPosts returns [] when blog dir missing
* **2a7bddb** - Jacqueline Delgado, 3 days ago : feat(blog): GREEN 35.1 — loadBlogPosts reads markdown sorted newest-first
* **2dd1bf2** - Jacqueline Delgado, 3 days ago : test(blog): RED 35.1 — loadBlogPosts sorts newest-first
* **ebc9d11** - Jacqueline Delgado, 3 days ago : updated my readme file added user profile, RAG
* **c8d2132** - Jacqueline Delgado, 3 days ago : updated test-report mark down file
* **dd12eff** - Jacqueline Delgado, 3 days ago : feat(rag): GREEN 34.11 — chunkMarkdownContent prepends heading context
* **7763620** - Jacqueline Delgado, 3 days ago : added 34.11 in testing md and updated test-report md files
* **05c1205** - Jacqueline Delgado, 3 days ago : test(rag): RED 34.11 — chunkMarkdownContent prepends heading context
* **fd3bf03** - Jacqueline Delgado, 3 days ago : feat(explore): wire FAQ chat onto Explore page + add FAQ corpus
* **bab7c4c** - Jacqueline Delgado, 3 days ago : feat(faq-chat): GREEN 34.10 — shows error message when API call fails
* **7573afe** - Jacqueline Delgado, 3 days ago : test(faq-chat): RED 34.10 — shows error message when API call fails
* **fd3da48** - Jacqueline Delgado, 3 days ago : feat(faq-chat): GREEN 34.9 — displays source titles under the answer
* **547b1b9** - Jacqueline Delgado, 3 days ago : test(faq-chat): RED 34.9 — displays source titles under the answer
* **963ecb0** - Jacqueline Delgado, 3 days ago : feat(faq-chat): GREEN 34.8 — displays answer after submission
* **dc02496** - Jacqueline Delgado, 3 days ago : test(faq-chat): RED 34.8 — displays answer after submission
* **fdc93fb** - Jacqueline Delgado, 3 days ago : feat(faq-chat): GREEN 34.7 — renders input and submit button
* **d65296f** - Jacqueline Delgado, 3 days ago : test(faq-chat): RED 34.7 — renders input and submit button
* **c404fc2** - Jacqueline Delgado, 3 days ago : feat(explore-chat): GREEN 34.6 — returns 'I don't know...' when top score below threshold
* **a20078d** - Jacqueline Delgado, 3 days ago : test(explore-chat): RED 34.6 — returns 'I don't know...' when top score below threshold
* **3a34534** - Jacqueline Delgado, 3 days ago : feat(explore-chat): GREEN 34.5 — POST returns 400 for missing or empty question
* **57b26ec** - Jacqueline Delgado, 3 days ago : test(explore-chat): RED 34.5 — POST returns 400 for missing or empty question
* **7d0c45c** - Jacqueline Delgado, 3 days ago : feat(explore-chat): GREEN 34.4 — POST returns answer + sources, grounds model
* **d93bc00** - Jacqueline Delgado, 3 days ago : updated package json
* **4fc1d12** - Jacqueline Delgado, 3 days ago : test(explore-chat): RED 34.4 — POST returns answer + sources, grounds model
* **eff9fa5** - Jacqueline Delgado, 3 days ago : feat(rag): GREEN 34.3 — retrieveTopChunks
* **8d20358** - Jacqueline Delgado, 3 days ago : test(rag): RED 34.3 — retrieveTopChunks
* **7ee3a84** - Jacqueline Delgado, 3 days ago : feat(rag): GREEN 34.2 — chunkMarkdownContent
* **5edfb1c** - Jacqueline Delgado, 3 days ago : test(rag): RED 34.2 — chunkMarkdownContent
* **8c8eced** - Jacqueline Delgado, 3 days ago : feat(rag): GREEN 34.1 — cosineSimilarity
* **b6cf9f2** - Jacqueline Delgado, 3 days ago : test(rag): RED 34.1 — cosineSimilarity returns 1 / 0 / -1
* **ce9d386** - Jacqueline Delgado, 3 days ago : updated test-report md file
* **d01c681** - Jacqueline Delgado, 3 days ago : feat: upload profile images to Vercel Blob instead of local disk
* **71765d4** - Jacqueline Delgado, 3 days ago : test: add RED for profile image upload via Vercel Blob
* **0b59697** - Jacqueline Delgado, 3 days ago : updated test-report.md file
* **db4ca12** - Jacqueline Delgado, 3 days ago : fix: add createdAt to CatchFeedPost type so production build type-checks
* **7d5d87b** - Jacqueline Delgado, 3 days ago : added prompts to PROMPTS file and updated TESTING.md file with additional plan for new features
* **f597cdd** - Jacqueline Delgado, 3 days ago : feat: show spinner beside login button while submitting
* **c20e48b** - Jacqueline Delgado, 3 days ago : feat: show MapHint between AI explanation and map on both pages
* **8393434** - Jacqueline Delgado, 3 days ago : feat: MapHint renders zoom guidance text
* **71c1a83** - Jacqueline Delgado, 3 days ago : test: add RED for MapHint zoom guidance component
* **b9f3fd5** - Jacqueline Delgado, 3 days ago : feat: wire waterType into SightingRateSearch on both pages, fix fetchReports return type
* **a6c22a8** - Jacqueline Delgado, 3 days ago : feat: Species field is a common-name dropdown that submits the scientific name
* **fdf8059** - Jacqueline Delgado, 3 days ago : test: add RED for Species field as common-name dropdown
* **e47914d** - Jacqueline Delgado, 3 days ago : fix: CatchPost exits edit mode after a successful save
* **a9c1c95** - Jacqueline Delgado, 3 days ago : test: add RED for CatchPost closing editor after successful save
* **08072e4** - Jacqueline Delgado, 3 days ago : feat: bump refreshKey after post/delete/update so feed updates instantly
* **677acc1** - Jacqueline Delgado, 3 days ago : feat: CatchFeed re-fetches immediately when refreshKey changes
* **bd449dd** - Jacqueline Delgado, 3 days ago : test: add RED for CatchFeed immediate refresh on refreshKey change
* **67b2329** - Jacqueline Delgado, 3 days ago : feat: minimum visible duration so action spinners are perceptible on fast actions
* **100edb0** - Jacqueline Delgado, 3 days ago : added prompt md and made changed to testing-report md file
* **05e0fcd** - Jacqueline Delgado, 3 days ago : feat: add animated spinner to post, delete, and save buttons during async actions
* **671be81** - Jacqueline Delgado, 3 days ago : feat: wire catch reports feed onto freshwater page
* **1fb3dd4** - Jacqueline Delgado, 3 days ago : feat: clear composer textarea after successful post, keep text on failure
* **839e640** - Jacqueline Delgado, 3 days ago : test: add RED for CatchComposer clearing textarea after successful post
* **dd33144** - Jacqueline Delgado, 3 days ago : polish: add gap between avatar and author name in catch posts
* **2bf56d1** - Jacqueline Delgado, 3 days ago : polish: space out post timestamp and show Posting state on post button
* **2bbf0d9** - Jacqueline Delgado, 3 days ago : feat: display relative timestamp on catch posts, add createdAt to test fixture
* **849db7b** - Jacqueline Delgado, 3 days ago : test: add RED for CatchPost timestamp display
* **4c5a4f6** - Jacqueline Delgado, 3 days ago : feat: implement formatRelativeTime helper
* **d05557a** - Jacqueline Delgado, 3 days ago : test: add RED for formatRelativeTime helper
* **017f607** - Jacqueline Delgado, 3 days ago : fix: add id and name to composer and edit textareas for accessibility
* **eab0e2c** - Jacqueline Delgado, 3 days ago : feat: disable delete/save buttons while in progress to prevent double-action
* **eee79de** - Jacqueline Delgado, 3 days ago : test: add RED for CatchPost double-delete and double-save prevention
* **558db64** - Jacqueline Delgado, 3 days ago : fix: full-width composer textarea and spacing between catch posts
* **0c00993** - Jacqueline Delgado, 3 days ago : feat: wire CatchFeed edit/delete to PATCH/DELETE routes on saltwater page
* **ca931f9** - Jacqueline Delgado, 3 days ago : feat: CatchFeed renders posts as CatchPost with edit/delete for 2c, fix test flush
* **ae822d3** - Jacqueline Delgado, 3 days ago : test: add RED for CatchFeed rendering posts as CatchPost with edit/delete
* **73cc181** - Jacqueline Delgado, 3 days ago : feat: PATCH catch-reports route updates post body for owner
* **71e233b** - Jacqueline Delgado, 3 days ago : test: add RED for PATCH catch-reports route
* **da11013** - Jacqueline Delgado, 3 days ago : feat: DELETE catch-reports route deletes post for owner
* **10ec2c6** - Jacqueline Delgado, 3 days ago : test: add RED for DELETE catch-reports route
* **7f455c0** - Jacqueline Delgado, 3 days ago : feat: CatchComposer disables post button while submitting to prevent double-post
* **274bbe0** - Jacqueline Delgado, 3 days ago : test: add RED for CatchComposer double-submit prevention
* **f591a43** - Jacqueline Delgado, 3 days ago : feat: add catch reports feed beside saved spots on saltwater page
* **41e3147** - Jacqueline Delgado, 3 days ago : feat: CatchComposer post box with profile gate
* **acd28ab** - Jacqueline Delgado, 3 days ago : test: add RED for CatchComposer post box with profile gate
* **781cd50** - Jacqueline Delgado, 3 days ago : feat: POST catch-reports route creates post for logged-in user
* **53b2398** - Jacqueline Delgado, 3 days ago : test: add RED for POST catch-reports route
* **7d384b0** - Jacqueline Delgado, 3 days ago : feat: GET catch-reports route lists posts for water type
* **9a175a5** - Jacqueline Delgado, 3 days ago : test: add RED for GET catch-reports route
* **a99bdcd** - Jacqueline Delgado, 3 days ago : fix: constrain profile image preview to thumbnail so Save button stays visible
* **4e1a055** - Jacqueline Delgado, 3 days ago : feat: NavBar pencil edit link to profile next to avatar
* **3c3d994** - Jacqueline Delgado, 3 days ago : test: add RED for NavBar pencil edit link to profile
* **5934f2c** - Jacqueline Delgado, 3 days ago : feat: SiteNav fetches profile and passes to NavBar for avatar display
* **134a379** - Jacqueline Delgado, 3 days ago : feat: GET profile route returns current user profile
* **bfc3f2c** - Jacqueline Delgado, 3 days ago : test: add RED for GET profile route
* **6833d15** - Jacqueline Delgado, 3 days ago : feat: ProfileForm shows uploaded image preview
* **d4ff519** - Jacqueline Delgado, 3 days ago : test: add RED for ProfileForm image preview
* **39a9b31** - Jacqueline Delgado, 4 days ago : chore: add public/uploads folder, ignore uploaded files
* **f7c49d3** - Jacqueline Delgado, 4 days ago : feat: wire ProfileForm uploadImage to image upload route on profile page
* **c5cb9b3** - Jacqueline Delgado, 4 days ago : feat: ProfileForm file upload with pencil for RED 33.2, fix test act flush
* **9ec3fbf** - Jacqueline Delgado, 4 days ago : test: rewrite RED 33.2 for ProfileForm file upload, remove URL field
* **8062659** - Jacqueline Delgado, 4 days ago : feat: profile image upload route writes file and returns path for RED 33.1, adapt test for jsdom
* **cf29996** - Jacqueline Delgado, 4 days ago : test: add RED 33.1 for profile image upload route
* **a5597c9** - Jacqueline Delgado, 4 days ago : feat: POST profile route saves profile for logged-in user for RED 32.4
* **b5a8e60** - Jacqueline Delgado, 4 days ago : test: add RED 32.4 for POST profile route
* **0fa2e3b** - Jacqueline Delgado, 4 days ago : feat: ProfileForm empty name validation for RED 32.3
* **2ff1c15** - Jacqueline Delgado, 4 days ago : test: add RED 32.3 for ProfileForm empty name validation
* **4997b08** - Jacqueline Delgado, 4 days ago : feat: ProfileForm submit calls onSave with values for RED 32.2
* **874b6ab** - Jacqueline Delgado, 4 days ago : test: add RED 32.2 for ProfileForm submit calls onSave
* **d588e3a** - Jacqueline Delgado, 4 days ago : feat: ProfileForm renders fields and Save button for RED 32.1
* **c8e9587** - Jacqueline Delgado, 4 days ago : test: add RED 32.1 for ProfileForm rendering
* **24f2c3c** - Jacqueline Delgado, 4 days ago : test: add RED 31.3 guarding CatchFeed stops polling on unmount (passes on arrival)
* **66f54a8** - Jacqueline Delgado, 4 days ago : feat: CatchFeed renders new posts on poll for RED 31.2, fix test promise flushing
* **f41fcdd** - Jacqueline Delgado, 4 days ago : test: add RED 31.2 for CatchFeed renders new posts
* **beacf11** - Jacqueline Delgado, 4 days ago : feat: CatchFeed polling interval for RED 31.1
* **e72745c** - Jacqueline Delgado, 4 days ago : test: add RED 31.1 for CatchFeed polling interval
* **17fffd0** - Jacqueline Delgado, 4 days ago : feat: CatchPost delete cancel closes dialog for RED 30.5
* **2ea518b** - Jacqueline Delgado, 4 days ago : test: add RED 30.5 for CatchPost delete cancel
* **256b875** - Jacqueline Delgado, 4 days ago : feat: CatchPost delete confirmation dialog for RED 30.4
* **67f4520** - Jacqueline Delgado, 4 days ago : test: add RED 30.4 for CatchPost delete confirmation
* **a5f84e8** - Jacqueline Delgado, 4 days ago : feat: CatchPost Save calls onUpdate with edited body for RED 30.3
* **bacd474** - Jacqueline Delgado, 4 days ago : test: add RED 30.3 for CatchPost Save calls onUpdate
* **80b2e1f** - Jacqueline Delgado, 4 days ago : feat: CatchPost edit mode textarea and Save button for RED 30.2
* **7f1fe6c** - Jacqueline Delgado, 4 days ago : test: add RED 30.2 for CatchPost edit mode textarea and Save
* **c1345aa** - Jacqueline Delgado, 4 days ago : feat: CatchPost edit button visibility for RED 30.1
* **870bd09** - Jacqueline Delgado, 4 days ago : test: add RED 30.1 for CatchPost edit button visibility
* **5225ea6** - Jacqueline Delgado, 4 days ago : feat: reject non-owner in deleteCatchReport for RED 29.8
* **01940cc** - Jacqueline Delgado, 4 days ago : test: add RED 29.8 for deleteCatchReport rejects non-owner
* **9cccdb0** - Jacqueline Delgado, 4 days ago : feat: implement deleteCatchReport owner-can-delete for RED 29.7
* **6a7d740** - Jacqueline Delgado, 4 days ago : test: add RED 29.7 for deleteCatchReport owner can delete
* **486c473** - Jacqueline Delgado, 4 days ago : feat: reject non-owner in updateCatchReport for RED 29.6
* **a63410e** - Jacqueline Delgado, 4 days ago : test: add RED 29.6 for updateCatchReport rejects non-owner
* **bb0e5a4** - Jacqueline Delgado, 4 days ago : feat: implement updateCatchReport owner-can-edit for RED 29.5
* **eef2919** - Jacqueline Delgado, 4 days ago : test: add RED 29.5 for updateCatchReport owner can edit
* **b393ad5** - Jacqueline Delgado, 4 days ago : feat: add author info to getCatchReports for RED 29.4, update 29.2 mocks for join
* **e0b1713** - Jacqueline Delgado, 4 days ago : test: add RED 29.4 for getCatchReports author info join
* **4b21709** - Jacqueline Delgado, 4 days ago : feat: order getCatchReports newest first for RED 29.3
* **27aafef** - Jacqueline Delgado, 4 days ago : updated nav bar with profile link and updated css
* **14ca257** - Jacqueline Delgado, 4 days ago : test: add RED 29.3 for getCatchReports newest-first ordering
* **fb4a25b** - Jacqueline Delgado, 4 days ago : feat: implement getCatchReports water type filtering for RED 29.2
* **cb9fb3a** - Jacqueline Delgado, 4 days ago : test: add RED 29.2 for getCatchReports water type filtering
* **468153a** - Jacqueline Delgado, 4 days ago : feat: implement createCatchReport for RED 29.1
* **3aa16ac** - Jacqueline Delgado, 4 days ago : test: add RED 29.1 for createCatchReport, add CatchReport model
* **8770f4c** - Jacqueline Delgado, 4 days ago : feat: implement PostButton with set up profile gate for RED 28.10
* **a6a1ba1** - Jacqueline Delgado, 4 days ago : test: add RED 28.10 for PostButton set up profile dialog
* **99d8e91** - Jacqueline Delgado, 4 days ago : feat: implement canPostCatch profile name gate for RED 28.9
* **d44bec0** - Jacqueline Delgado, 4 days ago : test: add RED 28.9 for canPostCatch profile name gate
* **8b243f2** - Jacqueline Delgado, 4 days ago : feat: render set up profile prompt in NavBar for RED 28.8
* **6fbf020** - Jacqueline Delgado, 4 days ago : test: add RED 28.8 for NavBar set up profile prompt
* **5d1164c** - Jacqueline Delgado, 4 days ago : feat: render letter avatar fallback in NavBar for RED 28.7
* **d4c75ae** - Jacqueline Delgado, 4 days ago : test: add RED 28.7 for NavBar letter avatar fallback
* **96b0e30** - Jacqueline Delgado, 4 days ago : docs: add TESTING.md plan for sections 28-31 profile and catch feed
* **e4e4875** - Jacqueline Delgado, 4 days ago : chore: add playwright setup for auth-gate e2e regression test
* **f387423** - Jacqueline Delgado, 4 days ago : feat: render profile avatar and display name in NavBar for RED 28.6
* **19e86ea** - Jacqueline Delgado, 4 days ago : test: add RED 28.6 for NavBar profile avatar and display name
* **3819887** - Jacqueline Delgado, 4 days ago : test: add RED 28.5 regression guard for NavBar brand name
* **6c3237e** - Jacqueline Delgado, 4 days ago : feat: implement getDisplayAvatar letter fallback for RED 28.4
* **c9e3d2a** - Jacqueline Delgado, 4 days ago : test: add RED 28.4 for getDisplayAvatar letter fallback
* **1c2bc35** - Jacqueline Delgado, 4 days ago : feat: implement getDisplayAvatar image case for RED 28.3
* **da181e8** - Jacqueline Delgado, 4 days ago : test: add RED 28.3 for getDisplayAvatar image case
* **1d52768** - Jacqueline Delgado, 4 days ago : feat: implement saveProfileImage for RED 28.2
* **821aea6** - Jacqueline Delgado, 4 days ago : test: add RED 28.2 for saveProfileImage, add profileImageUrl to User
* **688e21a** - Jacqueline Delgado, 4 days ago : feat: implement saveProfileName for RED 28.1
* **cf9ad92** - Jacqueline Delgado, 4 days ago : test: add RED 28.1 for saveProfileName, exclude e2e from vitest
* **11e24a6** - Jacqueline Delgado, 6 days ago : updated readme file and added test-report.md file created by vitest reporter
* **3f50b4c** - Jacqueline Delgado, 6 days ago : updated package json file added vitest reporter
* **bb27118** - Jacqueline Delgado, 6 days ago : feat: add EmptyRecordsNotice no-records message
* **ad702bb** - Jacqueline Delgado, 6 days ago : test: add red test for EmptyRecordsNotice no-records message
* **2efc933** - Jacqueline Delgado, 8 days ago : updated readme with 131 tests
* **bd42936** - Jacqueline Delgado, 8 days ago : fix: signup returns 409 on duplicate email instead of unhandled 500 (Feature 27, GREEN)
* **a526696** - Jacqueline Delgado, 8 days ago : test: signup returns a clean error on duplicate email (Feature 27, RED)
* **e44c8e7** - Jacqueline Delgado, 8 days ago : feat: server-side route guard middleware closes client-side auth bypass (Feature 26)
* **66bd47d** - Jacqueline Delgado, 8 days ago : feat: shouldRedirectToLogin route guard decision logic (Feature 26, GREEN)
* **62f8d25** - Jacqueline Delgado, 8 days ago : test: shouldRedirectToLogin route guard decision logic (Feature 26, RED)
* **04b089b** - Jacqueline Delgado, 8 days ago : test: resetPasswordWithCode handles missing account / missing reset code (Feature 25, RED)
* **4974398** - Jacqueline Delgado, 8 days ago : updated readme updated live site link
* **d60663c** - Jacqueline Delgado, 8 days ago : updated read me with real tally link
* **e4013e8** - Jacqueline Delgado, 8 days ago : updated my readme, saw a typo
* **125fd74** - Jacqueline Delgado, 9 days ago : updated contact page, saw typo
* **33d89dd** - Jacqueline Delgado, 9 days ago : updated freshwater page -- saw a typo
* **9200a4b** - Jacqueline Delgado, 9 days ago : updated readme, results, and testing mark down files
* **e184d2a** - Jacqueline Delgado, 9 days ago : feat: paginate GBIF to collect up to 2000 records
* **cb6a011** - Jacqueline Delgado, 9 days ago : test: expect GBIF fetch to paginate up to 2000 records
* **6779cf9** - Jacqueline Delgado, 9 days ago : feat: request up to 300 records from GBIF for freshwater sample
* **d14c7e5** - Jacqueline Delgado, 9 days ago : test: expect GBIF fetch to request up to 300 records
* **0ae6748** - Jacqueline Delgado, 9 days ago : feat: filter map occurrences to the selected month
* **6e9d389** - Jacqueline Delgado, 9 days ago : test: expect search route to return map occurrences filtered by month
* **b420c24** - Jacqueline Delgado, 9 days ago : feat: request 2000 records from OBIS for a confident sample
* **0ce7543** - Jacqueline Delgado, 9 days ago : test: expect OBIS fetch to request 2000 records
* **03a1939** - Jacqueline Delgado, 9 days ago : updated TESTING, RESULTS, README mark down files to reflect the new test
* **15ea65a** - Jacqueline Delgado, 9 days ago : feat: frame percentage as share of records not a chance
* **8df3177** - Jacqueline Delgado, 9 days ago : test: expect sighting-rate prompt to frame percentage as share of records
* **6cb2927** - Jacqueline Delgado, 9 days ago : updated RESULTS.md, testing and readme mark down files
* **a5803be** - Jacqueline Delgado, 9 days ago : feat: restore upbeat angler voice in AI explanation
* **a07137d** - Jacqueline Delgado, 9 days ago : test: expect sighting-rate prompt to use upbeat angler tone
* **035c2db** - Jacqueline Delgado, 9 days ago : updated readme test count
* **4d461cd** - Jacqueline Delgado, 9 days ago : updated testing and results md files
* **e227c9d** - Jacqueline Delgado, 9 days ago : feat: angler voice without self-reference in AI explanation
* **27a046e** - Jacqueline Delgado, 9 days ago : test: expect sighting-rate prompt to forbid self-reference
* **def070f** - Jacqueline Delgado, 9 days ago : updated readme, testing, and results file
* **c0da6a9** - Jacqueline Delgado, 9 days ago : feat: instruct AI to call counts records not fish
* **3a94d2a** - Jacqueline Delgado, 9 days ago : test: expect sighting-rate prompt to say records not fish count
* **f8cf379** - Jacqueline Delgado, 9 days ago : updated the color for the dead email text chose not to make it an email link
* **c394599** - Jacqueline Delgado, 9 days ago : updated readme from 42 files tested to 48 files tested
* **1efcb68** - Jacqueline Delgado, 9 days ago : updated readme file from 94 test passing to 118 testpassing
* **20c81df** - Jacqueline Delgado, 9 days ago : updated RESULTS.md file
* **3f1c47a** - Jacqueline Delgado, 9 days ago : feat: add login link to reset-confirm success
* **7f60c11** - Jacqueline Delgado, 9 days ago : test: expect reset-confirm page to link to login after reset
* **c734acb** - Jacqueline Delgado, 10 days ago : feat: link reset-request success to confirm page
* **b73fd99** - Jacqueline Delgado, 10 days ago : test: expect reset-request page to link to confirm page
* **65bf6c7** - Jacqueline Delgado, 10 days ago : feat: add forgot password link to login page
* **5ef7a7e** - Jacqueline Delgado, 10 days ago : test: expect login page to link to password reset
* **9e59e6b** - Jacqueline Delgado, 10 days ago : feat: add reset-confirm page
* **eb0d184** - Jacqueline Delgado, 10 days ago : test: add red test for reset-confirm page
* **9fb90e0** - Jacqueline Delgado, 10 days ago : feat: add reset-request page
* **be4f9f8** - Jacqueline Delgado, 10 days ago : test: add red test for reset-request page
* **f774570** - Jacqueline Delgado, 10 days ago : feat: send reset email from reset-request route
* **52a083e** - Jacqueline Delgado, 10 days ago : test: expect reset-request route to send the reset email
* **a6d5853** - Jacqueline Delgado, 10 days ago : feat: add sendPasswordResetEmail
* **b2f4a15** - Jacqueline Delgado, 10 days ago : test: add red test for sendPasswordResetEmail
* **fe05cae** - Jacqueline Delgado, 10 days ago : feat: add reset-confirm route
* **571b8d5** - Jacqueline Delgado, 10 days ago : test: add red test for reset-confirm route
* **f9a5ffb** - Jacqueline Delgado, 10 days ago : test: update user mocks for new password reset columns
* **5720c76** - Jacqueline Delgado, 10 days ago : feat: add reset-request route
* **684f454** - Jacqueline Delgado, 10 days ago : test: add red test for reset-request route
* **8357e46** - Jacqueline Delgado, 10 days ago : feat: add resetPasswordWithCode
* **0d88e85** - Jacqueline Delgado, 10 days ago : test: add red test for resetPasswordWithCode
* **778de44** - Jacqueline Delgado, 10 days ago : feat: add requestPasswordReset for verified accounts
* **9a23b4b** - Jacqueline Delgado, 10 days ago : test: add red test for requestPasswordReset
* **86183ac** - Jacqueline Delgado, 10 days ago : feat: add verifyPasswordResetCode
* **34e6022** - Jacqueline Delgado, 10 days ago : agents md file update feature 17
* **f23a596** - Jacqueline Delgado, 10 days ago : test: add red test for verifyPasswordResetCode
* **d765d72** - Jacqueline Delgado, 10 days ago : feat: add createPasswordResetCode generator
* **d4d3008** - Jacqueline Delgado, 10 days ago : test: add red test for createPasswordResetCode
* **938e372** - Jacqueline Delgado, 10 days ago : updated the home page, added that's why they call it fishing and not catching
* **59c9a05** - Jacqueline Delgado, 10 days ago : updated the explore page and added more instruction per user feedback
* **76f8f7c** - Jacqueline Delgado, 10 days ago : updated footer on home page
* **3842eac** - Jacqueline Delgado, 10 days ago : updated read me and editted
* **1b5d11e** - Jacqueline Delgado, 10 days ago : updated README and added the Test-first provable paragraph
* **c464220** - Jacqueline Delgado, 10 days ago : updated Readme test files and test count on badge and on rules that kept it honest
* **755e703** - Jacqueline Delgado, 10 days ago : updated saltwater page, edited a typo
* **2667b86** - Jacqueline Delgado, 10 days ago : updated images on the pages
* **128d291** - Jacqueline Delgado, 10 days ago : updated the home page paragraph to state both GBIF and OBIS verified all apis using curl commands
* **fde3c73** - Jacqueline Delgado, 10 days ago : updated Travel-time tool paragraph on explore page
* **410c3a6** - Jacqueline Delgado, 11 days ago : feat: request today's tides in station local time from NOAA
* **d594d3d** - Jacqueline Delgado, 11 days ago : test: expect fetchTidePredictions to request tides for today
* **cba3b43** - Jacqueline Delgado, 11 days ago : feat: add Montauk, NYC, Boston, and Miami NOAA tide stations
* **430aa10** - Jacqueline Delgado, 11 days ago : feat: return empty tides when NOAA has no predictions instead of crashing
* **cfd00f0** - Jacqueline Delgado, 11 days ago : test: expect fetchTidePredictions to return empty array when NOAA has no predictions
* **d0b8999** - Jacqueline Delgado, 11 days ago : feat: pass tides to AI and return tide summary in eta route
* **6168a0e** - Jacqueline Delgado, 11 days ago : test: expect eta route to pass tides to AI and return tide summary
* **0569f82** - Jacqueline Delgado, 11 days ago : feat: have explainTravelEta summarize tides
* **5e0ad39** - Jacqueline Delgado, 11 days ago : test: expect explainTravelEta to summarize tides
* **0332917** - Jacqueline Delgado, 11 days ago : feat: fetch and return tides for saltwater trips in eta route
* **b1640b3** - Jacqueline Delgado, 11 days ago : test: expect eta route to fetch and return tides for saltwater trips
* **6cd4e0b** - Jacqueline Delgado, 11 days ago : feat: fetch high and low tide predictions from nearest NOAA station
* **356b1bc** - Jacqueline Delgado, 11 days ago : test: expect fetchTidePredictions to return high and low tides for nearest station
* **ae7d047** - Jacqueline Delgado, 11 days ago : updated readme file and added long and lat for users to try
* **b585247** - Jacqueline Delgado, 11 days ago : feat: widen reasonable ETA band so normal trips are not flagged implausible
* **c27572b** - Jacqueline Delgado, 11 days ago : test: expect checkEtaIsReasonable to accept ETA rounded slightly below expected
* **2c7f85c** - Jacqueline Delgado, 11 days ago : updated global css for the explore page cards. cards reduced from 3 cards to 2
* **b15d979** - Jacqueline Delgado, 11 days ago : feat: pass water type to fetchSpeciesAtLocation in eta route
* **d1e3f6a** - Jacqueline Delgado, 11 days ago : test: expect eta route to pass water type to fetchSpeciesAtLocation
* **158242e** - Jacqueline Delgado, 11 days ago : feat: fetch species at location by checking known species per water type
* **bc43590** - Jacqueline Delgado, 11 days ago : test: expect fetchSpeciesAtLocation to check known species by water type
* **3eb1d6c** - Jacqueline Delgado, 11 days ago : feat: display location species summary on Explore page
* **b0b88ce** - Jacqueline Delgado, 11 days ago : feat: pass species to AI and return location summary in eta route
* **3a84b09** - Jacqueline Delgado, 11 days ago : test: expect eta route to pass species to AI and return location summary
* **eea24b3** - Jacqueline Delgado, 11 days ago : feat: have explainTravelEta summarize species recorded at location
* **47fb543** - Jacqueline Delgado, 11 days ago : test: expect explainTravelEta to summarize species recorded at location
* **7cf1fa4** - Jacqueline Delgado, 11 days ago : feat: include species recorded at destination in eta route response
* **f9fa3c4** - Jacqueline Delgado, 11 days ago : test: expect eta route to include species recorded at destination
* **2a8c161** - Jacqueline Delgado, 11 days ago : feat: add fetchSpeciesAtLocation for GBIF species recorded near a location
* **c89ab05** - Jacqueline Delgado, 11 days ago : added css to sign up and login buttons
* **4fb36df** - Jacqueline Delgado, 11 days ago : added a quick fix to the signup and login pages are separate, caused a problem, added a <a href link to each to avoid touching tests that passed
* **80fd87a** - Jacqueline Delgado, 11 days ago : updated my readme to accurately show CRUD
* **896502c** - Jacqueline Delgado, 11 days ago : moved the species list to the right and up, and added a paragraph to each page for fresh water and saltwater about the data generated
* **64b4d9b** - Jacqueline Delgado, 11 days ago : added another <br /> to saltwater and freshwater page
* **ca4747c** - Jacqueline Delgado, 11 days ago : updated screenshot size in readme file
* **c39f5bc** - Jacqueline Delgado, 11 days ago : updated freshwater and saltwater page and added the correct <br />
* **853111d** - Jacqueline Delgado, 11 days ago : removed the <br> from my edit in the freshwater page
* **3332f3b** - Jacqueline Delgado, 11 days ago : added GBIF to freshwater page
* **e290508** - Jacqueline Delgado, 11 days ago : added a TDD before and after snapshot png on readme file
* **802db92** - Jacqueline Delgado, 11 days ago : updated Readme file
* **1f41573** - Jacqueline Delgado, 11 days ago : feat: rename About page and route to Explore, correct USGS copy to water conditions
* **b907c9d** - Jacqueline Delgado, 11 days ago : feat: rename About nav link to Explore
* **de8c613** - Jacqueline Delgado, 11 days ago : test: expect Explore nav link instead of About
* **a4cbebc** - Jacqueline Delgado, 11 days ago : feat: add eta route tying distance, conditions, AI, and reasonableness check
* **5c3981d** - Jacqueline Delgado, 11 days ago : test: add RED for eta route saltwater path
* **e06d502** - Jacqueline Delgado, 11 days ago : feat: add explainTravelEta OpenAI helper
* **3b64b9c** - Jacqueline Delgado, 11 days ago : test: add RED for explainTravelEta OpenAI helper
* **37a103f** - Jacqueline Delgado, 11 days ago : feat: add fetchUsgsWaterConditions USGS nearest-gauge seam
* **1cc4578** - Jacqueline Delgado, 11 days ago : test: add RED for fetchUsgsWaterConditions USGS nearest-gauge seam
* **355a3d1** - Jacqueline Delgado, 11 days ago : feat: add fetchForecastConditions Open-Meteo Forecast seam
* **32a154a** - Jacqueline Delgado, 11 days ago : test: add RED for fetchForecastConditions Open-Meteo Forecast seam
* **e082198** - Jacqueline Delgado, 11 days ago : feat: add fetchMarineConditions Open-Meteo Marine seam
* **efe72f5** - Jacqueline Delgado, 11 days ago : test: add RED for fetchMarineConditions Open-Meteo Marine seam
* **c0f5d7a** - Jacqueline Delgado, 11 days ago : feat: expand freshwater species list with CT game and panfish species
* **abd83fa** - Jacqueline Delgado, 11 days ago : feat: expand freshwater species list with CT game and panfish species
* **19f9d4c** - Jacqueline Delgado, 11 days ago : feat: expand saltwater species list to 40 with OBIS-backed game and food fish
* **e33d427** - Jacqueline Delgado, 11 days ago : feat: expand saltwater species list to 40 with OBIS-backed game and food fish
* **9383567** - Jacqueline Delgado, 11 days ago : feat: merge and dedupe GBIF + OBIS occurrence records in fetchOccurrenceRecords
* **3969f0a** - Jacqueline Delgado, 11 days ago : test: add red test for deduplicating overlapping GBIF and OBIS records
* **ae0547e** - Jacqueline Delgado, 11 days ago : test: add red test for merging GBIF and OBIS in fetchOccurrenceRecords
* **fe38f9e** - Jacqueline Delgado, 11 days ago : feat: implement fetchObisOccurrences (OBIS occurrence fetch)
* **604735b** - Jacqueline Delgado, 11 days ago : test: add red test for fetchObisOccurrences (OBIS occurrence fetch)
* **6c38180** - Jacqueline Delgado, 12 days ago : updated readme, favicon, and fixed logout issue
* **80aff98** - Jacqueline Delgado, 12 days ago : feat: show logout on all pages via SiteNav wrapper; mock fetch in home page test
* **33f6df5** - Jacqueline Delgado, 12 days ago : updated and added a test for log out, TDD, failed and passed, log out button
* **ccc30db** - Jacqueline Delgado, 12 days ago : postinstall: prisma generate to package json
* **a48b925** - Jacqueline Delgado, 12 days ago : feat: saved-spots UI on freshwater page — save, edit (name/notes), delete with confirm
* **c38bb2b** - Jacqueline Delgado, 12 days ago : Wire real OpenAI explanation in honest-guide voice using common name and month name
* **673021b** - Jacqueline Delgado, 12 days ago : Add verified species lists + clickable selector that fills species and coordinates
* **bf1a6bc** - Jacqueline Delgado, 12 days ago : Replace home page mock cards with 8 real GBIF-computed highlights (best month, weekly revalidate); add findBestMonth + getHomeHighlights test-first; honest CTA links
* **8ad1ec7** - Jacqueline Delgado, 12 days ago : Add verified species data (19 saltwater + 20 freshwater), fix GBIF bounding box, clean up test types
* **abc6396** - Jacqueline Delgado, 12 days ago : Fix GBIF bounding-box query + clean up test type errors, test-first
* **b5bdbf6** - Jacqueline Delgado, 12 days ago : Accept typographic minus in coordinate input (Feature 15 fix), test-first
* **c5213ee** - Jacqueline Delgado, 12 days ago : Add sighting-rate search form with coordinate validation (Feature 15 UI), test-first
* **273cda7** - Jacqueline Delgado, 12 days ago : Align recommendation confidence to three tiers (low/moderate/high) matching sighting-rate search, test-first
* **dbfbed8** - Jacqueline Delgado, 12 days ago : Wire occurrence fetch and sighting-rate search routes (Feature 16.1, 16.6), test-first
* **982e31e** - Jacqueline Delgado, 12 days ago : Wire auth and saved-spot API routes to logic (Feature 16.2-16.5), test-first
* **fa85296** - Jacqueline Delgado, 12 days ago : Add live Neon migration: User and SavedSpot tables (Feature 5 live database)
* **bdf35e6** - Jacqueline Delgado, 12 days ago : Stop tracking build output and generated files (apply .gitignore)
* **92fcd0c** - Jacqueline Delgado, 12 days ago : Add empirical sighting-rate search logic (Feature 15): rate, confidence tiers, Null Island filter, test-first
* **5040651** - Jacqueline Delgado, 12 days ago : Add Knots/ETA travel time (Feature 14) with distance calc and ETA sanity-check guard, test-first
* **cbfa375** - Jacqueline Delgado, 12 days ago : Add species marker-style lookup (Feature 13), test-first
* **608cd4b** - Jacqueline Delgado, 13 days ago : Add rugged nautical redesign to landing page (Feature 11)
* **deb0148** - Jacqueline Delgado, 13 days ago : Add recommendation feature (Feature 10) with consistent sample size and confidence, test-first
* **db48799** - Jacqueline Delgado, 13 days ago : Add post-login home buttons (Feature 8), test-first
* **31e3ca5** - Jacqueline Delgado, 13 days ago : nav bar (Feature 7), test-first
* **0aaaa34** - Jacqueline Delgado, 13 days ago : Add coordinate precision fix (Feature 6), test-first
* **499dded** - Jacqueline Delgado, 13 days ago : Refactor: consistent verify return shape, remove redundant spot filter, toggle password button label
* **5c28b95** - Jacqueline Delgado, 13 days ago : Add Must Have features 1-5 test-first: email verification, login, SavedSpot CRUD, delete confirmation, User-SavedSpot relationship
* **a7b7196** - Jacqueline Delgado, 13 days ago : GREEN 1.1: createEmailVerificationCode hashes code with future expiry
* **c35aeb8** - Jacqueline Delgado, 13 days ago : Initial commit: TDD on emailVerification.test.ts

## 📊 Test Metrics Summary
* **Total Tests:** 1
* **Passed:** 😄 0
* **Failed:** 😡 1

## 📝 Detailed Test Breakdown

| File | Test Case | Status | Duration |
| :--- | :--- | :--- | :--- |
| src/lib/saltwaterAgent.test.ts | runSaltwaterAgent | ❌ Fail | 6.405457999999953ms |
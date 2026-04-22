# Graph Report - C:\Users\gjram\sites\pickupgame-app  (2026-04-21)

## Corpus Check
- 43 files · ~50,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 219 nodes · 197 edges · 36 communities detected
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]

## God Nodes (most connected - your core abstractions)
1. `POST()` - 11 edges
2. `createClient()` - 4 edges
3. `initials()` - 3 edges
4. `Avatar()` - 3 edges
5. `normalizeContact()` - 3 edges
6. `validateProfile()` - 3 edges
7. `hasSupabaseAuthEnv()` - 3 edges
8. `middleware()` - 2 edges
9. `InfoScreen()` - 2 edges
10. `inputStyle()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `isEmail()`  [INFERRED]
  C:\Users\gjram\sites\pickupgame-app\src\app\api\signup\route.js → C:\Users\gjram\sites\pickupgame-app\src\lib\auth-profile.js
- `POST()` --calls--> `hasDatabaseUrl()`  [INFERRED]
  C:\Users\gjram\sites\pickupgame-app\src\app\api\signup\route.js → C:\Users\gjram\sites\pickupgame-app\src\lib\db\index.js
- `POST()` --calls--> `avatarFor()`  [INFERRED]
  C:\Users\gjram\sites\pickupgame-app\src\app\api\signup\route.js → C:\Users\gjram\sites\pickupgame-app\src\lib\auth-profile.js
- `POST()` --calls--> `userPayload()`  [INFERRED]
  C:\Users\gjram\sites\pickupgame-app\src\app\api\signup\route.js → C:\Users\gjram\sites\pickupgame-app\src\lib\auth-profile.js
- `POST()` --calls--> `getDb()`  [INFERRED]
  C:\Users\gjram\sites\pickupgame-app\src\app\api\signup\route.js → C:\Users\gjram\sites\pickupgame-app\src\lib\db\index.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (2): fieldKey(), gamesForField()

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (4): Avatar(), InfoScreen(), initials(), inputStyle()

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (11): avatarFor(), isEmail(), normalizeContact(), userPayload(), validateProfile(), getDb(), hasDatabaseUrl(), middleware() (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.2
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.2
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (2): AuthGate(), inputClass()

### Community 10 - "Community 10"
Cohesion: 0.4
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.4
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (2): createClient(), hasSupabaseAuthEnv()

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (2): createClient(), hasSupabaseAuthEnv()

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 17`** (2 nodes): `layout.js`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `manifest.js`, `manifest()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `page.js`, `HomePage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `page.js`, `FindPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `page.js`, `ProfilePage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `page.js`, `ReelPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `IOSFrame.jsx`, `IOSStatusBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `PwaRegistrar.jsx`, `PwaRegistrar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `SideNav.jsx`, `SideNav()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `drizzle.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `next.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `sw.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `db-migrate-if-configured.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `social-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `theme.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `schema.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 9 inferred relationships involving `POST()` (e.g. with `normalizeContact()` and `isEmail()`) actually correct?**
  _`POST()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `createClient()` (e.g. with `middleware()` and `POST()`) actually correct?**
  _`createClient()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
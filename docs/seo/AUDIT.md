# SEO, AEO & GEO Audit — NSH Media Services

- **Site:** https://nsh-media.vercel.app/
- **Brand:** NSH Media Services (brand name: NSH media)
- **Repository:** `E:\NSH\nsh-media`
- **Audit and implementation date:** 12 November 2026
- **Status:** Implemented and validated against a local production build. External account-level verification is still pending (see `MANUAL-TASKS.md`).

---

## 1. Scope and constraints

The engagement covered technical SEO, on-page SEO, answer engine optimization (AEO), generative engine optimization (GEO), structured data, internal linking, image delivery, and analytics readiness without changing the site's visual design or existing functionality.

Hard constraints applied throughout:

1. **No invented company facts.** No address, phone number, founding date, team size, awards, reviews, ratings, client counts, performance results, certifications, or guarantees were added.
2. **The database is the source of truth for services.** Only the three published services were treated as verified: Web Design (`web-design`), Web Development (`web-development`), and E-Commerce (`ecommerce`).
3. **No redesign.** Layout, animation, navigation behavior, authentication, admin, and client-portal functionality were preserved.
4. **No unnecessary dependencies.** Existing libraries were used.
5. **Public claims must be supportable.** Copy that implied capabilities, results, or support terms the business cannot substantiate was removed or softened.

---

## 2. Executive summary

The largest problems were not missing meta tags. They were **trust and consistency problems**:

- Public pages advertised services the business does not currently sell.
- Company facts and commercial promises were presented without a verified source.
- Canonical URLs, social images, and structured data were inconsistent or incomplete.
- Empty sections (portfolio, case studies, blog, careers) carried copy that implied proof or activity that did not exist.

The implementation now presents one consistent entity, three verified services, accurate package pricing, explicit limitations, and a crawlable, indexable public site. Private areas are excluded from search. Every indexable URL has a self-referencing canonical, a unique title and description, one H1, and valid JSON-LD.

### Implementation scorecard

This is a self-assessment of **implementation completeness against the requested scope**, not a ranking score and not a Lighthouse or Core Web Vitals result.

| Area | Score | Basis |
|---|---:|---|
| Crawlability and indexing | 92 | Sitemap, robots, canonical host, redirects, and private-route exclusion validated locally |
| Canonicals and URL structure | 95 | All 22 sitemap URLs return one self-referencing canonical |
| Metadata and social sharing | 94 | Unique titles/descriptions; OG/Twitter metadata; dynamic PNG OG image |
| Structured data | 90 | Organization, WebSite, WebPage, Service, FAQPage, BlogPosting, CreativeWork, OfferCatalog, BreadcrumbList builders; zero invalid JSON-LD blocks |
| Content accuracy and trust | 90 | Unverified services and claims removed; remaining gaps require business input |
| AEO answer readiness | 84 | Direct answers, service FAQs, pricing and process answers; no published blog corpus yet |
| GEO entity clarity | 86 | Consistent name, brand, services, contact email, canonical host, and `llms.txt` |
| Internal linking and architecture | 88 | Services, industries, portfolio, pricing, FAQ, blog, and contact cross-link; blog has no articles yet |
| Image and performance engineering | 76 | Hero reduced to 173 KB; PNG icons added; no field CWV measurement performed |
| Analytics and measurement readiness | 55 | GA4, GTM, Clarity, and Meta Pixel are env-gated; IDs are not configured |
| Off-site authority and local presence | 30 | No verified social profiles, directory listings, reviews, or location data |

**Unweighted average: 81/100.** The score is held back mainly by items that require account access or genuine business data, not by unfinished code.

---

## 3. Method

1. Reviewed every route under `src/app`, shared layouts, navigation, footer, metadata, sitemap, robots, and structured-data builders.
2. Queried the production database for published services, FAQs, pricing plans, blog posts, and projects.
3. Compared public claims against verified data.
4. Implemented changes in code and database content.
5. Ran TypeScript, a production build, and a local crawl of every sitemap URL plus private and redirected routes.
6. Parsed rendered HTML for title, description, canonical, robots meta, H1 count, Open Graph image, and JSON-LD validity.

No external rank tracking, backlink tool, Search Console data, or field Core Web Vitals data was available.

---

## 4. Baseline findings and remediation

### 4.1 Critical: unverified services in public navigation and content

**Finding:** The public site and service data implied offerings beyond the three published services, including SEO, branding, AI automation, and website maintenance. The database contained only Web Design, Web Development, and E-Commerce.

**Risk:** Misleading commercial information; poor entity clarity for search and AI systems; wasted crawl budget on thin or nonexistent service pages; potential customer disappointment.

**Action:** Navigation, footer, home page, services listing, service detail pages, industry pages, schema, sitemap, FAQ, pricing features, and `llms.txt` now describe only the three verified services. Legacy service URLs redirect permanently to `/services` or `/services/ecommerce`.

**Status:** Fixed.

### 4.2 Critical: fabricated or unverifiable company claims

**Finding:** About, contact, legal, and home-page copy contained claims about location, history, team, support, response times, guarantees, or capabilities that could not be verified. The old `LocalBusiness`-style data implied a physical address and phone number.

**Risk:** Trust and E-E-A-T damage; legal and consumer-protection exposure; inaccurate entity data being repeated by search and AI systems.

**Action:** Removed unverified addresses, phone numbers, founding history, team-size claims, awards, review/rating markup, response-time promises, refund guarantees, security guarantees, and SLA language. The Organization schema now contains only the verified name, brand, tagline, URL, description, email, logo, and service knowledge.

**Status:** Fixed. Legal and commercial copy still requires business/legal review.

### 4.3 High: canonical host and metadata inconsistency

**Finding:** Canonical references used a non-production domain (`nshmedia.com`) in at least the case-studies page, while the deployed site uses `nsh-media.vercel.app`. Open Graph images pointed to a static SVG.

**Risk:** Search engines could consolidate signals to a host that does not serve the site; social platforms often do not render SVG previews.

**Action:**

- Centralized the canonical origin in `src/lib/site.ts`, with `NEXT_PUBLIC_SITE_URL` as the override and `https://nsh-media.vercel.app` as the fallback.
- Added `metadataBase` and a reusable `pageMetadata()` helper for canonical, Open Graph, Twitter, keywords, and robots.
- Replaced the SVG social image with a generated 1200×630 PNG at `/api/og` and added page-specific titles/subtitles.
- Added a permanent `www` → primary-host redirect in `next.config.ts`.

**Status:** Fixed.

### 4.4 High: private and low-value pages could be indexed

**Finding:** `/admin`, `/client`, `/auth`, `/careers`, `/thank-you`, and the 404 experience were not consistently protected by noindex directives. The empty case-studies page was indexable and had a canonical pointing to the wrong host.

**Risk:** Authenticated or transactional pages appearing in search results; thin content; duplicate or misleading URLs.

**Action:**

- Server layouts for `/admin`, `/client`, and `/auth` emit `noindex, nofollow, nocache`.
- `/careers` and `/thank-you` emit `noindex, follow`.
- `/case-studies` and all child paths redirect permanently to `/portfolio`.
- `/thank-you` is disallowed in `robots.txt`.
- Removed the empty case-studies route and the unused `SchemaOrg` component.

**Status:** Fixed.

### 4.5 High: misleading pricing presentation

**Finding:** Project packages were displayed with `/month` labels and a monthly/annual toggle advertising “Save 20%,” even though the packages are project-based. Enterprise promised “24/7 Support” and “SLA Guaranteed.”

**Risk:** Pricing misrepresentation; consumer-protection exposure; structured-data mismatch.

**Action:** Removed the billing toggle and `/month` labels. Packages now read “From $X project-based,” Enterprise is “Custom,” and schema uses `PriceSpecification` with `minPrice` instead of a fixed unit price. SLA and 24/7 claims were removed from pricing features.

**Status:** Fixed.

### 4.6 High: thin service pages with weak AEO and internal linking

**Finding:** Service detail pages described capabilities but did not answer common buying questions in a structured way and had limited links to related work, pricing, and contact.

**Risk:** Weak relevance for commercial queries; poor extractability by answer engines; orphaned or weakly connected pages.

**Action:** Each service page now includes:

- A direct answer paragraph near the top.
- “Who this service is for” and the problems it addresses.
- Deliverables and a clear process.
- Service-specific FAQs with `FAQPage` schema.
- Related services, portfolio, blog, pricing, and contact links.
- Breadcrumbs in the UI and in `BreadcrumbList` schema.

**Status:** Fixed. Real case studies and testimonials are still required to strengthen proof.

### 4.7 Medium: missing or duplicated structured data

**Finding:** Structured data was not consistently page-specific, and some pages emitted duplicate or mismatched schema types. The organization entity included unverified data.

**Risk:** Rich-result ineligibility; ambiguous entity signals; validator warnings.

**Action:** Added a shared JSON-LD builder set and server-rendered page-level schema:

- Global: `Organization`, `WebSite`
- Home: `WebPage`, `FAQPage`
- Services listing: `WebPage`, `CollectionPage`, `BreadcrumbList`
- Service detail: `ItemPage`, `Service`, `FAQPage`, `BreadcrumbList`
- Portfolio: `WebPage`, `CollectionPage`, `BreadcrumbList`; project pages: `CreativeWork`, `BreadcrumbList`
- Blog: `WebPage`, `CollectionPage`, `BreadcrumbList`; posts: `BlogPosting`, `BreadcrumbList`
- FAQ: `WebPage`, `FAQPage`, `BreadcrumbList`
- Pricing: `WebPage`, `OfferCatalog`, `BreadcrumbList`
- About/Contact: `AboutPage` / `ContactPage`, `BreadcrumbList`
- Industry pages: `WebPage`, `BreadcrumbList`

All inline JSON-LD escapes `<` as `\u003c`.

**Status:** Fixed. Validation found zero invalid JSON-LD blocks across the 22 sitemap URLs.

### 4.8 Medium: image weight and missing raster icons

**Finding:** The hero background was a 1.93 MB PNG; an unused logo PNG was 1.51 MB; the favicon and app icons were SVG-only, which limits PWA and sharing support.

**Action:** Converted the hero background to a 173 KB JPEG, removed unused PNG assets, added 192×192 and 512×512 PNG icons plus an Apple touch icon, and kept the SVG favicon.

**Status:** Fixed at the asset level. Real-device performance was not measured.

### 4.9 Medium: content that implied activity or proof that did not exist

**Finding:** Blog copy referred to “our team of digital experts” with zero posts; the portfolio contained placeholder screenshots; careers listed fabricated perks and a fake application flow; the footer implied a newsletter; contact promised a 24-hour reply.

**Action:** Replaced implied proof with factual descriptions, removed fake portfolio screenshots and the fake application form, removed the newsletter implication, and changed response promises to “reply as soon as possible.” Portfolio and industry copy now describes services and applicability rather than unverified client history. Empty states explain that content will be added when verified material exists.

**Status:** Fixed. The blog, portfolio, testimonials, and careers pages remain intentionally sparse until real content is supplied.

### 4.10 Medium: AI/GEO discovery was absent

**Finding:** There was no `llms.txt` and no explicit policy for AI search and retrieval crawlers.

**Action:** Added `public/llms.txt` with the verified entity, three services, key pages, industries, working process, and explicit “do not infer” notes for address, phone, founding date, team size, awards, ratings, and results. `robots.txt` now allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Applebot, Google-Extended, and CCBot while blocking private areas.

**Status:** Fixed. AI citation outcomes cannot be guaranteed or measured from the repository.

### 4.11 Medium: analytics readiness was incomplete

**Finding:** Analytics scripts were present but env-gated, with no verification that IDs are configured in production. There was no documented conversion event map.

**Action:** Preserved the existing GA4, GTM, Microsoft Clarity, and Meta Pixel integrations and documented the required environment variables in `MANUAL-TASKS.md`. No unverified tracking IDs were invented.

**Status:** Code-ready; configuration pending.

### 4.12 Low: technical hardening

- Disabled the `X-Powered-By` header.
- Enforced `trailingSlash: false`.
- Added skip-to-content navigation.
- Kept the dynamic OG route crawlable for social and AI previews.
- Removed unused `mobile-nav.tsx`, `src/data/services.ts`, `og-default.svg`, `logo.png`, and `bg-hero.png`.

---

## 5. Post-implementation verification

All checks were run against a local production build (`npm run build`, `npm start`) on 12 November 2026.

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Passed |
| Production build | Passed, 37 static pages generated |
| Sitemap | HTTP 200, `application/xml`, 22 URLs, all HTTPS, all on canonical host |
| Sitemap exclusions | No `case-studies`, `/careers`, or `/admin` URLs |
| Sitemap URL crawl | 22/22 returned HTTP 200 |
| Canonicals | 22/22 self-referencing production URLs (home normalized without trailing slash) |
| Titles and descriptions | Unique across all 22 URLs |
| H1 | Exactly one H1 on every public URL |
| JSON-LD | 0 invalid blocks across all 22 URLs |
| Private pages | `/admin`, `/client`, `/auth/login`: `noindex, nofollow, nocache`; `/careers`, `/thank-you`: `noindex, follow` |
| Missing page | Returns HTTP 404 |
| Legacy redirects | `/case-studies*` → `/portfolio`; `/services/e-commerce` → `/services/ecommerce`; SEO/branding/AI-automation/maintenance → `/services` (all 308) |
| `robots.txt` | HTTP 200, declares sitemap, blocks private paths, allows major AI crawlers |
| `llms.txt` | HTTP 200, `text/plain`, lists only verified services and warns against invented facts |
| Dynamic OG image | HTTP 200, `image/png`, valid 1200×630 response |
| Pricing checks | No `/month`, no annual toggle, “project-based” present, `minPrice` schema present |
| FAQ disclosures | SEO and maintenance limitations present in rendered HTML |
| Copy accuracy checks | Portfolio empty state, no 24-hour response promise, project-based pricing language, and verified service disclosures all present |

---

## 6. What was intentionally not done

- No location pages or `LocalBusiness` address until a real service area and address are confirmed.
- No review, rating, or `AggregateRating` markup because there are no verified reviews.
- No case studies, testimonials, team bios, or client logos because no genuine data was supplied.
- No blog posts were invented to fill the blog index.
- No keyword-stuffed copy, hidden text, doorway pages, or paid-link scheme.
- No claim of ranking improvements, AI citations, or Core Web Vitals scores.

---

## 7. Remaining risks and dependencies

1. **Search Console and Bing Webmaster Tools verification** require account access and DNS or HTML verification.
2. **Analytics IDs** must be set in the deployment environment before traffic and conversion data can be trusted.
3. **Legal review** of the privacy, terms, and refund pages is still required.
4. **Proof content** (real projects, testimonials, team, founding date, service area) must come from the business.
5. **Core Web Vitals** must be measured against the deployed production URL with PageSpeed Insights or field data.
6. **Off-site authority** cannot be created from the codebase; it requires consistent profiles, listings, and genuine relationships.
7. **The canonical host** should be confirmed before launch. If a custom domain replaces `nsh-media.vercel.app`, set `NEXT_PUBLIC_SITE_URL`, update DNS, and re-verify all canonicals and redirects.

See `MANUAL-TASKS.md` for the operational checklist.

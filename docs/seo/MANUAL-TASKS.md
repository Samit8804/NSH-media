# Manual Tasks and Launch Checklist — NSH Media Services

- **Prepared:** 12 November 2026
- **Purpose:** Items that cannot be completed from the repository alone or that require account access, business data, or professional review.

The code and database changes are implemented. The tasks below are the remaining operational work.

---

## 1. Deployment and canonical host

| Priority | Task | Detail |
|---|---|---|
| P0 | Confirm the production host | The code falls back to `https://nsh-media.vercel.app`. If a custom domain will be used, set `NEXT_PUBLIC_SITE_URL` to that origin before building. |
| P0 | Set the environment variable in Vercel | `NEXT_PUBLIC_SITE_URL=https://nsh-media.vercel.app` (or the final custom domain, without a trailing slash). |
| P0 | Confirm `www` behavior | `next.config.ts` redirects `www.<host>` to the configured host. Verify the DNS record and the redirect in production. |
| P0 | Verify HTTPS | Confirm the production certificate and force HTTPS at the host/CDN level. |
| P1 | Decide whether to keep the `vercel.app` host | If a custom domain replaces it, update the canonical host, sitemap, robots, `llms.txt`, social profiles, and directory listings. |
| P1 | Redeploy after environment changes | Environment variables are read at build/runtime; rebuild and redeploy. |
| P0 | Rotate the seeded admin password | `prisma/seed.ts` creates an admin account with a development password. Change it in the database before production and keep real credentials out of source control. |

**Do not** change `NEXT_PUBLIC_SITE_URL` without re-running the canonical/sitemap checks. A mismatch creates duplicate-host signals.

---

## 2. Search Console and Bing Webmaster Tools

| Priority | Task | Detail |
|---|---|---|
| P0 | Verify Google Search Console | Use DNS verification or the existing HTML verification file. Confirm the property is the final canonical host. |
| P0 | Submit the sitemap | `https://nsh-media.vercel.app/sitemap.xml` |
| P0 | Verify the Google verification token | The root layout falls back to a hardcoded `GOOGLE_SITE_VERIFICATION` value. Confirm it belongs to the current property, or set the correct value in the environment. |
| P0 | Verify Bing Webmaster Tools | Import from Search Console or verify directly. Submit the same sitemap. |
| P1 | Inspect the 22 sitemap URLs | Request indexing for the home, services, pricing, FAQ, and about pages first. |
| P1 | Check coverage after 7 days | Look for “Discovered – currently not indexed,” “Crawled – currently not indexed,” soft 404s, and duplicate canonicals. |
| P2 | Review query data after 28 days | Identify queries where the site appears but does not yet have a dedicated answer. |

Expected exclusions from the sitemap: `/admin`, `/client`, `/auth`, `/careers`, `/thank-you`, and the redirected `/case-studies` and legacy service URLs. That is intentional.

---

## 3. Analytics and conversion tracking

The code supports these environment variables but no IDs are configured in the repository:

| Variable | Service | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | Format `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | Format `GTM-XXXXXXX` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | Project ID |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Pixel | Numeric pixel ID |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email | Optional override; defaults to the verified Gmail address |

**Important:** Loading both GA4 directly and GA4 through GTM can double-count pageviews. Choose one implementation:

- **Option A:** GA4 direct only (`NEXT_PUBLIC_GA_ID`).
- **Option B:** GTM only (`NEXT_PUBLIC_GTM_ID`), with GA4 configured inside the container.

Recommended events once an analytics ID exists:

- `generate_lead` on successful contact-form submission.
- `contact_email_click` on `mailto:` clicks.
- `pricing_view` on `/pricing`.
- `service_cta_click` on service-page calls to action.
- `portfolio_view` on `/portfolio`.

Do not treat analytics as complete until real-time and debug views confirm events in production.

---

## 4. Social previews and rich results

| Priority | Task | Detail |
|---|---|---|
| P0 | Test the dynamic OG image | Open `/api/og?title=NSH%20Media%20Services&subtitle=Visual%20Solutions` and confirm a 1200×630 PNG. |
| P0 | Test sharing previews | Use Facebook Sharing Debugger, LinkedIn Post Inspector, and any current X/Twitter preview tool. Re-scrape after deployment. |
| P1 | Test structured data | Use Google Rich Results Test and Schema Markup Validator on `/`, `/services/web-design`, `/faq`, and `/pricing`. |
| P1 | Confirm actual rich-result eligibility | Google limits FAQ rich results to a narrow set of authoritative sites. The `FAQPage` schema remains useful for understanding and AI retrieval, but do not promise FAQ snippets. |
| P2 | Check `sameAs` | `Organization.sameAs` only appears when real social profile URLs are set. Do not add placeholder profiles. |

---

## 5. Performance and Core Web Vitals

No field or lab measurement was run from the repository. After deployment:

| Priority | Task | Detail |
|---|---|---|
| P0 | Run PageSpeed Insights | Test the home page, one service page, and `/pricing` on mobile and desktop. Record LCP, INP, and CLS with the date and URL. |
| P0 | Test on a throttled connection | Confirm the hero background, fonts, and animations do not block rendering. |
| P1 | Review real-user data in Search Console | Core Web Vitals requires field data and traffic; check after 28 days. |
| P1 | Check image delivery | Confirm `/images/bg-hero.jpg` is served with long-lived caching and appropriate compression. |
| P1 | Check third-party scripts | GA4, GTM, Clarity, and Meta Pixel are env-gated. Only enable the ones actually used. |
| P2 | Consider a custom domain/CDN review | Confirm caching, compression, HTTP/2 or HTTP/3, and security headers with the hosting provider. |

Do not publish Lighthouse scores until they have been measured. If scores are recorded, include the device, connection profile, date, and URL.

---

## 6. Business data required for stronger E-E-A-T

The following items are intentionally absent. Supply verified data before adding them to the site or schema:

| Data | Where it would go | Requirement |
|---|---|---|
| Founding year | About page, Organization schema | Confirmed by the business |
| Address | Contact page, Organization schema, local listings | Only if a real business address is published |
| Phone number | Contact page, Organization schema | Confirmed and monitored |
| Service area | Contact/about, location pages | Confirmed geographic scope |
| Team members | About/team page, author bios | Real names, roles, photos, consent |
| Real projects | Portfolio and case studies | Client permission, scope, technologies, outcomes |
| Testimonials | Home/about/service pages | Real quote, attribution, permission |
| Awards/certifications | About page | Verifiable issuer and year |
| Client logos | Home/portfolio | Written permission |
| Guarantees/SLA terms | Pricing/legal pages | Legal and commercial approval |

When this data is added, update:

- `src/lib/site.ts` for the contact email.
- `src/lib/seo.ts` for Organization address/phone if the business decides to publish them.
- The About, Contact, and Legal page copy.
- `public/llms.txt` so AI systems receive the same facts.
- Any directory and social profiles so the entity data stays consistent.

---

## 7. Local search and off-site presence

| Priority | Task | Detail |
|---|---|---|
| P1 | Check Google Business Profile eligibility | Create a profile only if the business is eligible and can verify a real address or service area. Do not invent a location. |
| P1 | Create or confirm social profiles | LinkedIn, X/Twitter, GitHub, and YouTube are supported through environment variables. Only set profiles that are real, active, and use the same brand name and URL. |
| P2 | Claim legitimate directory listings | Use relevant, reputable directories. Keep the name, URL, email, and description consistent. Do not buy links or use spam directories. |
| P2 | Build genuine backlinks | Partner pages, client permissions, community involvement, and useful resources. No link schemes. |
| P2 | Monitor brand mentions | Respond to inaccurate third-party descriptions of the business. |

If a Google Business Profile is created, the Organization schema can be extended with `address`, `telephone`, and `areaServed` only after those facts are verified.

---

## 8. Legal and commercial review

| Priority | Task | Detail |
|---|---|---|
| P0 | Review the privacy policy | Confirm data collected, analytics providers, retention, and jurisdiction. The current copy is intentionally general and is not legal advice. |
| P0 | Review the terms of service | Confirm payment terms, intellectual property, portfolio display rights, liability, and termination. |
| P0 | Review the refund policy | Confirm the refund process and any statutory rights that apply. Do not add guarantees that the business will not honor. |
| P1 | Confirm the contact email | The public email is `nshmediaservice@gmail.com`. Confirm it is monitored and correct. |
| P1 | Confirm pricing language | Packages are presented as “From $X project-based.” Confirm the starting prices and scope before launch. |
| P1 | Confirm support language | Post-launch support is described as agreed per project; there is no standalone monthly maintenance plan. |

---

## 9. Content and proof tasks

| Priority | Task | Detail |
|---|---|---|
| P1 | Publish at least one real portfolio project | Add it in the admin area with a real brief, approach, technologies, and client-approved outcome. |
| P1 | Add real testimonials when available | Do not add review or rating schema until reviews are genuinely collected and displayed. |
| P1 | Publish the first three cornerstone articles | Use `CONTENT-PLAN.md`; fact-check every claim before publishing. |
| P2 | Add author information | Only when a real author with a real bio exists. |
| P2 | Refresh the industry pages | Add sector-specific examples only when they are genuine. |
| P2 | Add case-study links to service pages | Only after projects are published. |

The blog, portfolio, and testimonials sections currently have empty states. That is preferable to fabricated content.

---

## 10. Post-launch monitoring

### Weekly for the first month

- Search Console coverage and sitemap status.
- 404s and redirect chains.
- Contact-form submissions and email deliverability.
- Broken internal links.
- Any new “Crawled – currently not indexed” pages.

### Monthly

- Organic impressions and clicks by page.
- Query-to-page mismatch: add or revise answers where needed.
- Core Web Vitals field data.
- Referrals from AI assistants, where referrer data is available.
- Pricing and service accuracy.

### Quarterly

- Refresh the three service pages and the FAQ.
- Update `llms.txt` when services, prices, or contact details change.
- Review legal pages.
- Re-run structured-data validation after template changes.
- Re-run the production build and sitemap checks.

---

## 11. Verification commands

Run before each production deployment:

```powershell
cd E:\NSH\nsh-media
npx tsc --noEmit
npm run build
```

Run the production server locally and check the core endpoints:

```powershell
npm start
```

```powershell
Invoke-WebRequest http://localhost:3000/sitemap.xml -UseBasicParsing
Invoke-WebRequest http://localhost:3000/robots.txt -UseBasicParsing
Invoke-WebRequest http://localhost:3000/llms.txt -UseBasicParsing
Invoke-WebRequest http://localhost:3000/api/og -UseBasicParsing
```

After deployment, repeat against the production host and confirm:

- Every sitemap URL returns 200.
- Canonicals point to the production host.
- `/admin`, `/client`, and `/auth/login` return noindex directives.
- `/case-studies` and legacy service URLs return 308 redirects.
- `/sitemap.xml` contains 22 URLs while the blog and portfolio are empty (the count grows as content is published).
- The OG endpoint returns `image/png`.

---

## 12. Definition of done

The SEO/AEO/GEO implementation is complete when:

- [ ] Production host and `NEXT_PUBLIC_SITE_URL` match.
- [ ] Search Console and Bing Webmaster Tools are verified.
- [ ] The sitemap is submitted and accepted.
- [ ] Analytics IDs are configured and events are confirmed.
- [ ] PageSpeed Insights has been run and the results are recorded.
- [ ] Social previews render the dynamic OG image.
- [ ] Structured data passes the Rich Results Test and Schema Markup Validator.
- [ ] Legal pages have been reviewed.
- [ ] At least one real portfolio project and one real testimonial are published, if available.
- [ ] No page contains an unverified address, phone number, founding date, award, rating, result, or guarantee.

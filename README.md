# 손세림 GEO / AI Search Portfolio — Deploy package

## Deploy
Static HTML package. Deploy the folder as-is to Vercel, Netlify, GitHub Pages or another static host.
Canonical domain: https://sonserim.me.kr/

## GEO / search discovery structure
- Semantic HTML and crawlable text
- Descriptive page titles and meta descriptions
- Canonical URLs
- Dedicated URLs for About / Good GEO / GEO Measurement / Projects
- JSON-LD: WebSite, CollectionPage, ProfilePage, Person, Article, CreativeWork, BreadcrumbList
- Internal linking between knowledge pages and projects
- sitemap.xml with lastmod
- robots.txt allowing OAI-SearchBot and public search crawlers
- llms.txt as an experimental machine-readable summary (not treated as a ranking requirement)
- IndexNow verification key + submission helpers

## After every deployment
1. Google Search Console: inspect and request indexing for the homepage and changed URLs.
2. Submit https://sonserim.me.kr/sitemap.xml in Google Search Console.
3. Bing Webmaster Tools: submit the sitemap.
4. Run IndexNow helper after deploy:
   - Windows PowerShell: `powershell -ExecutionPolicy Bypass -File .\tools\submit-indexnow.ps1`
   - macOS/Linux: `bash ./tools/submit-indexnow.sh`
5. Re-run the fixed query set and record platform/date/result.

IndexNow key file: /6ff0e06ba7aceee660b6f06c3593a11f.txt

## Fixed query set
- 손세림 GEO
- 손세림 AI Search
- GEO 포트폴리오
- AI Search 포트폴리오
- 좋은 GEO란?
- GEO를 측정하는 방법

## Important
IndexNow and sitemaps help discovery but do not guarantee ranking or AI citation. Google AI search does not require a special GEO tag. The core strategy is crawlability, clear text, consistent entity signals, useful first-party content, internal links, and repeatable measurement.


## GEO portfolio hub
- `/geo-portfolio.html` — non-branded “GEO 포트폴리오” discovery를 위한 핵심 허브 페이지

## 방문자 분석 (GA4 + Clarity)

이 빌드에는 방문자 수, 클릭, 스크롤, 섹션 도달, 실제 읽은 시간을 측정할 수 있는 분석 코드가 포함되어 있습니다.
`assets/analytics-config.js`에 GA4 Measurement ID와 Microsoft Clarity Project ID를 입력하세요.
자세한 설정은 `ANALYTICS_SETUP.md`를 참고하세요.

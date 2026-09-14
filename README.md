# 손세림 GEO / AI Search Portfolio

PPT 디자인을 웹으로 재구성한 정적(static) 포트폴리오입니다. 빌드 도구가 필요하지 않아 Vercel, Netlify, GitHub Pages, Cloudflare Pages 등에 그대로 배포할 수 있습니다.

## 구조
- `index.html` — 메인 포트폴리오
- `project-01.html` — 여행상품 GEO 개선 실험 상세
- `project-02.html` — Portfolio GEO Experiment 상세
- `assets/styles.css` — PPT 기반 디자인/반응형 레이아웃
- `assets/main.js` — 스크롤 리빌, 메뉴, 진행률, 검증 루프 애니메이션
- `robots.txt`, `sitemap.xml`, `llms.txt` — 크롤링/검색 실험용 파일
- `favicon.svg`, `assets/og-image.png` — 브랜딩/공유 이미지

## 배포 전에 확인할 것
1. 현재 canonical·sitemap·robots는 PPT에 기재된 `https://sonserim.me.kr` 기준입니다. 다른 도메인을 쓸 경우 프로젝트 전체에서 `sonserim.me.kr`를 실제 도메인으로 교체하세요.
2. 하단 E-mail/GitHub는 현재 시각 요소만 있습니다. 실제 연락처 링크가 정해지면 `index.html`의 closing 섹션에 연결하세요.
3. Project 01 재측정 값은 아직 확정되지 않은 것으로 작성되어 있어 임의의 수치를 넣지 않았습니다.
4. 배포 후 Google Search Console에 사이트맵 `https://도메인/sitemap.xml`을 제출하고, Project 02 Query Set으로 Baseline을 기록하세요.

## 로컬 확인
```bash
python -m http.server 8080 -d .
```
그 뒤 `http://localhost:8080`에서 확인할 수 있습니다.

## Vercel / Netlify
저장소에 폴더 내용을 올리고 Framework preset을 `Other` 또는 static site로 선택하면 됩니다. Build command는 비워두고 Output directory는 루트(`.`)를 사용하세요.

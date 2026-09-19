# 포트폴리오 방문 분석 설정

이 버전에는 GA4 + Microsoft Clarity + 포트폴리오 맞춤 이벤트가 미리 연결되어 있습니다.
ID만 입력하면 배포 후 측정을 시작합니다.

## 1. GA4 연결

Google Analytics에서 웹 데이터 스트림을 만든 뒤 `G-...` 형식의 Measurement ID를 확인합니다.

`assets/analytics-config.js`를 열고:

```js
ga4MeasurementId: 'G-XXXXXXXXXX',
```

를 실제 ID로 교체합니다.

예:

```js
ga4MeasurementId: 'G-ABC123DE45',
```

## 2. Microsoft Clarity 연결

Clarity에서 프로젝트를 만든 뒤 Project ID를 확인합니다.

`assets/analytics-config.js`에서:

```js
clarityProjectId: 'CLARITY_PROJECT_ID',
```

를 실제 Project ID로 교체합니다.

## 3. 이 사이트가 자동으로 기록하는 이벤트

### 클릭
- `project_01_click`
- `project_02_click`
- `good_geo_click`
- `geo_measurement_click`
- `geo_portfolio_click`
- `email_click`
- `contact_click`
- `github_click`
- `external_link_click`

### 스크롤
- `scroll_25`
- `scroll_50`
- `scroll_75`
- `scroll_90`

### 섹션 도달
- `section_about_view`
- `section_good_geo_view`
- `section_measure_view`
- `section_project_01_view`
- `section_project_02_view`
- `section_closing_view`
- 기타 프로젝트 세부 섹션 이벤트

### 읽은 시간
탭이 실제로 보이는 시간만 누적하여 기록합니다.
- `engaged_15s`
- `engaged_30s`
- `engaged_60s`
- `engaged_120s`
- `engaged_180s`
- `page_engagement_summary` (`engaged_seconds`, `max_scroll_percent` 포함)

GA4 자체의 평균 참여 시간도 함께 사용할 수 있습니다.

## 4. 어디서 보면 되나

### GA4
- 실시간: 설치 직후 이벤트가 들어오는지 확인
- 보고서 > 참여도 > 페이지 및 화면: 페이지별 조회와 참여 시간
- 보고서 > 참여도 > 이벤트: 위 커스텀 이벤트 확인
- 탐색(Explorations): `project_01_click → project_02_click → section_closing_view` 같은 퍼널 구성

### Clarity
- Recordings: 방문자가 실제로 페이지를 어떻게 읽었는지
- Heatmaps: 어디를 클릭했는지
- Scroll maps: 어디까지 스크롤했는지

## 5. 배포 전 테스트

`assets/analytics-config.js`에서 임시로:

```js
debug: true
```

로 바꾸고 브라우저 개발자도구 Console을 열면 이벤트 발생을 확인할 수 있습니다.
실제 배포 전후에는 다시 `false`로 두는 것을 권장합니다.

## 주의

GA4/Clarity ID가 기본 placeholder 상태라면 외부 분석 스크립트는 로드되지 않습니다. 즉 ID를 넣기 전에는 사이트 디자인과 기능에는 영향이 없고 데이터도 전송되지 않습니다.

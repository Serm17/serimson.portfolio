(() => {
  'use strict';

  const config = window.PORTFOLIO_ANALYTICS || {};
  const debug = Boolean(config.debug);
  const hasGA4 = /^G-[A-Z0-9]+$/i.test(config.ga4MeasurementId || '') && config.ga4MeasurementId !== 'G-XXXXXXXXXX';
  const hasClarity = Boolean(config.clarityProjectId) && config.clarityProjectId !== 'CLARITY_PROJECT_ID';

  const log = (...args) => {
    if (debug) console.log('[Portfolio Analytics]', ...args);
  };

  // ---------- GA4 ----------
  if (hasGA4) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.ga4MeasurementId, {
      send_page_view: true,
      transport_type: 'beacon'
    });

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4MeasurementId)}`;
    document.head.appendChild(gaScript);
    log('GA4 enabled:', config.ga4MeasurementId);
  } else {
    log('GA4 disabled: Measurement ID를 analytics-config.js에 입력하세요.');
  }

  // ---------- Microsoft Clarity ----------
  if (hasClarity) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, 'clarity', 'script', config.clarityProjectId);
    log('Clarity enabled:', config.clarityProjectId);
  } else {
    log('Clarity disabled: Project ID를 analytics-config.js에 입력하세요.');
  }

  const cleanText = (value, max = 100) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
  const pagePath = `${location.pathname}${location.search}`;
  const pageTitle = document.title;

  function track(name, params = {}) {
    const payload = {
      page_path: pagePath,
      page_title: pageTitle,
      ...params
    };

    if (hasGA4 && typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
    }

    // Clarity는 클릭/스크롤/세션을 기본 수집하고, 이 이름을 custom event로도 남깁니다.
    if (hasClarity && typeof window.clarity === 'function') {
      try { window.clarity('event', name); } catch (_) {}
    }

    log(name, payload);
  }

  window.portfolioTrack = track;

  // ---------- 링크 클릭 ----------
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const label = cleanText(link.textContent || link.getAttribute('aria-label') || href);
    const absolute = (() => {
      try { return new URL(href, location.href); } catch (_) { return null; }
    })();

    const common = {
      link_text: label,
      link_url: absolute ? absolute.href : href
    };

    if (href.startsWith('mailto:')) {
      track('email_click', common);
      track('contact_click', { ...common, contact_type: 'email' });
      return;
    }

    if (absolute && /(^|\.)github\.com$/i.test(absolute.hostname)) {
      track('github_click', common);
      return;
    }

    if (/project-01\.html/i.test(href)) {
      track('project_01_click', common);
    } else if (/project-02\.html/i.test(href)) {
      track('project_02_click', common);
    } else if (/good-geo\.html/i.test(href)) {
      track('good_geo_click', common);
    } else if (/geo-measurement\.html/i.test(href)) {
      track('geo_measurement_click', common);
    } else if (/geo-portfolio\.html/i.test(href)) {
      track('geo_portfolio_click', common);
    } else if (href === '#closing' || href === '#contact') {
      track('contact_click', { ...common, contact_type: 'section' });
    }

    if (absolute && absolute.origin !== location.origin && !href.startsWith('mailto:')) {
      track('external_link_click', {
        ...common,
        link_domain: absolute.hostname
      });
    }
  }, { capture: true });

  // ---------- 스크롤 깊이 ----------
  const scrollMilestones = [25, 50, 75, 90];
  const scrollSeen = new Set();
  let maxScroll = 0;

  function getScrollPercent() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    return Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
  }

  function onScroll() {
    const pct = getScrollPercent();
    maxScroll = Math.max(maxScroll, pct);
    scrollMilestones.forEach((milestone) => {
      if (pct >= milestone && !scrollSeen.has(milestone)) {
        scrollSeen.add(milestone);
        track(`scroll_${milestone}`, { percent_scrolled: milestone });
      }
    });
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- 섹션 도달 ----------
  const sectionEventNames = {
    home: 'section_home_view',
    about: 'section_about_view',
    'good-geo': 'section_good_geo_view',
    measure: 'section_measure_view',
    'project-01': 'section_project_01_view',
    'project-01-problem': 'section_project_01_problem_view',
    findings: 'section_findings_view',
    optimization: 'section_optimization_view',
    validation: 'section_validation_view',
    'project-02': 'section_project_02_view',
    'portfolio-design': 'section_portfolio_design_view',
    'query-set': 'section_query_set_view',
    closing: 'section_closing_view'
  };

  if ('IntersectionObserver' in window) {
    const seenSections = new Set();
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
        const id = entry.target.id;
        if (!id || seenSections.has(id)) return;
        seenSections.add(id);
        track(sectionEventNames[id] || 'section_view', {
          section_id: id,
          section_heading: cleanText(entry.target.querySelector('h1,h2,h3')?.textContent || id)
        });
        sectionObserver.unobserve(entry.target);
      });
    }, { threshold: [0.45] });

    document.querySelectorAll('[data-section][id]').forEach((section) => sectionObserver.observe(section));
  }

  // ---------- 실제 읽은 시간 ----------
  // 브라우저 탭이 보이는 시간만 누적합니다.
  let activeStartedAt = document.visibilityState === 'visible' ? Date.now() : null;
  let engagedMs = 0;
  const timeMilestones = [15, 30, 60, 120, 180];
  const timeSeen = new Set();

  function updateEngagedTime() {
    if (activeStartedAt !== null) {
      const now = Date.now();
      engagedMs += now - activeStartedAt;
      activeStartedAt = now;
    }
    return Math.round(engagedMs / 1000);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      updateEngagedTime();
      activeStartedAt = null;
    } else {
      activeStartedAt = Date.now();
    }
  });

  const timeTimer = window.setInterval(() => {
    const seconds = updateEngagedTime();
    timeMilestones.forEach((milestone) => {
      if (seconds >= milestone && !timeSeen.has(milestone)) {
        timeSeen.add(milestone);
        track(`engaged_${milestone}s`, { engaged_seconds: milestone });
      }
    });
  }, 5000);

  // 페이지를 떠날 때 최종 체류/스크롤 요약을 beacon 전송 시도합니다.
  let summarySent = false;
  function sendSummary() {
    if (summarySent) return;
    summarySent = true;
    const seconds = updateEngagedTime();
    track('page_engagement_summary', {
      engaged_seconds: seconds,
      max_scroll_percent: maxScroll
    });
    clearInterval(timeTimer);
  }

  window.addEventListener('pagehide', sendSummary, { once: true });

  // ---------- 초기 상태 ----------
  track('portfolio_loaded', {
    referrer: document.referrer ? cleanText(document.referrer, 200) : '(direct)',
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight
  });
})();

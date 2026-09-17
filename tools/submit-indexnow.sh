#!/usr/bin/env bash
set -euo pipefail
curl -sS -X POST 'https://api.indexnow.org/indexnow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{"host":"sonserim.me.kr","key":"6ff0e06ba7aceee660b6f06c3593a11f","keyLocation":"https://sonserim.me.kr/6ff0e06ba7aceee660b6f06c3593a11f.txt","urlList":["https://sonserim.me.kr/","https://sonserim.me.kr/about.html","https://sonserim.me.kr/good-geo.html","https://sonserim.me.kr/geo-measurement.html","https://sonserim.me.kr/project-01.html","https://sonserim.me.kr/project-02.html"]}'
echo
echo "IndexNow submitted. This notifies participating engines; it does not guarantee indexing."


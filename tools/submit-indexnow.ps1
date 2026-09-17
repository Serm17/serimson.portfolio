$body = @{
  host = "sonserim.me.kr"
  key = "6ff0e06ba7aceee660b6f06c3593a11f"
  keyLocation = "https://sonserim.me.kr/6ff0e06ba7aceee660b6f06c3593a11f.txt"
  urlList = @(
    "https://sonserim.me.kr/",
    "https://sonserim.me.kr/about.html",
    "https://sonserim.me.kr/good-geo.html",
    "https://sonserim.me.kr/geo-measurement.html",
    "https://sonserim.me.kr/project-01.html",
    "https://sonserim.me.kr/project-02.html"
  )
} | ConvertTo-Json -Depth 3
Invoke-RestMethod -Uri "https://api.indexnow.org/indexnow" -Method Post -ContentType "application/json; charset=utf-8" -Body $body
Write-Host "IndexNow submitted. This notifies participating engines; it does not guarantee indexing."


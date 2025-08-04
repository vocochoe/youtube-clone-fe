# YouTube Clone Front-End

YouTube UI를 클론하여 제작한 웹 프로젝트입니다.  
HTML, CSS, JavaScript(순수 JS)와 Bootstrap5를 활용하여 **반응형 웹 페이지**와 **유튜브 스타일 인터랙션**을 구현했습니다.

- **메인 페이지**: 영상 목록, 카테고리 바, 반응형 사이드바
- **구독 페이지**: 구독 채널 영상 필터링 + 최신순 정렬
- **영상 상세 페이지**: iframe, 좋아요/싫어요, 댓글 작성 및 추천 영상

---

## 🔗 배포 링크

[https://vocochoe.github.io/youtube-clone-fe/](https://vocochoe.github.io/youtube-clone-fe/)

---

## 📌 주요 기능

### 1. 메인 페이지 (`index.html`)
- 상단 네비게이션 바
    - 로고 클릭 시 홈 이동
    - 검색창 입력 시 영상 검색
    - 사용자 아이콘 클릭 시 **프로필 드롭다운 메뉴**
- 좌측 사이드바
    - 반응형 (데스크탑: 확장/축소, 태블릿/모바일: 오버레이)
- 영상 카드
    - 썸네일, 제목, 채널명, 조회수, 업로드 시간 표시
    - **Hover 시 썸네일 미리보기 + 진행바 애니메이션**

### 2. 구독 페이지 (`pages/subscriptions.html`)
- 구독 채널 영상만 필터링
- **최신 업로드 순 정렬**
- **Grid / List 보기 전환** (LocalStorage 상태 저장)

### 3. 영상 상세 페이지 (`pages/video.html`)
- **YouTube iframe** 재생
- **좋아요 / 싫어요** 상태 토글
- **IndexedDB 기반 댓글 작성 및 실시간 렌더링**
- 설명란 **“더보기 / 간단히”** 토글
- 우측 추천 영상 **동적 렌더링**

### 4. 공통 기능
- `partials/header.html`, `partials/sidebar.html`을 `layout.js`에서 `fetch` 후 동적 로드
- **프로필 드롭다운 메뉴 & 외부 클릭 시 닫기**
- **반응형 사이드바 (collapsed / overlay / mobile)**
- **전역 검색 처리**: 다른 페이지에서도 검색 시 `index.html?search=keyword` 이동

---

## 📂 폴더 구조

``` yaml
youtube-clone-fe
├─ assets
│ ├─ images
│ ├─ videos
│ └─ sample-comments.json
├─ css
│ └─ style.css
├─ js
│ ├─ main.js
│ ├─ layout.js
│ ├─ subscriptions.js
│ ├─ video.js
│ ├─ db-seed.js
│ └─ data.js
├─ pages
│ ├─ subscriptions.html
│ └─ video.html
├─ partials
│ ├─ header.html
│ └─ sidebar.html
├─ index.html
└─ README.md
```

---

## 🛠 기술 스택

- **HTML5 / CSS3 / JavaScript (Vanilla JS)**
- **Bootstrap 5**
- **IndexedDB** (댓글 저장)
- **GitHub Pages** (배포)

---

## 🚀 실행 방법

1. 레포지토리 클론
```bash
git clone https://github.com/vocochoe/youtube-clone-fe.git
```
2. index.html을 브라우저에서 열기
   - VS Code Live Server 사용 추천 
3. GitHub Pages 배포 시 /youtube-clone-fe/ 경로 기반으로 동작

---

## 📸 프로젝트 시연

*(스크린샷 또는 시연 GIF 추가 예정)*

---

## 👥 팀 정보 & 커밋 컨벤션

- **커밋 타입**
  - `Feat` : 새로운 기능 추가
  - `Fix` : 버그 수정
  - `Docs` : 문서 수정
  - `Style` : 코드 스타일/디자인 수정
  - `Refactor` : 코드 구조 리팩토링
  - `Remove` : 파일/코드 삭제

---

### 비디오 데이터 예시 (data.js)
```js
const videoDataList = [
  {
    id: 1,
    title: "카드 승인액 증가‥소비 심리 회복하나",
    channel: "MBCNEWS",
    views: "14만회",
    uploaded: "2시간 전",
    thumbnail: "assets/images/thumbnail1.png",
    preview: "assets/videos/thumb-preview1.mp4",
    profile: "assets/images/profile1.jpg",
    duration: "1:33:57",
    iframeUrl: "https://www.youtube.com/embed/MC2mW_PnlxU",
    description: "올해 2분기 카드 사용액이...",
    subscribers: 1520000,
    likes: 5300
  }
];

```

### 샘플 댓글 JSON (sample-comments.json)
```json
{
  "videoId": 1,
  "username": "감자튀김",
  "profileImg": "assets/images/user1.png",
  "text": "와 이 영상 덕분에 이해 완료!",
  "absoluteTime": "2025-07-02T09:15:12Z"
}
```

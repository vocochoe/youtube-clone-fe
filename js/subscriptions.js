// ============================
// 구독 페이지 전용 스크립트
// ============================

// 구독 중인 채널의 영상만 필터링
function getSubscribedVideos(videoList, subscribedList) {
    const subscribedNames = subscribedList.map(channel => channel.name);
    return videoList.filter(video =>
        subscribedNames.some(name => video.channel.includes(name))
    );
}

// uploaded 문자열을 시간으로 변환
function uploadedToHours(uploaded) {
    const num = parseInt(uploaded.replace(/[^0-9]/g, ""), 10);
    if (uploaded.includes("시간")) return num;
    if (uploaded.includes("일")) return num * 24;
    if (uploaded.includes("주")) return num * 24 * 7;
    if (uploaded.includes("개월")) return num * 24 * 30;
    if (uploaded.includes("년")) return num * 24 * 365;
    return Number.MAX_SAFE_INTEGER; // 혹시 알 수 없는 형식
}

// 최신순 정렬
function sortVideosByUploaded(list) {
    return [...list].sort((a, b) => uploadedToHours(a.uploaded) - uploadedToHours(b.uploaded));
}

// 비디오 카드 렌더링
function renderSubscribedVideos(videoList, viewMode = "grid") {
    const container = document.getElementById("subscription-videos");
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    const baseURL = window.location.hostname.includes("localhost")
        ? "pages/video.html"
        : "https://vocochoe.github.io/youtube-clone-fe/pages/video.html";

    videoList.forEach(video => {
        const col = document.createElement("div");

        // Grid → 3열, List → 1열
        col.className = viewMode === "grid"
            ? "col-lg-4 col-md-6 col-sm-12 mb-5"
            : "col-12 mb-4";

        // 카드 구조
        col.innerHTML = viewMode === "grid"
            ? `
        <div class="video-card" data-id="${video.id}" role="button">
            <div class="thumbnail-wrapper position-relative mb-3">
                <img src="${video.thumbnail}" class="img-fluid thumbnail" alt="썸네일">
                <div class="progress-bg"><div class="progress-fill"></div></div>
                <span class="video-duration badge bg-dark position-absolute bottom-0 end-0 m-1">${video.duration}</span>
            </div>
            <div class="d-flex mt-2 align-items-start mb-3">
                <img src="${video.profile}" class="channel-icon me-2" alt="채널 이미지">
                <div class="video-info flex-grow-1">
                    <p class="video-title text-white mb-1 fw-bold fs-6">${video.title}</p>
                    <p class="video-meta text-secondary small mb-0">${video.channel} · 조회수 ${video.views} · ${video.uploaded}</p>
                </div>
                <div class="menu-wrapper position-relative ms-2">
                    <i class="bi bi-three-dots-vertical text-white fs-6 menu-toggle" role="button"></i>
                    <ul class="video-menu text-white p-2 rounded shadow-sm position-absolute d-none">
                        <li class="dropdown-item">현재 재생목록에 추가</li>
                        <li class="dropdown-item">나중에 볼 동영상에 저장</li>
                        <li class="dropdown-item">오프라인 저장</li>
                        <li class="dropdown-item">공유</li>
                        <li class="dropdown-item text-danger">신고</li>
                    </ul>
                </div>
            </div>
        </div>
        `
            : `
        <div class="video-card d-flex align-items-start" data-id="${video.id}" role="button">
            <!-- 썸네일 -->
            <div class="thumbnail-wrapper position-relative me-3" style="width: 320px; flex-shrink: 0;">
                <img src="${video.thumbnail}" class="img-fluid thumbnail" alt="썸네일">
                <div class="progress-bg"><div class="progress-fill"></div></div>
                <span class="video-duration badge bg-dark position-absolute bottom-0 end-0 m-1">${video.duration}</span>
            </div>

            <!-- 영상 정보 -->
            <div class="d-flex flex-column flex-grow-1">
                <p class="video-title text-white mb-2 fw-bold fs-5">${video.title}</p>
                <p class="video-meta text-secondary small mb-1">${video.channel} · 조회수 ${video.views} · ${video.uploaded}</p>
                <p class="video-meta text-secondary small mb-2">${video.description || ""}</p>
            </div>

            <!-- 메뉴 버튼 -->
            <div class="menu-wrapper position-relative ms-2">
                <i class="bi bi-three-dots-vertical text-white fs-6 menu-toggle" role="button"></i>
                <ul class="video-menu text-white p-2 rounded shadow-sm position-absolute d-none">
                    <li class="dropdown-item">현재 재생목록에 추가</li>
                    <li class="dropdown-item">나중에 볼 동영상에 저장</li>
                    <li class="dropdown-item">오프라인 저장</li>
                    <li class="dropdown-item">공유</li>
                    <li class="dropdown-item text-danger">신고</li>
                </ul>
            </div>
        </div>
        `;

        fragment.appendChild(col);

        col.querySelector(".video-card").addEventListener("click", () => {
            window.location.href = `${baseURL}?videoId=${video.id}`;
        });
    });

    container.appendChild(fragment);
}

// 초기 실행
window.addEventListener('DOMContentLoaded', () => {

    // 구독 영상 필터링
    let subscribedVideos = getSubscribedVideos(videoDataList, subscriptionList);

    // 최신순 정렬
    subscribedVideos = sortVideosByUploaded(subscribedVideos);

    // localStorage에서 뷰 모드 불러오기
    let currentView = localStorage.getItem("viewMode") || "grid";

    // 초기 렌더링
    renderSubscribedVideos(subscribedVideos, currentView);

    // 버튼 이벤트
    document.getElementById("grid-view-btn")?.addEventListener("click", () => {
        if (currentView !== "grid") {
            currentView = "grid";
            localStorage.setItem("viewMode", currentView);
            renderSubscribedVideos(subscribedVideos, currentView);
        }
    });

    document.getElementById("list-view-btn")?.addEventListener("click", () => {
        if (currentView !== "list") {
            currentView = "list";
            localStorage.setItem("viewMode", currentView);
            renderSubscribedVideos(subscribedVideos, currentView);
        }
    });
});

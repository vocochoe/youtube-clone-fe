// ============================
// 비디오 상세 페이지 스크립트
// ============================
let db = null;

window.addEventListener("DOMContentLoaded", async () => {
    await initDB(); // IndexedDB 초기화

    const urlParams = new URLSearchParams(window.location.search);
    const videoId = parseInt(urlParams.get("videoId"), 10);
    const currentVideo = videoDataList.find(video => video.id === videoId);

    if (!videoId || !currentVideo) return;

    // 비디오 기본 정보
    const iframe = document.getElementById("video-iframe");
    const title = document.getElementById("video-title");
    const channelProfile = document.getElementById("channel-profile");
    const channelName = document.getElementById("channel-name");
    const subscriberCount = document.getElementById("subscriber-count");
    const likeCount = document.querySelector(".like-count");

    iframe.src = currentVideo.iframeUrl;
    title.textContent = currentVideo.title;
    channelProfile.src = currentVideo.profile;
    channelName.textContent = currentVideo.channel;

    if (subscriberCount) {
        subscriberCount.textContent = `구독자 ${formatCount(currentVideo.subscribers)}명`;
    }
    if (likeCount) {
        likeCount.textContent = formatCount(currentVideo.likes);
    }

    renderDescription(currentVideo, false);
    renderRecommendedVideos(videoId);
    initLikeDislikeButtons(currentVideo.likes);

    renderComments(videoId);
    initCommentEvents(videoId);
});

// ============================
// IndexedDB 초기화
// ============================
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("YouTubeCloneDB", 1);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains("comments")) {
                db.createObjectStore("comments", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => reject(event.target.error);
    });
}

// ============================
// 댓글 저장 / 불러오기
// ============================
function saveComment(videoId, text) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("comments", "readwrite");
        const store = transaction.objectStore("comments");
        const now = new Date();

        const newComment = {
            videoId,
            username: "BoYun Choe",
            profileImg: "assets/images/user-icon.png",
            text,
            absoluteTime: now.toISOString()
        };

        const request = store.add(newComment);

        request.onsuccess = () => resolve(newComment);
        request.onerror = (event) => reject(event.target.error);
    });
}

function loadComments(videoId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("comments", "readonly");
        const store = transaction.objectStore("comments");
        const request = store.getAll();

        request.onsuccess = (event) => {
            const comments = event.target.result.filter(c => c.videoId === videoId);

            resolve(comments);
        };

        request.onerror = (event) => reject(event.target.error);
    });
}

// ============================
// 댓글 렌더링
// ============================
async function renderComments(videoId) {
    const comments = await loadComments(videoId);
    const container = document.getElementById("comments-container");
    const commentCount = document.getElementById("comment-count");

    if (!container || !commentCount) return;

    container.innerHTML = "";

    comments.reverse().forEach(comment => {
        const relativeTime = getRelativeTime(comment.absoluteTime);

        const div = document.createElement("div");
        div.className = "comment d-flex align-items-start gap-2 mb-3";
        div.innerHTML = `
            <img src="${comment.profileImg}" class="comment-profile rounded-circle flex-shrink-0">
            <div>
                <p class="text-white mb-1 fw-semibold">${comment.username}</p>
                <p class="text-white mb-1">${comment.text}</p>
                <div class="d-flex gap-3 text-secondary small">
                    <span>${relativeTime}</span>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    commentCount.textContent = comments.length;
}

// ============================
// 댓글 입력창 UI 및 이벤트
// ============================
function initCommentEvents(videoId) {
    const commentInput = document.getElementById("comment-input");
    const commentButtons = document.getElementById("comment-buttons");
    const cancelBtn = document.getElementById("cancel-button");
    const submitBtn = document.getElementById("submit-button");
    const commentInputWrapper = document.querySelector(".comment-input");

    commentInput.addEventListener("focus", () => {
        commentInputWrapper.classList.add("focused");
    });


    commentInput.addEventListener("blur", () => {
        if (commentInput.value.trim() === "") {
            commentInputWrapper.classList.remove("focused");
        }
    });

    commentInput.addEventListener("input", () => {
        const hasText = commentInput.value.trim() !== "";
        submitBtn.disabled = !hasText;
        submitBtn.classList.toggle("active", hasText);
    });


    cancelBtn.addEventListener("click", () => {
        commentInput.value = "";
        submitBtn.disabled = true;
        submitBtn.classList.remove("active");
        commentInputWrapper.classList.remove("focused");
    });

    // 댓글 저장
    submitBtn.addEventListener("click", async () => {
        const text = commentInput.value.trim();
        if (!text) return;

        await saveComment(videoId, text);

        commentInput.value = "";
        submitBtn.disabled = true;
        renderComments(videoId);
    });
}

// ============================
// 설명란 렌더링 + 토글
// ============================
let expanded = false;

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => `<a href="${url}" target="_blank" class="text-blue">${url}</a>`);
}

function renderDescription(video, expand = false) {
    const descriptionBox = document.getElementById("video-description");
    if (!descriptionBox) return;

    const shortViews = video.views;
    const longViews = video.viewsFull;
    const shortDate = video.uploaded;
    const longDate = video.uploadedAbsolute;
    const description = video.description.trim();
    const processedDescription = linkify(description).replace(/\n/g, "<br>");
    const displayText = expand ? processedDescription : truncateText(processedDescription, 2);

    descriptionBox.innerHTML = `
        <div class="video-meta-top fw-semibold mb-2 fw-semibold">
            조회수 ${expand ? longViews : shortViews} &nbsp; ${expand ? longDate : shortDate}
        </div>
        <div class="video-description-text ${expand ? "" : "collapsed"} text-white">
            ${displayText}
        </div>
        <div class="toggle-desc text-primary mt-2" style="cursor:pointer;">
            ${expand ? "간단히" : "더보기"}
        </div>
    `;
}

function truncateText(htmlText, maxLines) {
    const lines = htmlText.split("<br>");
    return lines.length <= maxLines ? htmlText : lines.slice(0, maxLines).join("<br>") + "<br>...";
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-desc")) {
        expanded = !expanded;

        const videoId = parseInt(new URLSearchParams(window.location.search).get("videoId"), 10);
        const currentVideo = videoDataList.find(video => video.id === videoId);

        if (currentVideo)
            renderDescription(currentVideo, expanded);
    }
});

// ============================
// 추천 영상 렌더링
// ============================
function renderRecommendedVideos(excludeId) {
    const container = document.getElementById("recommended-videos");
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const recommendedVideos = videoDataList.filter(video => video.id !== excludeId).slice(0, 10);

    recommendedVideos.forEach(video => {
        const card = document.createElement("div");
        const baseURL = window.location.hostname.includes("localhost")
            ? "pages/video.html"
            : "https://vocochoe.github.io/youtube-clone-fe/pages/video.html";

        card.className = "video-card d-flex gap-2";
        card.innerHTML = `
            <div class="thumbnail-wrapper position-relative" style="width: 180px; flex-shrink: 0;">
                <img src="${video.thumbnail}" class="img-fluid thumbnail" alt="썸네일">
                <video class="preview-video position-absolute top-0 start-0 w-100 h-100" muted loop preload="metadata">
                    <source src="${video.preview}" type="video/mp4">
                </video>
                 <div class="progress-bg"><div class="progress-fill"></div></div>
                <span class="video-duration badge bg-dark position-absolute bottom-0 end-0 m-1">${video.duration}</span>
            </div>
            <div class="video-info flex-grow-1">
                <p class="video-title text-white mb-1 fw-bold small">${video.title}</p>
                <p class="video-meta text-secondary small mb-0">${video.channel} 조회수 ${video.views}</p>
                <p class="video-meta text-secondary small mb-0">${video.uploaded}</p>
            </div>
        `;
        card.addEventListener("click", () => {
            window.location.href = `${baseURL}?videoId=${video.id}`;
        });

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    initThumbnailPreview();
}

// ============================
// 좋아요/싫어요 버튼
// ============================
function initLikeDislikeButtons(initialLikes = 0) {
    const likeBtn = document.querySelector(".like-btn");
    const dislikeBtn = document.querySelector(".dislike-btn");
    const likeCount = document.querySelector(".like-count");

    if (!likeBtn || !dislikeBtn || !likeCount) return;

    let liked = false, disliked = false, count = initialLikes;
    likeCount.textContent = formatCount(count);

    likeBtn.addEventListener("click", () => {
        const likeIcon = likeBtn.querySelector("i");
        const dislikeIcon = dislikeBtn.querySelector("i");

        if (liked) {
            liked = false; count -= 1;
            likeBtn.classList.remove("active");
            likeIcon.className = "bi bi-hand-thumbs-up";
        } else {
            liked = true; count += 1;
            likeBtn.classList.add("active");
            likeIcon.className = "bi bi-hand-thumbs-up-fill";

            if (disliked) {
                disliked = false;
                dislikeBtn.classList.remove("active");
                dislikeIcon.className = "bi bi-hand-thumbs-down";
            }
        }
        likeCount.textContent = formatCount(count);
    });

    dislikeBtn.addEventListener("click", () => {
        const likeIcon = likeBtn.querySelector("i");
        const dislikeIcon = dislikeBtn.querySelector("i");

        if (disliked) {
            disliked = false;
            dislikeBtn.classList.remove("active");
            dislikeIcon.className = "bi bi-hand-thumbs-down";
        } else {
            disliked = true;
            dislikeBtn.classList.add("active");
            dislikeIcon.className = "bi bi-hand-thumbs-down-fill";

            if (liked) {
                liked = false; count -= 1;
                likeBtn.classList.remove("active");
                likeIcon.className = "bi bi-hand-thumbs-up";
                likeCount.textContent = formatCount(count);
            }
        }
    });
}

// ============================
// 상대 시간 계산
// ============================
function getRelativeTime(absoluteTime) {
    const now = new Date();
    const past = new Date(absoluteTime);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    if (weeks < 5) return `${weeks}주 전`;
    if (months < 12) return `${months}개월 전`;
    return `${years}년 전`;
}


function initThumbnailPreview() {
    document.querySelectorAll(".video-card").forEach(card => {
        const video = card.querySelector(".preview-video");
        if (!video) return;

        card.addEventListener("mouseenter", () => {
            video.currentTime = 0;
            video.play().catch(() => {});
        });

        card.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// ============================
// 숫자 포맷
// ============================
function formatCount(num) {
    const formatNumber = (n, unit) => {
        const val = (n).toFixed(1);

        return val.endsWith(".0") ? parseInt(val) + unit : val + unit;
    };

    if (num >= 100000000) return formatNumber(num / 100000000, "억");
    if (num >= 10000) return formatNumber(num / 10000, "만");
    if (num >= 1000) return formatNumber(num / 1000, "천");

    return num.toString();
}

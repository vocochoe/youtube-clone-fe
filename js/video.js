// ============================
// 비디오 상세 페이지 전용 스크립트
// ============================
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = parseInt(urlParams.get("videoId"), 10);
    const currentVideo = videoDataList.find(video => video.id === videoId);

    if (!videoId) return;
    if (!currentVideo) return;

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
});

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

    if (!descriptionBox)
        return;

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

    if (lines.length <= maxLines)
        return htmlText;

    return lines.slice(0, maxLines).join("<br>") + "<br>...";
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

    if (!container)
        return;

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
}

// ============================
// 좋아요/싫어요 버튼 토글
// ============================
function initLikeDislikeButtons(initialLikes = 0) {
    const likeBtn = document.querySelector(".like-btn");
    const dislikeBtn = document.querySelector(".dislike-btn");
    const likeCount = document.querySelector(".like-count");

    if (!likeBtn || !dislikeBtn || !likeCount)
        return;

    let liked = false;
    let disliked = false;
    let count = initialLikes;

    likeCount.textContent = formatCount(count);

    likeBtn.addEventListener("click", () => {

        const likeIcon = likeBtn.querySelector("i");
        const dislikeIcon = dislikeBtn.querySelector("i");

        if (liked) {
            liked = false;
            count -= 1;
            likeBtn.classList.remove("active");
            likeIcon.className = "bi bi-hand-thumbs-up";
        } else {
            liked = true;
            count += 1;
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
                liked = false;
                count -= 1;
                likeBtn.classList.remove("active");
                likeIcon.className = "bi bi-hand-thumbs-up";
                likeCount.textContent = formatCount(count);
            }
        }
    });
}

// ============================
// 숫자 포맷: 1000 단위 -> 천/만/억, 소수점 .0 제거
// ============================
function formatCount(num) {
    const formatNumber = (n, unit) => {
        const val = (n).toFixed(1);
        return val.endsWith(".0") ? parseInt(val) + unit : val + unit;
    };

    if (num >= 100000000)
        return formatNumber(num / 100000000, "억");
    if (num >= 10000)
        return formatNumber(num / 10000, "만");
    if (num >= 1000)
        return formatNumber(num / 1000, "천");

    return num.toString();
}

// ============================
// 댓글 입력창 UI 인터랙션
// ============================
const commentInput = document.getElementById("comment-input");
const commentButtons = document.getElementById("comment-buttons");
const cancelBtn = document.getElementById("cancel-comment");
const submitBtn = document.getElementById("submit-comment");
const commentsContainer = document.getElementById("comments-container");
const commentCount = document.getElementById("comment-count");
let currentCommentCount = parseInt(commentCount.textContent, 10);

commentInput.addEventListener("focus", () => {
    commentButtons.style.display = "flex";
});

commentInput.addEventListener("input", () => {
    submitBtn.disabled = commentInput.value.trim() === "";
});

cancelBtn.addEventListener("click", () => {
    commentInput.value = "";
    commentButtons.style.display = "none";
    submitBtn.disabled = true;
});

submitBtn.addEventListener("click", () => {
    const text = commentInput.value.trim();

    if (!text) return;

    const newComment = document.createElement("div");

    newComment.className = "comment d-flex align-items-start gap-2 mb-3";
    newComment.innerHTML = `
        <img src="assets/images/user-icon.png" class="comment-profile rounded-circle flex-shrink-0">
        <div>
            <p class="text-white mb-1 fw-semibold">Boyun Choe</p>
            <p class="text-white mb-1">${text}</p>
            <div class="d-flex gap-3 text-secondary small">
                <span>방금 전</span>
                <span class="d-flex align-items-center gap-1">
                    <i class="bi bi-hand-thumbs-up"></i> 0
                </span>
                <span class="d-flex align-items-center gap-1">
                    <i class="bi bi-hand-thumbs-down"></i>
                </span>
                <span>답글</span>
            </div>
        </div>
    `;

    commentsContainer.prepend(newComment);
    currentCommentCount += 1;
    commentCount.textContent = currentCommentCount;

    commentInput.value = "";
    submitBtn.disabled = true;
});
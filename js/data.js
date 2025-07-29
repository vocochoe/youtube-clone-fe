// 기본 경로 설정
const relativeBasePath = "../assets/images/";
const absoluteBasePath = "https://vocochoe.github.io/youtube-clone-fe/assets/images/";

const basePath = relativeBasePath;
// const basePath = absoluteBasePath;

const videoDataList = [
    {
        id: 1,
        title: "구윤철 부총리 방미 · 트럼프, 중국에 개방 요구 - [LIVE] MBC 뉴스투데이 2025년 7월 29일",
        channel: "MBCNEWS",
        views: "14만회",
        uploaded: "2시간 전",
        thumbnail: `${basePath}thumbnail1.png`,
        profile: `${basePath}profile1.jpg`,
        duration: "1:33:57"
    },
    {
        id: 2,
        title: "오늘도 상큼하게🍊 여름엔 이런 텐션이지🌞 여름에 듣기 좋은 신나는 팝송 플리",
        channel: "Blue rain",
        views: "3.9천회",
        uploaded: "1일 전",
        thumbnail: `${basePath}thumbnail2.png`,
        profile: `${basePath}profile2.jpg`,
        duration: "3:09:55"
    },
    {
        id: 3,
        title: "요청이 많아 직접 알려드리는 나혼산 크림스튜 | 빠니보틀 편 레시피",
        channel: "요정재형",
        views: "7.8만회",
        uploaded: "6개월 전",
        thumbnail: `${basePath}thumbnail3.jpg`,
        profile: `${basePath}profile3.jpg`,
        duration: "8:18"
    },
    {
        id: 4,
        title: "무제 대표는 국제 도서전에서 몇 권의 책을 샀을까",
        channel: "출판사 무제 MUZE",
        views: "19만회",
        uploaded: "5일 전",
        thumbnail: `${basePath}thumbnail4.jpg`,
        profile: `${basePath}profile4.jpg`,
        duration: "27:35"
    },
    {
        id: 5,
        title: "💥 당신이 아는 ‘빅뱅’은 틀렸다! 충격적인 우주의 진짜 시작(feat. 정동희 우주론학자) [취미는 과학]",
        channel: "EBS 컬렉션 - 사이언스",
        views: "15만회",
        uploaded: "2일 전",
        thumbnail: `${basePath}thumbnail5.jpg`,
        profile: `${basePath}profile5.jpg`,
        duration: "48:05"
    },
    {
        id: 6,
        title: "FKJ | Ylang Ylang EP (Live Session)",
        channel: "FKJ",
        views: "4492만회",
        uploaded: "4년 전",
        thumbnail: `${basePath}thumbnail6.jpg`,
        profile: `${basePath}profile6.jpg`,
        duration: "19:11"
    },
    {
        id: 7,
        title: "이제 대세는 Claude Code!? 찐 꿀팁 대방출 🔥",
        channel: "노마드 코더 Nomad Coders",
        views: "5만회",
        uploaded: "8일 전",
        thumbnail: `${basePath}thumbnail7.jpg`,
        profile: `${basePath}profile7.jpg`,
        duration: "9:57"
    },
    {
        id: 8,
        title: "#프리한닥터W 💸 OO 통장을 만들어야 합니다! 전문가가 얘기하는 월 230만 원 급여로 1억 모으는 꿀팁!",
        channel: "디글 : Diggle",
        views: "6.8만회",
        uploaded: "2개월 전",
        thumbnail: `${basePath}thumbnail8.jpg`,
        profile: `${basePath}profile8.jpg`,
        duration: "19:16"
    },
    {
        id: 9,
        title: "[4K] 지금 빗속으로 걸어가는 나는 우산이 없어요. 폭우가 내리는 도시의 골목길에서 듣는 빗소리.",
        channel: "Hello Korea",
        views: "6.1천회",
        uploaded: "1일 전",
        thumbnail: `${basePath}thumbnail9.jpg`,
        profile: `${basePath}profile9.jpg`,
        duration: "11:36:16"
    }
];

const subscriptionList = [
    { name: "Hello Korea", profile: `${basePath}sub-profile1.png`, isLive: true },
    { name: "데일리서울 한강", profile: `${basePath}sub-profile2.jpg`, isLive: true },
    { name: "EBS 컬렉션 - 사이언스", profile: `${basePath}sub-profile3.jpg`, isLive: false },
    { name: "민음사TV", profile: `${basePath}sub-profile4.jpg`, isLive: false },
    { name: "B tv 이동진의 파이아키아", profile: `${basePath}sub-profile5.jpg`, isLive: false },
    { name: "디글 클래식 :Diggle Classic", profile: `${basePath}sub-profile6.jpg`, isLive: false },
    { name: "출판사 무제 MUZ", profile: `${basePath}sub-profile7.jpg`, isLive: false },
    { name: "Vito ASMR", profile: `${basePath}sub-profile8.jpg`, isLive: false },
    { name: "딩고 뮤직 / dingo music", profile: `${basePath}sub-profile9.jpg`, isLive: false },
    { name: "예술의 이유", profile: `${basePath}sub-profile10.jpg`, isLive: false },
    { name: "라인개발실록", profile: `${basePath}sub-profile11.jpg`, isLive: false },
    { name: "JANE HANDCOCK", profile: `${basePath}sub-profile12.jpg`, isLive: false },
];

const categoryList = [
    { name: "전체", active: true },
    { name: "음악" },
    { name: "게임" },
    { name: "라이브" },
    { name: "요리" },
    { name: "최근 업로드" },
    { name: "감상한 영상" },
    { name: "새로운 추천" },
    { name: "추가" }
];
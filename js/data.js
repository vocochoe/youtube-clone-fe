// 기본 경로 설정
const relativeBasePath = "../assets/images/";
const absoluteBasePath = "https://vocochoe.github.io/youtube-clone-fe/assets/images/";

const basePath = relativeBasePath;
//const basePath = absoluteBasePath;

const videoDataList = [
    {
        id: 1,
        title: "구윤철 부총리 방미 · 트럼프, 중국에 개방 요구 - [LIVE] MBC 뉴스투데이 2025년 7월 29일",
        channel: "MBCNEWS",
        views: "14만회",
        uploaded: "2시간 전",
        thumbnail: `${basePath}thumbnail1.png`,
        profile: `${basePath}profile1.jpg`,
        duration: "1:33:57",
        description: "실시간 뉴스 방송: 한미중 외교와 경제 현안 집중 보도"
    },
    {
        id: 2,
        title: "오늘도 상큼하게🍊 여름엔 이런 텐션이지🌞 여름에 듣기 좋은 신나는 팝송 플리",
        channel: "Blue rain",
        views: "3.9천회",
        uploaded: "1일 전",
        thumbnail: `${basePath}thumbnail2.png`,
        profile: `${basePath}profile2.jpg`,
        duration: "3:09:55",
        description: "여름 감성을 살려주는 신나는 해외 팝송 모음"
    },
    {
        id: 3,
        title: "요청이 많아 직접 알려드리는 나혼산 크림스튜 | 빠니보틀 편 레시피",
        channel: "요정재형",
        views: "7.8만회",
        uploaded: "6개월 전",
        thumbnail: `${basePath}thumbnail3.jpg`,
        profile: `${basePath}profile3.jpg`,
        duration: "8:18",
        description: "따뜻하고 부드러운 크림스튜를 만드는 쉬운 레시피 공개"
    },
    {
        id: 4,
        title: "무제 대표는 국제 도서전에서 몇 권의 책을 샀을까",
        channel: "출판사 무제 MUZE",
        views: "19만회",
        uploaded: "5일 전",
        thumbnail: `${basePath}thumbnail4.jpg`,
        profile: `${basePath}profile4.jpg`,
        duration: "27:35",
        description: "국제 도서전 현장 리뷰와 다양한 책 이야기"
    },
    {
        id: 5,
        title: "💥 당신이 아는 ‘빅뱅’은 틀렸다! 충격적인 우주의 진짜 시작(feat. 정동희 우주론학자) [취미는 과학]",
        channel: "EBS 컬렉션 - 사이언스",
        views: "15만회",
        uploaded: "2일 전",
        thumbnail: `${basePath}thumbnail5.jpg`,
        profile: `${basePath}profile5.jpg`,
        duration: "48:05",
        description: "우주의 탄생과 빅뱅에 대한 새로운 과학적 시각"
    },
    {
        id: 6,
        title: "FKJ | Ylang Ylang EP (Live Session)",
        channel: "FKJ",
        views: "4492만회",
        uploaded: "4년 전",
        thumbnail: `${basePath}thumbnail6.jpg`,
        profile: `${basePath}profile6.jpg`,
        duration: "19:11",
        description: "감각적인 라이브 연주로 듣는 FKJ의 명곡 모음"
    },
    {
        id: 7,
        title: "이제 대세는 Claude Code!? 찐 꿀팁 대방출 🔥",
        channel: "노마드 코더 Nomad Coders",
        views: "5만회",
        uploaded: "8일 전",
        thumbnail: `${basePath}thumbnail7.jpg`,
        profile: `${basePath}profile7.jpg`,
        duration: "9:57",
        description: "최신 AI 코딩 도구 Claude Code 활용 꿀팁과 트렌드"
    },
    {
        id: 8,
        title: "#프리한닥터W 💸 OO 통장을 만들어야 합니다! 전문가가 얘기하는 월 230만 원 급여로 1억 모으는 꿀팁!",
        channel: "디글 : Diggle",
        views: "6.8만회",
        uploaded: "2개월 전",
        thumbnail: `${basePath}thumbnail8.jpg`,
        profile: `${basePath}profile8.jpg`,
        duration: "19:16",
        description: "월급 230만 원으로 1억 모으는 현실 재테크 가이드"
    },
    {
        id: 9,
        title: "[4K] 지금 빗속으로 걸어가는 나는 우산이 없어요. 폭우가 내리는 도시의 골목길에서 듣는 빗소리.",
        channel: "Hello Korea",
        views: "6.1천회",
        uploaded: "1일 전",
        thumbnail: `${basePath}thumbnail9.jpg`,
        profile: `${basePath}profile9.jpg`,
        duration: "11:36:16",
        description: "폭우가 내리는 한국 골목길의 생생한 빗소리 ASMR"
    },
    {
        id: 10,
        title: "(playlist) 깊은 밤 불 꺼진 집으로 돌아온 너에게",
        channel: "데일리서울 한강 라이브캠",
        views: "7,719회",
        uploaded: "7개월 전",
        thumbnail: `${basePath}thumbnail10.jpg`,
        profile: `${basePath}profile10.jpg`,
        duration: "1:03:40",
        description: "잔잔한 한국곡으로 구성된 밤 감성 플레이리스트"
    },
    {
        id: 11,
        title: "지금까지 이런 섬은 없었다…",
        channel: "예술의 이유",
        views: "36,143회",
        uploaded: "1년 전",
        thumbnail: `${basePath}thumbnail11.jpg`,
        profile: `${basePath}profile11.jpg`,
        duration: "11:47",
        description: "죽기 전에 꼭 가봐야 할 예술섬, 나오시마 탐방기"
    },
    {
        id: 12,
        title: "[ENG] 튜링상 수상자가 말하는 국가 간 AI 경쟁 상황은? 안 르쿤 박사 인터뷰",
        channel: "김지윤의 지식Play",
        views: "108,807회",
        uploaded: "2개월 전",
        thumbnail: `${basePath}thumbnail12.jpg`,
        profile: `${basePath}profile12.jpg`,
        duration: "21:15",
        description: "AI와 국제 경쟁에 대한 심층 인터뷰"
    },
    {
        id: 13,
        title: "\"죽지 않는 검은 고양이의 비밀\" 공포썰 수집가들과 함께하는 독서모임",
        channel: "민음사TV",
        views: "46,679회",
        uploaded: "5일 전",
        thumbnail: `${basePath}thumbnail13.jpg`,
        profile: `${basePath}profile13.jpg`,
        duration: "59:40",
        description: "에드거 앨런 포 단편선 독서모임"
    },
    {
        id: 14,
        title: "JANE HANDCOCK, Anderson .Paak - Stare at Me (Official Music Video)",
        channel: "JANE HANDCOCK",
        views: "1,189,156회",
        uploaded: "1개월 전",
        thumbnail: `${basePath}thumbnail14.jpg`,
        profile: `${basePath}profile14.jpg`,
        duration: "3:42",
        description: "힙합 아티스트 JANE HANDCOCK의 신곡 뮤직비디오"
    },
    {
        id: 15,
        title: "[선공개] 유재석의 절친 송은이! 친구의 성장을 본 은이의 속마음",
        channel: "유 퀴즈 온 더 튜브",
        views: "15,869회",
        uploaded: "1일 전",
        thumbnail: `${basePath}thumbnail15.jpg`,
        profile: `${basePath}profile15.jpg`,
        duration: "8:45",
        description: "유 퀴즈 온 더 블록 EP.304 선공개"
    },
    {
        id: 16,
        title: "정서불안의 끝",
        channel: "정서불안 김햄찌",
        views: "796,194회",
        uploaded: "3주 전",
        thumbnail: `${basePath}thumbnail16.jpg`,
        profile: `${basePath}profile16.jpg`,
        duration: "12:50",
        description: "햄찌의 일상 브이로그와 심리적 이야기"
    },
    {
        id: 17,
        title: "악뮤의 킬링보이스 라이브! - 라면인건가, DINOSAUR, Love Lee 외",
        channel: "딩고 뮤직 / dingo music",
        views: "28,424,403회",
        uploaded: "2년 전",
        thumbnail: `${basePath}thumbnail17.jpg`,
        profile: `${basePath}profile17.jpg`,
        duration: "16:57",
        description: "AKMU의 대표곡을 한 자리에서 듣는 킬링보이스"
    },
    {
        id: 18,
        title: "가독성 높은 코드를 쓰려면? | 라인개발실록",
        channel: "라인개발실록",
        views: "2,029회",
        uploaded: "6개월 전",
        thumbnail: `${basePath}thumbnail18.jpg`,
        profile: `${basePath}profile18.jpg`,
        duration: "5:36",
        description: "개발자가 알아야 할 코드 리뷰와 가독성 꿀팁"
    },
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
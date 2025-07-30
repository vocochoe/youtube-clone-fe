// 기본 경로 설정
const relativeBasePath = "../assets/images/";
const absoluteBasePath = "https://vocochoe.github.io/youtube-clone-fe/assets/images/";

const basePath = relativeBasePath;
//const basePath = absoluteBasePath;

const videoDataList = [
    {
        id: 1,
        title: "카드 승인액 증가‥소비 심리 회복하나 (2025.07.30/12 MBC뉴스)",
        channel: "MBCNEWS",
        views: "14만회",
        viewsFull: "142,352회",
        uploaded: "2시간 전",
        uploadedAbsolute: "2025.07.29",
        thumbnail: `${basePath}thumbnail1.png`,
        profile: `${basePath}profile1.jpg`,
        duration: "1:33:57",
        iframeUrl: "https://www.youtube.com/embed/MC2mW_PnlxU?si=lSrAcc274vzX9Z9_",
        description: "올해 2분기 카드 사용액이 지난해 같은 기간보다 증가했습니다.\n대내 불확실성이 줄어들고 경기 부양에 대한 기대가 높아지며\n소비심리가 회복되고 있다는 분석입니다."
    },
    {
        id: 2,
        title: "오늘도 상큼하게🍊 여름엔 이런 텐션이지🌞 여름에 듣기 좋은 신나는 팝송 플리",
        channel: "Blue rain",
        views: "3.9천회",
        viewsFull: "3,912회",
        uploaded: "1일 전",
        uploadedAbsolute: "2025.07.28",
        thumbnail: `${basePath}thumbnail2.png`,
        profile: `${basePath}profile2.jpg`,
        duration: "3:09:55",
        iframeUrl: "https://www.youtube.com/embed/nQkunoZiLm4?si=3T4KiIGBJKOZt0WL",
        description: "여름 햇살처럼 상큼한 오렌지팝🍊\n기분전환이 필요할 땐, 이 청량한 팝송들로 리프레시하세요🌿\n\n지금 재생되는 이 영상은\n여름에 듣기 좋은 노래,\n상큼하고 청량한 팝송,\n드라이브 음악,\n햇살 가득한 여름 플레이리스트,\n기분 좋아지는 음악,\n일할 때 듣는 팝송을 찾는 분들께 추천합니다🎧"
    },
    {
        id: 3,
        title: "모닥불에서 지브리 밥 크림 스튜와 치즈",
        channel: "ALPHA TEC",
        views: "470만회",
        viewsFull: "4,702,567회",
        uploaded: "6개월 전",
        uploadedAbsolute: "2019.03.31",
        thumbnail: `${basePath}thumbnail3.jpg`,
        profile: `${basePath}profile3.jpg`,
        duration: "12:40",
        iframeUrl: "https://www.youtube.com/embed/--UAe9AsjfU?si=oPt8GHHgAuTbMSeh",
        description: "화이트 소스는 일제의 인스턴트 분말을 사용하고 있습니다.\n이번에는 지브리 애니메이션 '마루 밑 아리에 티'에서 아버지가 빵에 큰 구멍 뚫린 치즈를 얹어 가마에서 구워 치즈 빵과 나무 그릇에받는 브로콜리가 들어간 크림 스튜를 만들어 보았습니다.\n분위기가 나도록 재료, 식기, BGM 등을 선택 제작하고 있으므로 즐길 수 있습니다.\n나무 그릇은 올리브의 그릇을 사용하고 있습니다."
    },
    {
        id: 4,
        title: "무제 대표는 국제 도서전에서 몇 권의 책을 샀을까",
        channel: "출판사 무제 MUZE",
        views: "19만회",
        viewsFull: "190,125회",
        uploaded: "5일 전",
        uploadedAbsolute: "2025.07.24",
        thumbnail: `${basePath}thumbnail4.jpg`,
        profile: `${basePath}profile4.jpg`,
        duration: "27:35",
        iframeUrl: "https://www.youtube.com/embed/qHRqfeSbHlE?si=M20CSdICSgiTIToM",
        description: "서울국제도서전(쟁)에 참가했습니다. 이겨냈는지 져버렸는지 모르겠습니다.\n\n촬영 #신우주픽처스\n출연 #박정민\n제작 #출판사무제\nmusic by #구름"
    },
    {
        id: 5,
        title: "💥 당신이 아는 ‘빅뱅’은 틀렸다! 충격적인 우주의 진짜 시작(feat. 정동희 우주론학자) [취미는 과학]",
        channel: "EBS 컬렉션 - 사이언스",
        views: "15만회",
        viewsFull: "150,753회",
        uploaded: "2일 전",
        uploadedAbsolute: "2025.07.27",
        thumbnail: `${basePath}thumbnail5.jpg`,
        profile: `${basePath}profile5.jpg`,
        duration: "48:05",
        iframeUrl: "https://www.youtube.com/embed/JU13n1vlTEk?si=lSq6L3hLl-XnV9ja",
        description: "📢 📢댓글 이벤트\n댓글로 시청 소감 또는 【취미는 과학】이 다루었으면 하는 주제를 남겨주세요! 추첨을 통해 정동희 교수의 추천도서 《우주를 만드는 16가지 방법》을 선물로 드립니다.\n✅ 참여 기간 : 7/26(토) ~ 7/31(목)\n✅ 당첨자 발표 : 8/1(금) 고정 댓글 확인!\n\n우주의 시작, 빅뱅에 대해 우리가 갖고 있던 오해! 사실은 한 점에서 터진게 아니었다?! 빅뱅, 세 가지만 알면 끝난다는데... 138억 년 간 이어져 온 우주의 어제, 오늘과 내일을 살펴본다."
    },
    {
        id: 6,
        title: "FKJ | Ylang Ylang EP (Live Session)",
        channel: "FKJ",
        views: "4492만회",
        viewsFull: "44,920,432회",
        uploaded: "4년 전",
        uploadedAbsolute: "2020.09.03",
        thumbnail: `${basePath}thumbnail6.jpg`,
        profile: `${basePath}profile6.jpg`,
        duration: "19:11",
        iframeUrl: "https://www.youtube.com/embed/pfU0QORkRpY?si=JZODucxzxRM9D918",
        description: "Ylang Ylang EP live from the studio. Vinyl available everywhere: https://smarturl.it/FKJYlangYlang\n\nDirected by Kasuy\nEdited by Kasuy\nAssistant: Antoni Ryan\nColourist: Stephan Derluguian"
    },
    {
        id: 7,
        title: "이제 대세는 Claude Code!? 찐 꿀팁 대방출 🔥",
        channel: "노마드 코더 Nomad Coders",
        views: "5만회",
        viewsFull: "50,012회",
        uploaded: "8일 전",
        uploadedAbsolute: "2025.07.21",
        thumbnail: `${basePath}thumbnail7.jpg`,
        profile: `${basePath}profile7.jpg`,
        duration: "9:57",
        iframeUrl: "https://www.youtube.com/embed/-8JTwRH23VY?si=eQ4zpxPWjbuOGmVJ",
        description: "자비없는 성능....!\n고수처럼 Claude Code 설정하기!"
    },
    {
        id: 8,
        title: "#프리한닥터W 💸 OO 통장을 만들어야 합니다! 전문가가 얘기하는 월 230만 원 급여로 1억 모으는 꿀팁!",
        channel: "디글 : Diggle",
        views: "6.8만회",
        viewsFull: "68,231회",
        uploaded: "2개월 전",
        uploadedAbsolute: "2025.05.15",
        thumbnail: `${basePath}thumbnail8.jpg`,
        profile: `${basePath}profile8.jpg`,
        duration: "19:16",
        iframeUrl: "https://www.youtube.com/embed/I9JgUpsyMaU?si=Ey50byglcejXn-Ua",
        description: "티빙에서 스트리밍 : https://tving.onelink.me/xHqC/30a78d6f"
    },
    {
        id: 9,
        title: "[4K] 지금 빗속으로 걸어가는 나는 우산이 없어요. 폭우가 내리는 도시의 골목길에서 듣는 빗소리.",
        channel: "Hello Korea",
        views: "6.1천회",
        viewsFull: "6,132회",
        uploaded: "1일 전",
        uploadedAbsolute: "2025.07.28",
        thumbnail: `${basePath}thumbnail9.jpg`,
        profile: `${basePath}profile9.jpg`,
        duration: "11:36:16",
        iframeUrl: "https://www.youtube.com/embed/z441XPhg-qo?si=38p2dlaVDFeKYvSR",
        description: "[4K] 지금 빗속으로 걸어가는 나는 우산이 없어요. 폭우가 내리는 도시의 골목길에서 듣는 빗소리.\n📷촬영 장소: 세종특별시 나성동\n🎬This is a Looping Video for enough Rest."
    },
    {
        id: 10,
        title: "(playlist) 깊은 밤 불 꺼진 집으로 돌아온 너에게",
        channel: "데일리서울 한강 라이브캠",
        views: "7.7천회",
        viewsFull: "7,719회",
        uploaded: "7개월 전",
        uploadedAbsolute: "2025.01.03",
        thumbnail: `${basePath}thumbnail10.jpg`,
        profile: `${basePath}profile10.jpg`,
        duration: "1:03:40",
        iframeUrl: "https://www.youtube.com/embed/wpjBPlKLsBc?si=HFbt1X1Ni_KvKLGJ",
        description: "안녕하세요, 데일리서울입니다.\n\n조용히 찾아와 함께 경치와 음악을 즐겨주시는 분들을 위해, 최근 듣고 있는 잔잔한 한국 곡들로 플레이리스트를 준비해왔어요. 상냥한 곡도 쓸쓸한 곡도 뒤섞여 있는, 유독 걸음이 무거운 저녁에 가만히 귀 기울이기 좋은 곡들을 위주로 구성해봤어요. 때로는 나와 비슷한 쓸쓸함을 느끼며 이 도시를 걷는 누군가가 있다는 사실만으로도 묘하게 위로가 되더라고요.\n\n언제나처럼 이 채널이 도시 속을 살아가는, 혹은 이 도시를 그리는 여러분에게 숨 돌릴 수 있는 구석이 되기를 바라며 플레이리스트를 올려봅니다."
    },
    {
        id: 11,
        title: "지금까지 이런 섬은 없었다…",
        channel: "예술의 이유",
        views: "3.6만회",
        viewsFull: "36,143회",
        uploaded: "1년 전",
        uploadedAbsolute: "2024.09.05",
        thumbnail: `${basePath}thumbnail11.jpg`,
        profile: `${basePath}profile11.jpg`,
        duration: "11:47",
        iframeUrl: "https://www.youtube.com/embed/W9NQ006imjM?si=kHBSm8FTEVyzoamT",
        description: "버려진 섬 나오시마는 어떻게 현대미술 성지가 되었을까?\n\n죽기 전 꼭 가봐야 할 여행지로 꼽힐만큼 유명한 예술섬, 나오시마. 하지만 1980년대까지만 하더라도 이 섬은 사람이 떠나 황폐해진 '버려진' 섬이었는데요. 한 기업인과 유명 건축가의 용기있는 결심이 일본 정부의 정책적 지원과 맞물려, 섬 전체를 한 점의 예술로 바꿔놓았습니다.\n\n지역과 예술을 사랑하는 사람들의 노력으로 탄생한, 전 세계 수많은 현대미술의 성지들. 한국에서도 비슷한 사례를 찾아볼 수 있는데요."
    },
    {
        id: 12,
        title: "[ENG] 튜링상 수상자가 말하는 국가 간 AI 경쟁 상황은? 안 르쿤 박사 인터뷰",
        channel: "김지윤의 지식Play",
        views: "10.8만회",
        viewsFull: "108,807회",
        uploaded: "2개월 전",
        uploadedAbsolute: "2025.05.17",
        thumbnail: `${basePath}thumbnail12.jpg`,
        profile: `${basePath}profile12.jpg`,
        duration: "21:15",
        iframeUrl: "https://www.youtube.com/embed/A_d-QJfMBUU?si=AiPiUyyrInQ0bLel",
        description: "링상 수상자가 말하는 국가 간 AI 경쟁 상황은? AI에 대한 두려움은 과장되었다?\n싱가포르에서 만난 Meta 수석 AI 과학자 얀 르쿤 박사와의 대화를 공개합니다!\n\n즐거움과 유익함이 가득가득, 김지윤의 지식Play!"
    },
    {
        id: 13,
        title: "\"죽지 않는 검은 고양이의 비밀\" 공포썰 수집가들과 함께하는 독서모임",
        channel: "민음사TV",
        views: "4.6만회",
        viewsFull: "46,679회",
        uploaded: "5일 전",
        uploadedAbsolute: "2025.07.25",
        thumbnail: `${basePath}thumbnail13.jpg`,
        profile: `${basePath}profile13.jpg`,
        duration: "59:40",
        iframeUrl: "https://www.youtube.com/embed/_NZT3pxieZE?si=yikVt0l7mlBsYYgf",
        description: "00:00 | 하이라이트\n00:42 | 오프닝\n01:32 | 오늘의 게스트\n03:25 | “내가 가장 무서워하는 것은?”\n10:14 | 오늘의 책 에드거 앨런 포 『에드거 앨런 포 단편선』\n12:25 | 인상 깊었던 단편\n22:14 | 주제 1. 어셔가의 몰락 : 공포에 끌리는 이유\n30:00 | 1-1. 나는 나를 믿을 수 있는가?\n35:22 | 주제 2. 도둑맞은 편지 : 트릭의 탄생\n44:56 | 2-1. 나만의 비밀 편지를 숨긴다면?\n51:04 | 마무리 책 추천\n56:13 | 소감\n58:56 | 다음 모임 책"
    },
    {
        id: 14,
        title: "JANE HANDCOCK, Anderson .Paak - Stare at Me (Official Music Video)",
        channel: "JANE HANDCOCK",
        views: "118만회",
        viewsFull: "1,189,156회",
        uploaded: "1개월 전",
        uploadedAbsolute: "2025.06.27",
        thumbnail: `${basePath}thumbnail14.jpg`,
        profile: `${basePath}profile14.jpg`,
        duration: "3:42",
        iframeUrl: "https://www.youtube.com/embed/9YI4U1N3RAc?si=cv2VMxS9Uyp-HnKF",
        description: "Instagram:   / msjanehandcock  \nFacebook:   / msjanehandcock  \nX:   / msjanehandcock  \nYouTube:    / @msjanehandcock  \nLil daddy’s from LA’s on his way\nand I can't wait to see\ndiamonds dancing on his neck\npretty smile\nVANS on his feet"
    },
    {
        id: 15,
        title: "[선공개] 유재석의 절친 송은이! 친구의 성장을 본 은이의 속마음",
        channel: "유 퀴즈 온 더 튜브",
        views: "1.5만회",
        viewsFull: "15,869회",
        uploaded: "3시간 전",
        uploadedAbsolute: "2025.07.30",
        thumbnail: `${basePath}thumbnail15.jpg`,
        profile: `${basePath}profile15.jpg`,
        duration: "8:45",
        iframeUrl: "https://www.youtube.com/embed/mIq7VYJflaE?si=wWj9PjXKxOLC93si",
        description: "유 퀴즈 온 더 블록 EP.304 선공개\n티빙에서 스트리밍 : https://tving.onelink.me/xHqC/30a78d6f\n유 퀴즈 온 더 블럭\n[수] 저녁 8:45 tvN"
    },
    {
        id: 16,
        title: "정서불안의 끝",
        channel: "정서불안 김햄찌",
        views: "79만회",
        viewsFull: "796,194회",
        uploaded: "2주 전",
        uploadedAbsolute: "2025.07.11",
        thumbnail: `${basePath}thumbnail16.jpg`,
        profile: `${basePath}profile16.jpg`,
        duration: "12:50",
        iframeUrl: "https://www.youtube.com/embed/0QHoEDvgCIY?si=gzcBUOXIxMqAUndx",
        description: "이번주도 잘 보냈니?\n이번주도 치열했다..그나저나 도대체 진짜 여행 계획은 언제짜지..\n일단 옵치 큐 돌리고 생각해보까?\n"
    },
    {
        id: 17,
        title: "악뮤의 킬링보이스 라이브! - 라면인건가, DINOSAUR, Love Lee 외",
        channel: "딩고 뮤직 / dingo music",
        views: "2842만회",
        viewsFull: "28,424,403회",
        uploaded: "2년 전",
        uploadedAbsolute: "2023.08.29",
        thumbnail: `${basePath}thumbnail17.jpg`,
        profile: `${basePath}profile17.jpg`,
        duration: "16:57",
        iframeUrl: "https://www.youtube.com/embed/3Hr35Kr2aXA?si=GdRCwy7Cnm7M-wmd",
        description: "악뮤(AKMU)의 킬링보이스를 라이브로!\n띵곡의 향연! 들을수록 좋은 이번 킬링보이스\n힐링하고 가세요🫡💕"
    },
    {
        id: 18,
        title: "가독성 높은 코드를 쓰려면? | 라인개발실록",
        channel: "라인개발실록",
        views: "2천회",
        viewsFull: "2,029회",
        uploaded: "6개월 전",
        uploadedAbsolute: "2025.01.24",
        thumbnail: `${basePath}thumbnail18.jpg`,
        profile: `${basePath}profile18.jpg`,
        duration: "5:36",
        iframeUrl: "https://www.youtube.com/embed/W8mH1Ij3bUk?si=Vt-ZXqYYdnZkxZ02",
        description: "읽기 쉬운 코드는 생산성을 높입니다 🆙\n코드가 읽기 쉽다면 코드를 읽는 속도도 빨라지고 오해도 줄어듭니다.\n더욱 원활한 협업이 가능해지죠!\n그렇다면 읽기 쉬운 코드는 어떻게 쓸 수 있을까요?\n코드 가독성에 대해 고민해온 엔지니어 Ishikawa 님과 함께 알아봅니다."
    }
];


const subscriptionList = [
    {
        name: "Hello Korea",
        profile: `${basePath}sub-profile1.png`,
        isLive: true
    },
    {
        name: "데일리서울 한강",
        profile: `${basePath}sub-profile2.jpg`,
        isLive: true
    },
    {
        name: "EBS 컬렉션 - 사이언스",
        profile: `${basePath}sub-profile3.jpg`,
        isLive: false
    },
    {
        name: "민음사TV",
        profile: `${basePath}sub-profile4.jpg`,
        isLive: false
    },
    {
        name: "B tv 이동진의 파이아키아",
        profile: `${basePath}sub-profile5.jpg`,
        isLive: false
    },
    {
        name: "디글 클래식 :Diggle Classic",
        profile: `${basePath}sub-profile6.jpg`,
        isLive: false
    },
    {
        name: "출판사 무제 MUZ",
        profile: `${basePath}sub-profile7.jpg`,
        isLive: false
    },
    {
        name: "Vito ASMR",
        profile: `${basePath}sub-profile8.jpg`,
        isLive: false
    },
    {
        name: "딩고 뮤직 / dingo music",
        profile: `${basePath}sub-profile9.jpg`,
        isLive: false
    },
    {
        name: "예술의 이유",
        profile: `${basePath}sub-profile10.jpg`,
        isLive: false
    },
    {
        name: "라인개발실록",
        profile: `${basePath}sub-profile11.jpg`,
        isLive: false
    },
    {
        name: "JANE HANDCOCK",
        profile: `${basePath}sub-profile12.jpg`,
        isLive: false
    }
];


const categoryList = [
    {name: "전체", active: true},
    {name: "음악"},
    {name: "게임"},
    {name: "라이브"},
    {name: "요리"},
    {name: "최근 업로드"},
    {name: "감상한 영상"},
    {name: "새로운 추천"},
    {name: "추가"}
];
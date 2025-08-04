// ============================
// 샘플 댓글 시드 스크립트 - 최초 1회만 삽입
// ============================

(() => {
    let seedDB = null;

    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("YouTubeCloneDB", 1);

            request.onupgradeneeded = (event) => {
                seedDB = event.target.result;

                if (!seedDB.objectStoreNames.contains("comments")) {
                    seedDB.createObjectStore("comments", { keyPath: "id", autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                seedDB = event.target.result;
                resolve(seedDB);
            };

            request.onerror = (event) => reject(event.target.error);
        });
    }

    function getAllComments() {
        return new Promise((resolve, reject) => {
            const tx = seedDB.transaction("comments", "readonly");
            const store = tx.objectStore("comments");
            const request = store.getAll();

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async function seedSampleComments() {
        await initDB();

        const existingComments = await getAllComments();
        if (existingComments.length > 0) {
            console.log(`${existingComments.length}개의 댓글 존재`);

            return;
        }

        const response = await fetch("assets/sample-comments.json");
        const data = await response.json();

        const txWrite = seedDB.transaction("comments", "readwrite");
        const storeWrite = txWrite.objectStore("comments");

        data.forEach(comment => storeWrite.add(comment));

        txWrite.oncomplete = () => {
            console.log(`샘플 댓글 ${data.length}개 삽입 완료`);
        };
        txWrite.onerror = () => {
            console.error("샘플 데이터 삽입 실패");
        };
    }

    // 페이지 로드 시 자동 실행
    seedSampleComments();
})();

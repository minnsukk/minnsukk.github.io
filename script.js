async function loadPosts() {
    try {
        // GitHub API로 posts 폴더 목록 가져오기
        const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/posts`);
        const files = await res.json();

        // HTML 파일만 필터링
        const htmlFiles = files.filter(file => file.name.endsWith(".html"));

        // 날짜 형식 추출 (파일명 앞부분 YYYY-MM-DD)
        const posts = htmlFiles.map(file => {
            const dateMatch = file.name.match(/^(\d{4}-\d{2}-\d{2})/);
            const date = dateMatch ? dateMatch[1] : "2000-01-01";
            const title = file.name.replace(".html", "").replace(/^\d{4}-\d{2}-\d{2}-?/, "");
            return {
                name: file.name,
                title: decodeURIComponent(title.replace(/-/g, " ")),
                date: date
            };
        });

        // 최신순 정렬
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // HTML에 목록 추가
        const postList = document.getElementById("post-list");
        posts.forEach(post => {
            const li = document.createElement("li");
            li.textContent = `${post.title} (${post.date})`;
            li.onclick = () => window.location.href = `posts/${post.name}`;
            postList.appendChild(li);
        });
    } catch (error) {
        console.error("글 목록 불러오기 실패:", error);
    }
}

loadPosts();

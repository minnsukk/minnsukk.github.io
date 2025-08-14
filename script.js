// posts 폴더에 있는 글 목록
// ["파일명", "제목", "날짜"] 형식
const posts = [
    ["2025-08-15-test.html", "첫 번째 글", "2025-08-15"],
    ["2025-08-10-example.html", "예시 글", "2025-08-10"],
    ["2025-08-01-old.html", "오래된 글", "2025-08-01"]
];

// 날짜 최신순으로 정렬
posts.sort((a, b) => new Date(b[2]) - new Date(a[2]));

// HTML에 목록 추가
const postList = document.getElementById("post-list");
posts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = post[1];
    li.onclick = () => window.location.href = `posts/${post[0]}`;
    postList.appendChild(li);
});

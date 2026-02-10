// module.exports = async function () {
//     const query = `{
//         query GetPostContent {
//             post(id: "16", idType: DATABASE_ID) {
//                 id
//                 title   
//                 content
//                 date
//             }
//         }`; 
//     try {
//         const response = await fetch('http://headless-project.py-media.com/graphql', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query })
//         });
//         const result = await response.json();
//         const postContent = result.data.post;

//         console.log(`DEBUG: Đã lấy nội dung bài viết với ID ${postContent.id}.`);
//         return postContent;
//     }catch (error) {
//         console.error("Error fetching post content:", error);
//         return null;
//     }
// }
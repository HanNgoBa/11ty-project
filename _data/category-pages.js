// module.exports = async function() {
//     const query = `
//     query GetCategoriesAndTheirPosts {
//       categories {
//         nodes {
//           name
//           slug
//           posts {
//             nodes {
//               title
//               slug
//               date
//               excerpt
//               featuredImage {
//                 node {
//                   sourceUrl
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     `;

//     try {
//         const response = await fetch('http://headless-project.py-media.com/graphql', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query })
//         });
//         const result = await response.json();
//         return result.data.categories.nodes;
//     } catch (error) {
//         console.error("Lỗi fetch categories:", error);
//         return [];
//     }
// };
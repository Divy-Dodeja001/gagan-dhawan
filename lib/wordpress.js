const POSTS_API =
  "http://gagandhawan.me/wp-json/wp/v2/posts?_fields=id,date,slug,status,title,excerpt,yoast_head_json&status=publish&orderby=date&order=desc";

export async function getAllPosts() {
  const res = await fetch(POSTS_API, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostById(id) {
  const res = await fetch(
    `http://gagandhawan.me/wp-json/wp/v2/posts/${id}?_fields=id,date,slug,status,title,excerpt,content,yoast_head_json`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getOgImage(post) {
  return post?.yoast_head_json?.og_image?.[0]?.url || "";
}

export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}
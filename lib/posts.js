import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getSortedPostsData(locale) {
  const postsLocaleDirectory = path.join(postsDirectory, locale);
  // Get file names under /content/blog/[locale]
  const fileNames = fs.readdirSync(postsLocaleDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsLocaleDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(locales) {
  let paths = [];
  locales.forEach((locale) => {
    const postsLocaleDirectory = path.join(postsDirectory, locale);
    const fileNames = fs.readdirSync(postsLocaleDirectory);
    paths = paths.concat(
      fileNames.map((fileName) => {
        return {
          params: {
            id: fileName.replace(/\.md$/, ""),
          },
          locale: locale,
        };
      })
    );
  });

  return paths;
}

export async function getPostData(id, locale) {
  const postsLocaleDirectory = path.join(postsDirectory, locale);
  const fullPath = path.join(postsLocaleDirectory, `beispiel-beitrag.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
} 
import { getWPPostById } from "./src/lib/wordpress";
async function run() {
    const post = await getWPPostById(19);
    console.log(post?.thumbnailUrl);
}
run();

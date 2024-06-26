import { motion } from "framer-motion";
import { PiSealCheckFill } from "react-icons/pi";
import { Link } from "react-router-dom";

import { useGetArticles } from "@/entities/article";
import { ArrayElement, If, useBucket, useProfile } from "@/shared";

type ArticleCardProps = ArrayElement<
  ReturnType<typeof useGetArticles>["data"]["pages"][0]
>;

const Gallery = (props: ArticleCardProps) => {
  const { read } = useBucket("thumbnails");
  const profileData = useProfile(props.profile.id);

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        easings: "easeInOut",
        duration: 1,
      }}
      className="relative h-full overflow-hidden transition ease-in rounded-md place-items-center group"
    >
      <Link to={`/article-read/${props.id}`}>
        <img
          src={read(props.thumbnail ?? "")}
          alt={props.title ?? ""}
          className="object-cover w-full h-full"
        />

        <div className="absolute top-0 left-0 w-full h-full p-4 text-white transition ease-in bg-inherit group-hover:bg-black/70 group-hover:inline-block">
          <span className="hidden overflow-y-hidden font-bold group-hover:inline-block">
            {props.title}
          </span>
          <p className="hidden mt-3 truncate group-hover:flex">
            {props.summary}
          </p>

          <span className="hidden absolute bottom-[1rem] right-[1rem] group-hover:flex">
            {props.profile.username}
            <If
              condition={profileData?.verified === "verified"}
              trueRender={
                <PiSealCheckFill size={20} className="ml-1 text-white" />
              }
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default Gallery;

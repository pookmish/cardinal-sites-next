import {BasicPageNodeType} from "@/lib/types";
import Rows from "@/components/paragraphs/rows/rows";
import BannerParagraph from "@/components/paragraphs/stanford-banner/banner-paragraph";

import InteriorPage from "@/components/layouts/interior-page";
import Link from "@/components/elements/link";

const StanfordPageCard = ({node}: { node: BasicPageNodeType }) => {

  return (
    <div className="max-w-[500px] mx-auto shadow-xl border border-black-20 p-10">
      <Link href={node.path} className="text-black no-underline hocus:text-black hocus:underline">
        <h3 className=" text-m2">{node.title}</h3>
      </Link>
    </div>
  );
};
export default StanfordPageCard;
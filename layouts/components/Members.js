import { markdownify } from "@lib/utils/textConverter";
import ImageFallback from "./ImageFallback";
import { useMediaQuery } from "react-responsive";

const Members = ({ members }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  let member_list = members.list;

  if (isMobile) {
    // Shift elements back by one
    member_list = [...member_list.slice(1, member_list.length), member_list[0]];
  }

  return (
    <div className="section container">
      <div className="animate text-center">
        <p>{members.subtitle}</p>
        {markdownify(members.title, "h2", "section-title mt-4")}
        {markdownify(members.content, "p", "mt-16")}
      </div>
      <div className="row justify-center">
        <div className="lg:col-10">
          <div className="row">
            {member_list.map((member, index) => (
              <div
                key={("member-", index)}
                className="animate mt-10 text-center md:col-6 lg:col-6"
              >
                <ImageFallback
                  className="mx-auto rounded-full shadow-[10px_10px_0] shadow-primary/10"
                  src={member.image}
                  width={245}
                  height={245}
                  alt={member.name}
                />
                <h4 className="mt-8">{member.name}</h4>
                <h6 className="mt-3">{member.field}</h6>
                <p className="mt-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;

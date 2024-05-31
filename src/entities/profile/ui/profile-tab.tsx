import { NavLink, useParams } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import classNames from "classnames";
import { If, useIsMySession } from "@/shared";

type Props = {
  user_id: string;
};

const ProfileTab = ({ children }: { children: React.ReactNode }) => {
  const { user_id } = useParams<Props>();
  const { isMySession } = useIsMySession(user_id!);

  const ACTIVE_CLASSNAME = "text-white bg-primary";

  return (
    <div className="flex">
      <ul className="min-w-[200px] pt-7 mb-4 space-y-4 text-sm font-medium text-gray-500 flex-column space-y">
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              classNames("flex items-center w-full px-4 py-3 rounded-l-lg", {
                [ACTIVE_CLASSNAME]: isActive,
              })
            }
            end
            aria-current="page"
          >
            <FaRegUserCircle size={16} className="mr-1" />
            프로필
          </NavLink>
        </li>
        <li>
          <NavLink
            to="articles"
            end
            className={({ isActive }) =>
              classNames("flex items-center w-full px-4 py-3 rounded-l-lg", {
                [ACTIVE_CLASSNAME]: isActive,
              })
            }
          >
            <MdOutlineArticle size={16} className="mr-1" />
            아티클
          </NavLink>
        </li>
        <If
          condition={isMySession}
          trueRender={
            <li>
              <NavLink
                to="settings"
                end
                className={({ isActive }) =>
                  classNames(
                    "flex items-center w-full px-4 py-3 rounded-l-lg",
                    {
                      [ACTIVE_CLASSNAME]: isActive,
                    }
                  )
                }
              >
                <IoMdSettings size={16} className="mr-1" />
                설정
              </NavLink>
            </li>
          }
        />
      </ul>
      <div className="min-w-[1000px] p-6 text-gray-500 rounded-lg bg-gray-50 text-medium">
        {children}
      </div>
    </div>
  );
};

export default ProfileTab;
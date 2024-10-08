import { useQueryClient } from "@tanstack/react-query";
import { PiSealCheckFill } from "react-icons/pi";

import { Button, If, useProfile, useSession, useToast } from "@/shared";

import { usePostVerifyUser } from "../lib";
import { profileKeyFactor } from "@/entities/profile";
import { Link } from "react-router-dom";

const VerifyEmailForm = () => {
  const { data: session } = useSession();

  const userId = session?.user.id;
  const profileData = useProfile(userId);
  const queryClient = useQueryClient();
  const { mutateAsync } = usePostVerifyUser(userId!);
  const { open } = useToast();

  const handleVerify = async () => {
    await mutateAsync();
    open({
      content: "인증 요청이 완료되었습니다.",
      type: "success",
      staleTime: 3000,
    });
    queryClient.invalidateQueries({
      queryKey: profileKeyFactor.detail(userId!).queryKey,
    });
  };

  if (!session || !profileData)
    return (
      <div className="flex flex-col items-center p-4 mx-auto text-black rounded-md shadow-md">
        <h3 className="text-lg font-semibold">환영합니다 HLOG입니다.</h3>
        <p className="text-base">HLOG의 다양한 기능을 사용해보세요.</p>
        <p className="text-base">최신 정보와 흥미로운 콘텐츠를 제공합니다.</p>
        <Link
          to="/auth/sign-up"
          className="mt-4 leading-5 underline text-primary"
        >
          회원가입
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col items-center p-4 mx-auto text-black rounded-md shadow-md">
      <PiSealCheckFill size={80} className="text-primary" />

      <If
        condition={profileData.verified === "none"}
        trueRender={
          <>
            <h3>환영합니다 {profileData.username}님,</h3>
            <p className="text-base">
              유저 인증을 요청하여 아래 기능들을 사용해보세요.
            </p>
            <ul className="mt-3 text-sm list-disc">
              <li>아티클 이미지 업로드 가능</li>
              <li>유저 프로필에 Vertified 마크 제공</li>
            </ul>

            <Button onClick={handleVerify} className="w-full mt-3">
              인증 요청
            </Button>
          </>
        }
      />

      <If
        condition={profileData.verified === "pending"}
        trueRender={
          <>
            <h3 className="text-base font-semibold">
              인증 요청이 완료되었습니다.
            </h3>
            <p>빠른 시일 내로 반영하겠습니다.</p>
          </>
        }
      />

      <If
        condition={profileData.verified === "verified"}
        trueRender={
          <>
            <h3 className="text-base font-semibold">
              환영합니다 {profileData?.username}님,
            </h3>
            <p>귀하는 인증된 유저입니다.</p>
          </>
        }
      />
    </div>
  );
};

export default VerifyEmailForm;

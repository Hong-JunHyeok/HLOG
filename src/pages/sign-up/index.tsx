import * as shared from "@/shared";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import * as features from "@/features";
import { useToast } from "@/app/store";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

function SignUpPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleEmailSignUp = handleSubmit((data) => {
    const { email, password, confirmPassword, username } = data;

    if (password !== confirmPassword) {
      addToast({
        type: "error",
        content: "비밀번호가 일치하지 않습니다.",
        hasCloseButton: true,
      });
      return;
    }

    features.auth.signUp
      .withEmail({
        email,
        password,
        username,
      })
      .then(({ error }) => {
        if (error?.name === "AuthApiError" && error.status === 429) {
          addToast({
            type: "error",
            content: "이메일 요금 제한을 초과했습니다",
            hasCloseButton: true,
          });
        }

        if (!error) {
          addToast({
            type: "success",
            content: "회원가입에 성공했습니다",
            hasCloseButton: true,
            staleTime: 3000,
          });
          addToast({
            type: "warning",
            content: "로그인하기 위해서 이메일 인증을 해주세요!",
            hasCloseButton: true,
          });
          navigate("/auth/sign-in");
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({
          type: "error",
          content: "에러가 발생했습니다.",
          hasCloseButton: true,
        });
      });
  });

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-gray-900 font-['Jersey15Charted'] text-6xl"
          >
            HLOG
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                양질의 글을 매일 확인해보세요!
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleEmailSignUp}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    이메일 (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="example@mail.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    {...register("password")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    비밀번호 재확인
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    {...register("confirmPassword")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    닉네임
                  </label>
                  <input
                    type="username"
                    id="username"
                    placeholder="닉네임을 입력해주세요"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    {...register("username")}
                  />
                </div>

                <shared.Button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  회원가입
                </shared.Button>
                <p className="text-sm font-light text-gray-500">
                  이미 계정이 있으신가요?
                  <Link
                    to="/auth/sign-in"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    로그인
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpPage;

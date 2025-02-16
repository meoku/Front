import styled from "@emotion/styled";
import icLogoText from "/icLogoText.svg";
import { TextB20 } from "../../components/common/Text";
import { useMutation } from "@tanstack/react-query";
import { loginCheckApi } from "../../api/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
`;
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 774px;
`;
const LogoImg = styled.img`
  width: 219px;
  height: 76px;
  margin: 101px auto 0 auto;
  /* margin: auto 101px auto auto; */
`;
const InputUserInfo = styled.input`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  width: 394px;
  height: 50px;
  padding-left: 24px;

  &::placeholder {
    color: var(--color_03, #ccc);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const InputUserInfoId = styled(InputUserInfo)`
  margin: 55px auto 0 auto;
`;

const InputUserInfoPw = styled(InputUserInfo)`
  margin: 8px auto 0 auto;
`;
// const CheckBoxContainer = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   width: 424px;
//   margin: 12px auto 0 auto;
// `;

// const StyledCheckBox = styled.input`
//   width: 20px;
//   height: 20px;
//   border: 1px solid #ccc;
//   border-radius: 3px;
//   cursor: pointer;
//   margin-right: 8px;

//   &:checked {
//     background-color: #000; // 체크된 상태일 때 색상
//     border: 1px solid #000; // 체크된 상태일 때 테두리
//   }
// `;

// const Label = styled.label`
//   font-size: 16px;
//   color: #555;
//   cursor: pointer;
// `;

const LoginBtn = styled.button`
  border-radius: 10.667px;
  background: var(--color_01);
  width: 424px;
  height: 50px;
  margin: 40px auto 0 auto;
  color: #ffffff;
`;
const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    mutate: loginMutate,
    // isLoading,
    // isError,
    // error,
    // data: loginResponse,
  } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) => {
      return loginCheckApi(id, password);
    },
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      if (data) {
        sessionStorage.setItem("accessToken", data.accessToken);
      }
      alert("로그인에 성공했습니다.");
      navigate("/admin", { replace: true });
    },
    onError: (err) => {
      console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleLoginClick = () => {
    loginMutate({ id, password });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLoginClick();
    }
  };
  return (
    <LoginMain>
      <LoginDiv>
        <LogoImg src={icLogoText} />
        <InputUserInfoId
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputUserInfoPw
          placeholder="비밀번호 입력"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* <CheckBoxContainer>
          <StyledCheckBox type="checkbox" />
          <Label>로그인 상태 유지</Label>
        </CheckBoxContainer> */}
        <LoginBtn onClick={handleLoginClick}>
          <TextB20>로그인</TextB20>
        </LoginBtn>
      </LoginDiv>
    </LoginMain>
  );
};
export default LoginPage;

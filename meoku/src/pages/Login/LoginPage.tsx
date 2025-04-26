import styled from '@emotion/styled';
import icLogoText from '/icLogoText.svg';
import { TextB20 } from '../../components/common/Text';
import { useMutation } from '@tanstack/react-query';
import { isAdminCheckApi, loginCheckApi } from '../../api/userApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  background-color: #ffffff;
  border: 1px solid #ccc;

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

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 424px;
  margin: 12px auto 0 auto;
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckBox = styled.div<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  background: ${(props) => (props.checked ? 'var(--color_01)' : '#fff')};
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: all 150ms;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoginBtn = styled.button`
  border-radius: 10.667px;
  background: var(--color_01);
  width: 424px;
  height: 50px;
  margin: 40px auto 0 auto;
  color: #ffffff;
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  margin-top: 9px;
  padding: 0px;
`;

const SubMenuDetail = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: var(--color_05);
  cursor: pointer;
  padding: 8px 4px 8px 4px;
`;

const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 48px 0;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`;

const Text = styled.span`
  margin: 0 16px;
  font-size: 12px;
  color: var(--color_04);
  white-space: nowrap;
`;

const SnsIconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const SnsIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  object-fit: cover;
  border: 1px solid #eee;
`;

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => setIsChecked(!isChecked);

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
    onSuccess: async (data) => {
      console.log('로그인 성공:', data);
      if (data) {
        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);
      }
      alert('로그인에 성공했습니다.');
      try {
        // 관리자 확인
        const response = await isAdminCheckApi();
        if (response == 200) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (err) {
        //console.error("관리자 여부 확인 실패:", err);
        //alert("사용자 권한 확인에 실패했습니다. 다시 시도해 주세요.");
        navigate('/', { replace: true });
      }
    },
    onError: (err) => {
      console.error('로그인 실패:', err);
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleLoginClick = () => {
    loginMutate({ id, password });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
        <CheckBoxContainer>
          <Label>
            <HiddenCheckBox type="checkbox" checked={isChecked} onChange={handleCheck} />
            <StyledCheckBox checked={isChecked}>{isChecked && '✓'}</StyledCheckBox>
            로그인 상태 유지
          </Label>
        </CheckBoxContainer>
        <LoginBtn onClick={handleLoginClick}>
          <TextB20>로그인</TextB20>
        </LoginBtn>
        <SubMenu>
          <SubMenuDetail width="56px" height="12px">
            아이디 찾기
          </SubMenuDetail>
          <SubMenuDetail width="12px" height="12px">
            |
          </SubMenuDetail>
          <SubMenuDetail width="68px" height="12px">
            비밀번호 찾기
          </SubMenuDetail>
          <SubMenuDetail width="12px" height="12px">
            |
          </SubMenuDetail>
          <SubMenuDetail width="48px" height="12px">
            회원가입
          </SubMenuDetail>
        </SubMenu>
        <div>
          <DividerWithText>
            <Line />
            <Text>SNS 계정으로 로그인</Text>
            <Line />
          </DividerWithText>
          <SnsIconContainer>
            <SnsIcon src="/snsLogo/IcNaver.svg" alt="Naver Login" />
            <SnsIcon src="/snsLogo/IcKakao.svg" alt="Kakao Login" />
            <SnsIcon src="/snsLogo/IcApple.svg" alt="Apple Login" />
            <SnsIcon src="/snsLogo/IcGoogle.svg" alt="Google Login" />
          </SnsIconContainer>
        </div>
      </LoginDiv>
    </LoginMain>
  );
};
export default LoginPage;

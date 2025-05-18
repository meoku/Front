import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import icLogoText from '/icLogoText.png';
import { TextB20 } from '../../components/common/Text';
import { checkDuplicateId, signUpApi } from '../../api/userApi';

const LoginMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 394px;
  height: 774px;
  //   padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 296px;
  }
`;

const LogoImg = styled.img`
  width: 219px;
  height: 76px;
  margin: 101px auto 0 auto;
`;

const InputUserInfo = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  font-size: 15px;
  font-weight: 400;
  line-height: 50px;
  box-sizing: border-box;
  color: #333;

  &::placeholder {
    color: var(--color_03, #ccc);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  /* 숫자 입력 스피너 스타일 수정 */
  &[type='number'] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    height: 38px;
    line-height: 38px;
    font-size: 15px;

    &::placeholder {
      font-size: 15px;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 55px auto 0 auto;
  display: flex;
  gap: 8px;
  @media (max-width: 768px) {
    margin: 34.87px auto 0 auto;
  }
`;

const InputUserInfoId = styled(InputUserInfo)`
  flex: 1;
`;

const InputUserInfoPw = styled(InputUserInfo)`
  margin: 8px auto 0 auto;
`;

const GenderGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin: 8px auto 0 auto;
  box-sizing: border-box;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  flex: 1;
  height: 50px;
  padding: 0;
  margin: 0;
  border: 1px solid ${(props) => (props.isSelected ? 'var(--color_01)' : '#ccc')};
  border-radius: 10px;
  background: ${(props) => (props.isSelected ? '#FFF5EB' : 'white')};
  font-size: 15px;
  font-weight: 400;
  color: var(--color_03, #ccc);
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  line-height: 50px;

  &:hover {
    border-color: var(--color_01);
  }

  @media (max-width: 768px) {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
  }
`;

const InputUserInfoAge = styled(InputUserInfo)`
  margin: 8px auto 0 auto;
`;

const SubmitButton = styled.button`
  border-radius: 10.667px;
  background: var(--color_01);
  width: 100%;
  height: 50px;
  margin: 40px auto 0 auto;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 38px;
    margin: 24px auto 0 auto;
  }
`;

const DuplicateCheckButton = styled.button`
  width: 80px;
  height: 50px;
  border-radius: 10px;
  background: var(--color_01);
  color: white;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 70px;
    height: 38px;
    font-size: 12px;
  }
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    sex: '',
    age: '',
  });
  const [idValidation, setIdValidation] = useState<{
    available?: boolean;
    message?: string;
  }>({});

  const { mutate: duplicateCheckMutate } = useMutation({
    mutationFn: (id: string) => {
      return checkDuplicateId(id);
    },
    onSuccess: (data) => {
      if (data.available) {
        alert('사용 가능한 ID입니다.');
      } else {
        alert(data.message);
      }
      setIdValidation({
        available: data.available,
        message: data.message,
      });
    },
    onError: (error) => {
      console.error('중복확인 중 오류 발생:', error);
      alert('중복확인 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const { mutate: signUpMutate } = useMutation({
    mutationFn: (data: { id: string; password: string; sex: string; age: string }) => {
      return signUpApi(data.id, data.password, data.sex, data.age);
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error: any) => {
      if (error.response?.data) {
        const errorMessage = Object.values(error.response.data)[0];
        alert(errorMessage);
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'id') {
      setIdValidation({});
    }
  };

  const handleSexSelect = (sex: string) => {
    setFormData((prev) => ({
      ...prev,
      sex,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 일치 확인
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // ID 중복확인 여부 확인
    if (!idValidation.available) {
      alert('아이디 중복확인을 해주세요.');
      return;
    }

    signUpMutate({
      id: formData.id,
      password: formData.password,
      sex: formData.sex,
      age: formData.age,
    });
  };

  const handleDuplicateCheck = () => {
    if (!formData.id.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }
    duplicateCheckMutate(formData.id);
  };

  return (
    <LoginMain>
      <SignUpDiv>
        <LogoImg src={icLogoText} onClick={() => navigate('/')} />
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputUserInfoId
              type="text"
              name="id"
              placeholder="아이디 입력"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
            <DuplicateCheckButton type="button" onClick={handleDuplicateCheck}>
              중복확인
            </DuplicateCheckButton>
          </InputContainer>
          <InputUserInfoPw
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <InputUserInfoPw
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            required
          />
          <GenderGroup>
            <GenderButton
              type="button"
              isSelected={formData.sex === 'M'}
              onClick={() => handleSexSelect('M')}
            >
              남성
            </GenderButton>
            <GenderButton
              type="button"
              isSelected={formData.sex === 'F'}
              onClick={() => handleSexSelect('F')}
            >
              여성
            </GenderButton>
          </GenderGroup>
          <InputUserInfoAge
            type="number"
            name="age"
            placeholder="나이 입력"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="80"
            required
          />
          <SubmitButton type="submit">
            <TextB20>회원가입</TextB20>
          </SubmitButton>
        </form>
      </SignUpDiv>
    </LoginMain>
  );
};

export default SignUpPage;

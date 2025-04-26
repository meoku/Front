// ToggleSwitch.tsx
import styled from '@emotion/styled';

interface ToggleSwitchProps {
  checked: boolean;
  onToggle: (state: boolean) => void;
}

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-top: 2.5px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: var(--color_01); /* ON일 때 배경색 */
  }
  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; /* OFF일 때 배경색 */
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

function ToggleSwitch({ checked, onToggle }: ToggleSwitchProps) {
  const handleToggle = () => {
    onToggle(!checked);
  };

  return (
    <SwitchContainer>
      <SwitchInput type="checkbox" checked={checked} onChange={handleToggle} />
      <Slider />
    </SwitchContainer>
  );
}

export default ToggleSwitch;

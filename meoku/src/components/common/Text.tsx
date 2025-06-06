import { css } from '@emotion/react';

export const TextB32 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 32px;
        font-weight: bold;
      `}
      className={className}
    >
      {children}
    </p>
  );
};
export const TextR32 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 32px;
      `}
      className={className}
    >
      {children}
    </p>
  );
};
export const TextB24 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 24px;
        font-weight: bold;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

export const TextR24 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 24px;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

export const TextB20 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 20px;
        font-weight: bold;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

export const TextR20 = ({
  children,
  className,
  onClick, // 외부 클릭 리스너 전달받을 수 있게됨
}: {
  children: string | JSX.Element;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}) => {
  return (
    <span
      css={css`
        font-size: 20px;
      `}
      className={className}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
export const TextB16 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 16px;
        font-weight: bold;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

export const TextR16 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 16px;
      `}
      className={className}
    >
      {children}
    </p>
  );
};
export const TextB14 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 14px;
        font-weight: bold;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

export const TextR14 = ({
  children,
  className,
}: {
  children: string | JSX.Element;
  className?: string;
}) => {
  return (
    <p
      css={css`
        font-size: 14px;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

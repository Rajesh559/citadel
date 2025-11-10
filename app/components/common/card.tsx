import { Icon } from 'dms-common-ux/components/icon';
import { PropsWithChildren } from 'react';

interface CardProps {
  title: string;
  className?: string;
  contentClassName?: string;
  info?: {
    content: React.ReactElement;
    onClick: (isOpen: boolean) => void;
  };
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({ className, title, children, contentClassName, info }) => (
  <article
    className={`bg-foreground-inverted rounded-lg p-4 shadow-[0px_0.5px_2px_0px_rgba(0,0,0,0.16)] ${className ?? 'w-full'}`}
  >
    <div className="flex items-center justify-between pb-4">
      <h2 className="self-stretch text-base font-bold">{title}</h2>
      {info && (
        <Icon
          name="abb/information-circle-2"
          size="medium"
          onClick={() => info.onClick(true)}
          className="hover:cursor-pointer"
        />
      )}
    </div>
    <div className={`flex items-center ${contentClassName ?? 'justify-center'}`}>{children}</div>
    {info?.content}
  </article>
);

export default Card;

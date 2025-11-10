import { mergeClasses } from '@/app/utils/class-names';

interface MajorReleaseVersionProps {
  release_version: string;
  className: string;
}

const MajorReleaseVersion: React.FC<MajorReleaseVersionProps> = ({ release_version, className }) => {
  return (
    <div className={mergeClasses(className, 'items-center lg:flex lg:gap-2')}>
      <h4 className="text-base font-normal">Major Release version</h4>
      <div className="bg-uiblue-background-primary-default px-[5px] py-0.5">
        <div className="text-foreground-white text-base font-bold">{release_version}</div>
      </div>
    </div>
  );
};

export default MajorReleaseVersion;

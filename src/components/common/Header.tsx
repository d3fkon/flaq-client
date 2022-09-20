import React, {FC} from 'react';
import FlaqText from './flaqui/FlaqText';

type Props = {
  heading: string;
  subHeading: string;
};

const Header: FC<Props> = ({heading, subHeading}) => {
  return (
    <>
      <FlaqText weight="semibold" color="white" size="xl" align="left">
        {heading}
      </FlaqText>
      <FlaqText type="secondary" weight="bold" align="left" color="normal">
        {subHeading}
      </FlaqText>
    </>
  );
};

export default Header;

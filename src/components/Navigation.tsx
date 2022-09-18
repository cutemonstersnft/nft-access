import React from 'react';
import styled from '@emotion/styled';
import Colors from '../styles/Colors';
import BedrockMark from '../assets/bedrock-logo.png';
import BedrockMarkWide from '../assets/bedrock-logo-wide.png';
import TwitterWhite from '../assets/twitter-white.png';
import GitHub from '../assets/github.png';
import { Link } from 'react-router-dom';

const Breakpoint = '1080px';

const Container = styled.div`
  position: relative;
  width: fill-available;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  @media screen and (max-width: ${Breakpoint}) {
    padding: 24px;
  }
`;

const HoverLink = styled(Link)`
  &:hover {
    cursor: pointer;
  }
`;

const GitHubLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

type ImageContainerProps = {
  width: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  width: ${(props) => props.width};
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BedrockLogo = styled(ImageContainer)`
  border: 1px solid ${Colors.Purple};
  border-radius: 8px;
`;

const BedrockLogoWide = styled(ImageContainer)`
  width: 250px;
  margin-left: 16px;
`;

const ImageContainerGitHub = styled(ImageContainer)`
  top: -2px;
  margin-right: 24px;

  @media screen and (max-width: ${Breakpoint}) {
   top: 0px;
  }
`;

const Row = styled.div<{ align?: string }>`
  display: flex;
  flex-direction: row;
  justify-items: ${(props) => props.align};
`;


const Image = styled.img`
  width: 100%;
`;

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  /** Render */
  return (
    <Container>
      <HoverLink to="/">
        <Row>
          <BedrockLogo width="60px">
            <Image src={BedrockMark} />
          </BedrockLogo>
          <BedrockLogoWide width="250px">
            <Image src={BedrockMarkWide} />
          </BedrockLogoWide>
        </Row>
      </HoverLink>
      <Row align="flex-end">
        <ImageContainerGitHub width="30px">
          <GitHubLink href="https://github.com/cutemonstersnft">
            <Image src={GitHub} />
          </GitHubLink>
        </ImageContainerGitHub>

        <ImageContainer width="30px">
          <a href="https://twitter.com/longeye_monstre">
            <Image src={TwitterWhite} />
          </a>
        </ImageContainer>
      </Row>
    </Container>
  );
};

export default Navigation;

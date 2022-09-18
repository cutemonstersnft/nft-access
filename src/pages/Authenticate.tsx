import React from "react";
import styled from "@emotion/styled";
import Colors from "../styles/Colors";
import { useRecoilState } from "recoil";
import {
  useBedrock,
  useCreateNonceLink,
  useNonceSocket,
  AuthorizationData,
  TransactionStatuses,
} from "@bedrock-foundation/react-sdk";
import QRCode from "react-qr-code";
import CollectionData from "../assets/CollectionData";
import Loader, { LoaderSizes } from "../elements/Loader";
import Card from '../elements/Card';
import Flex from '../elements/Flex';
import Text, { TextTypesEnum } from "../elements/Text";
import AppState from "../recoil/app.recoil";
import PageLayout from "../components/PageLayout";

const Container = styled.div`
  display: flex;
  height: 500px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const RightContainer = styled.div`
  box-sizing: border-box;
  border: 4px solid ${Colors.Purple};
  height: 300px;
  width: 300px;
  border: 4px solid ${Colors.Purple};
  background-color: ${Colors.AlmostDarkBlue};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const QRCodeContainer = styled.div`
  box-sizing: border-box;
  height: 300px;
  width: 300px;
  background-color: ${Colors.White};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 300px;
  width: 300px;
  background-color: ${Colors.White};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CollectionImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${Colors.White};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

type AuthenticateProps = {};

const Authenticate: React.FC<AuthenticateProps> = ({}) => {
  const [authData, setAuthData] = React.useState<AuthorizationData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const [collectionId] = useRecoilState(AppState.collectionId);

  const collection = CollectionData.find((collection) => {
    return collection.collectionId === collectionId;
  });

  const bedrock = useBedrock();

  const {
    core: {
      createAuthorizationNonceLink
    },
  } = bedrock;

  const { result, loading } = useCreateNonceLink(createAuthorizationNonceLink, {
    params: {
      gate: {
        collectionId: collection?.collectionId ?? "",
      },
    },
  });
  console.log("result", result, "loading", loading)

  useNonceSocket<AuthorizationData>({
    bedrock,
    nonce: result?.nonce ?? "",
    onChange: (data: AuthorizationData) => {
      setAuthData(data);
    },
    onError: setError,
  });

  return (
    <PageLayout>
      <Flex align="center">
        <CollectionImage src={collection?.image} />
        <Text type={TextTypesEnum.Bold24} color={Colors.White}>
          Verify {collection?.name}
        </Text>
      </Flex>
      <Container>
        {(() => {
          if (authData?.status !== TransactionStatuses.Confirmed) {
            return (
              <Flex
                align="center"
                width="900px"
                justify="space-between"
                direction="column"
              >
                <Flex>
                  <Flex direction="column" height="100%" align="center">
                    {(() => {
                      if (authData?.gate?.image) {
                        return (
                          <Card
                            name={authData?.gate?.name ?? ""}
                            image={authData?.gate?.image ?? ""}
                          />
                        );
                      }

                      if (loading || !result?.link) {
                        return (
                          <RightContainer>
                            <Loader
                              size={LoaderSizes.Medium}
                              color={Colors.White}
                            />
                          </RightContainer>
                        );
                      }

                      return (
                        <RightContainer>
                          <QRCodeContainer>
                            <QRCode value={result?.link ?? ""} size={256} />;
                          </QRCodeContainer>
                        </RightContainer>
                      );
                    })()}
                  </Flex>
                </Flex>
                {/* <Card name={collection?.name ?? ''} image={collection?.image ?? ''} margin="0" /> */}
                <Flex
                  direction="row"
                  justify="center"
                  align="center"
                  margin="16px 0 0"
                >
                  <Text
                    type={TextTypesEnum.Regular24}
                    color={Colors.White}
                    margin="0 12px 0 0"
                  >
                    {authData?.status === TransactionStatuses.Scanned
                      ? "Sign transaction to verify ownership"
                      : "Scan to get started"}
                  </Text>
                  <Loader
                    size={LoaderSizes.VerySmall}
                    color={
                      authData?.status === TransactionStatuses.Scanned
                        ? Colors.Green500
                        : Colors.White
                    }
                  />
                </Flex>
              </Flex>
            );
          }

          return (
            <Flex align="center" direction="column">
              <Image src={authData?.gate?.image} />
              <Text
                type={TextTypesEnum.Bold24}
                color={Colors.White}
                margin="16px 0 0 0"
              >
                {authData?.gate?.name} verified
              </Text>
            </Flex>
          );
        })()}
      </Container>
    </PageLayout>
  );
};

export default Authenticate;

import React from 'react';
import { Text } from 'react-native';

import styled from 'styled-components/native';

import COLORS from '../utils/colors';
import STRINGS from '../utils/string';


const DeleteModal = (props) => {

    const {
        isShowModel,
        alertTitle,
        alertMsg,
        onPressCancel,
        onPressSuccess,
        onTouchOutside,
    } = props;

    return (
        <MainComponent>
            <Modal
                animationType="fade"
                transparent
                visible={isShowModel}
                onRequestClose={() => {
                    onTouchOutside();
                }}
            >
                <ModalComponent>
                    <CloseModalView onPress={() => onTouchOutside()} />
                    <ModalView>
                        <AlertView>
                            <Text >
                                {alertTitle}
                            </Text>
                        </AlertView>
                        <MessageView>
                            <MsgText>
                                {alertMsg}
                            </MsgText>
                        </MessageView>
                        <ButtonView>
                            <CancelButton onPress={onPressCancel} >
                                <TextNo >
                                    {STRINGS?.noBUtton}
                                </TextNo>
                            </CancelButton>
                            <YesButton onPress={onPressSuccess} >
                                <TextYes>
                                        {STRINGS?.yesButton}
                                </TextYes>
                            </YesButton>
                        </ButtonView>
                    </ModalView>
                </ModalComponent>
            </Modal>
        </MainComponent>
    );
};

const MainComponent = styled.View`
    flex: 1;
`;
const Modal = styled.Modal`
    position: relative;
    width: 250px;
    height: 100px;
    justify-content: center;
    align-self: center;
`;
const MsgText  = styled.Text`   
    font-size:15px;
    color:${COLORS.ThemeColor};
`
const ModalCloseView = styled.View`
    flex: 1;
    background-color: ${COLORS.TranperentColor};
`;
const ModalComponent = styled.View`
    flex: 1;
    background-color: ${COLORS.TranperentColor};
    justify-content: center;
    align-items: center;
`;
const CloseModalView = styled.TouchableOpacity``;

const ModalView = styled.View`
    width: 90%;
    padding: 10px;
    background-color: ${COLORS?.White};
    border-radius: 20px;
    border: 1px solid gray;
    align-items: center;
    justify-content: center;
`;
const AlertView = styled.View`
    align-items: center;
`;

const MessageView = styled.View`
    align-items: center;
    justify-content: center;
`;

const ButtonView = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
`;
const CancelButton = styled.TouchableOpacity`
    height: 36px;
    width: 90px;
    margin-right: 70px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS?.Gray};
`;
 const YesButton = styled.TouchableOpacity`
    height: 36px;
    width: 90px;
    background-color: ${COLORS.DarkTheme};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

const TextYes = styled.Text`
    color:${COLORS.White};
    font-size:15px;
    font-weight:500;
`

const TextNo = styled.Text`
    color:${COLORS.DarkTheme};
    font-size:15px;
    font-weight:500
`
export default DeleteModal;

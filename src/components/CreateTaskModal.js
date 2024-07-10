import React, { Component, useState } from "react";
import { View, Image, Modal, TouchableOpacity, StyleSheet, Text,  } from "react-native";
import styled from "styled-components/native";
import COLORS from "../utils/colors";
import TaskInput from "./TaskInput";

const CreateTaskModal = props => {
  
    const {
      showModal,
      inVisible,
      isEditing,
      currentTask,
      handleAddTask,
      handleEditTask,
    } = props;

    return (
        <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
          <ModalContainer>
            <CloseModalView onPress={() => inVisible()}/>
            <ModalView>
               <TaskInput onSubmit={isEditing ? handleEditTask() : handleAddTask()} task={currentTask} isEditing={isEditing} />
             </ModalView>
          </ModalContainer>
        </Modal>
      </Container>
    );
};



const Container = styled.View`
    flex:1;
`

const ModalContainer = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.7);
    justify-content: flex-end;
    align-items: center;
`

const ModalView = styled.View`
      width:100%;
      background-color: ${COLORS.Gray};
      padding: 10px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      `

const CloseModalView = styled.TouchableOpacity`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
`
export default CreateTaskModal;

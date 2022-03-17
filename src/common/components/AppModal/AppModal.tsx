import React, {FC, ReactNode} from 'react';
import {
  Button,
  Modal,
  ModalProps,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

interface AppModalType extends ModalProps {
  children?: ReactNode;
}

const AppModal: FC<AppModalType> = ({children, onRequestClose, ...props}) => {
  return (
    <Modal
      testID="modal"
      animationType="slide"
      onRequestClose={onRequestClose}
      {...props}>
      <SafeAreaView style={styles.container}>
        <>
          <Button testID="close_modal" title="Close" onPress={onRequestClose} />
          {children}
        </>
      </SafeAreaView>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

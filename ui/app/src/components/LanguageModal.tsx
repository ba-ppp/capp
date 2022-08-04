import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [language, setLanguage] = useState('vi');
  const languageIcon =
    language === 'vi'
      ? require('../../assets/vietnam-icon.png')
      : require('../../assets/uk-icon.png');
  const styles = StyleSheet.create({
    icon: {
      height: 30,
      width: 30,
    },
    modal: {
      backgroundColor: 'none',
      margin: 0,
    },
    modalContent: {
      height: 100,
      flexDirection: 'row',
      backgroundColor: color.white,
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 'auto',
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 1000,
    },
    tabButton: {
      // backgroundColor: color.violetBlue,
      justifyContent: 'center',
    },
  });

  async function handleChooseLanguage(value: string) {
    setModalVisible(false);
    try {
      await AsyncStorage.setItem('language', value);
    } catch (e) {
      // saving error
    }
  }

  const getLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        setLanguage(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  getLanguage();

  return (
    <>
      <View style={styles.tabButton}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image source={languageIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => handleChooseLanguage('vi')}>
            <Image
              source={require('../../assets/vietnam.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChooseLanguage('en');
            }}>
            <Image
              source={require('../../assets/uk.jpg')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default LanguageModal;

import { Button, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ImageList from '../../components/ImageList';
import RoundButton from '../../components/RoundButton';
import { HEIGHT } from '../../constants/constants';


const SearchScreen = ({ route, navigation }) => {
  // state & variable
  let images = useSelector((state: RootState) => state.images);
  const searchText: string = route.params.searchText;
  const language = useSelector((state: RootState) => state.language);
  images = images.filter(item => {
    const caption = language === 'vi' ? item.vcaption : item.caption;
    return caption?.toUpperCase().includes(searchText.toUpperCase());
  });
  const goBackIcon = require('../../../assets/back.png');
  return (
    <View style={{ height: '100%' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' ,marginTop: HEIGHT / 20,}}>{`There are ${
        images.length
      } ${
        images.length === 1 ? 'result' : 'results'
      } for: ${searchText}`}</Text>
      <ImageList images={images} />
      <RoundButton
        icon={goBackIcon}
        callback={() => navigation.pop()}
        position={{ bottom: 5, left: 5 }}
        iconSize={HEIGHT / 15}
      />
    </View>
  );
};

export default SearchScreen;

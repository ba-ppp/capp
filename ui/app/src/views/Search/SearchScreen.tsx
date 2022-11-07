import { Button, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ImageList from '../../components/ImageList';
import RoundButton from '../../components/RoundButton';

const SearchScreen = ({ route, navigation }) => {
  // state & variable
  let images = useSelector((state: RootState) => state.images);
  const searchText: string = route.params.searchText;
  images = images.filter(item =>
    item.caption?.toUpperCase().includes(searchText.toUpperCase()),
  );
  const goBackIcon = require('../../../assets/back.png');
  return (
    <View style={{ height: '100%' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>{`There are ${
        images.length
      } ${
        images.length === 1 ? 'result' : 'results'
      } for: ${searchText}`}</Text>
      <ImageList images={images} />
      <RoundButton
        icon={goBackIcon}
        callback={() => navigation.pop()}
        position={{ bottom: 5, left: 5 }}
        iconSize={40}
      />
    </View>
  );
};

export default SearchScreen;

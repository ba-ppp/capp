import { Button, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ImageList from '../../components/ImageList';

const SearchScreen = ({ route, navigation }) => {
  // state & variable
  let images = useSelector((state: RootState) => state.images);
  const searchText: string = route.params.searchText;
  images = images.filter(item =>
    item.caption?.toUpperCase().includes(searchText.toUpperCase()),
  );
  return (
    <View>
      <Text>{`There are ${images.length} ${
        images.length === 1 ? 'result' : 'results'
      } for: ${searchText}`}</Text>
      <ImageList images={images} />
      <Button title="Go back" onPress={() => navigation.pop()} />
    </View>
  );
};

export default SearchScreen;

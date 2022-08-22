import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

var { width } = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      'https://cdn.pixabay.com/photo/2020/04/02/05/19/beauty-4993472__340.jpg',
      'https://cdn.pixabay.com/photo/2014/10/31/10/00/camera-510524_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/04/26/11/30/mobile-phone-5094810_960_720.jpg',
      'https://media.istockphoto.com/photos/red-tshirt-clipping-path-picture-id465485445?k=20&m=465485445&s=612x612&w=0&h=DyxRzfbIlXX_jkdiokeAJ4takk3q5VjX1VOkiUgrxy0=',
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode='contain'
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;

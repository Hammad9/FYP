import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';
const CategoryFilter = (props) => {
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  return (
    <ScrollView
      horizontal={true}
      bounces={true}
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <View style={styles.catagoriesStyle}>
        {props.categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={() => {
              props.setActive(item);
              props.clickFunc(index);
            }}
          >
            <View
              style={[
                styles.center,
                {
                  margin: 5,
                  borderRadius: 20,
                  paddingVertical: 5,
                  // backgroundColor: '#9FD3BF',
                },
                props.active == -1 ? styles.active : styles.inactive,
              ]}
            >
              <Text key={item._id.$oid} style={styles.text}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#a0e1eb',
  },
  inactive: {
    backgroundColor: '#008000',
  },
  catagoriesText: {
    fontSize: 15,

    color: 'grey',
    fontWeight: 'bold',
  },
  catagoryTextSelected: {
    borderBottomColor: 'green',
    color: 'green',
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  catagoriesStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  text: {
    paddingHorizontal: 15,
    // backgroundColor: '#9FD3BF',
    borderRadius: 28,
  },
});

export default CategoryFilter;

import { View, Text, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { Select, Radio } from 'native-base';
import { Entypo } from '@expo/vector-icons';

const methods = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
];

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();

  const [card, setCard] = useState();
  const [value, setValue] = React.useState('first');

  const state = false;
  return (
    <View style={{ marginHorizontal: 10 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffff',
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Chose your payment method
        </Text>
      </View>
      <View>
        {methods.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              key={item.name}
              onPress={() => setSelected(item.value)}
            >
              <View>
                <Text>{item.name}</Text>
              </View>
              <View style={{ position: 'relative' }}>
                <RadioButton.Group
                  onValueChange={(newValue) => setSelected(newValue)}
                  value={selected}
                  onPress={() => setSelected(item.value)}
                >
                  <RadioButton selected={selected === item.value} />
                </RadioButton.Group>
                {selected === item.value ? (
                  <View style={{ position: 'absolute', right: 4, top: -5 }}>
                    <Entypo name='dot-single' size={44} color='black' />
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          {selected == 3 ? (
            <Select
              mode='dropdown'
              // iosIcon={<Icon name={"arrow-down"} />}
              headerStyle={{ backgroundColor: 'orange' }}
              headerBackButtonTextStyle={{ color: '#fff' }}
              headerTitleStyle={{ color: '#fff' }}
              placeholder='Select Categories'
              // selectedValue={pickerValue}
              width={160}
              selectedValue={card}
              onValueChange={(x) => setCard(x)}
            >
              {paymentCards.map((c, index) => {
                return (
                  <Select.Item key={c.name} label={c.name} value={c.name} />
                );
              })}
            </Select>
          ) : null}
        </View>
      </View>
      <View style={{ marginTop: 60, alignSelf: 'center' }}>
        <Button
          title={'Confirm'}
          onPress={() => props.navigation.navigate('Confirm', { order })}
        />
      </View>
    </View>
  );
};

export default Payment;

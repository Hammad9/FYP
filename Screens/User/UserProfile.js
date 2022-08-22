// import { View, Text } from 'react-native'
// import React from 'react'

// export default function UserProfile() {
//   return (
//     <View>
//       <Text>UserProfile</Text>
//     </View>
//   )
// }
import React, { useContext, useState, useCallback, useEffect } from 'react';

import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    if (
      context.stateUser.isAuthenticated == false ||
      context.stateUser.isAuthenticated == null
    ) {
      props.navigation.navigate('Login');
    }
    AsyncStorage.getItem('jwt')
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);
  return (
    <ScrollView>
      <Text style={{ fontSize: 30 }}>
        {userProfile ? userProfile.name : ''}
      </Text>
      <View style={{ marginTop: 20 }}>
        <Text style={{ margin: 10 }}>
          Email: {userProfile ? userProfile.email : ''}
        </Text>
        <Text style={{ margin: 10 }}>
          Phone: {userProfile ? userProfile.phone : ''}
        </Text>
      </View>
      <View style={{ marginTop: 80 }}>
        <Button
          title={'Sign Out'}
          onPress={() => [
            AsyncStorage.removeItem('jwt'),
            logoutUser(context.dispatch),
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default UserProfile;

// import React, { useContext, useState, useCallback } from 'react';
// import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
// import { Container } from 'native-base';
// import { useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import OrderCard from '../../Shared/OrderCard';

// import axios from 'axios';
// import baseURL from '../../assets/common/baseUrl';

// import AuthGlobal from '../../Context/store/AuthGlobal';
// import { logoutUser } from '../../Context/actions/Auth.actions';
// import { useEffect } from 'react/cjs/react.development';

// const UserProfile = (props) => {
//   const context = useContext(AuthGlobal);
//   const [userProfile, setUserProfile] = useState();
//   const [orders, setOrders] = useState();

//   useFocusEffect(
//     useCallback(() => {
//       if (
//         context.stateUser.isAuthenticated === false ||
//         context.stateUser.isAuthenticated === null
//       ) {
//         props.navigation.navigate('Login');
//       }
//       console.log(
//         'I am error11111111111111111111111111111111',
//         context.stateUser.user.sub
//       );
//       AsyncStorage.getItem('jwt')
//         .then((res) => {
//           axios.get(`${baseURL}users/${context.stateUser.user.userId}`, {
//             headers: { Authorization: `Bearer ${res}` },
//           });
//           console
//             .log('asynce stroage  in nnnnnnn' + res)
//             .then((user) => setUserProfile(user.data));
//         })
//         .catch((error) => console.log(error));
//       console.log('I am error22222222222222222222222222222222');
//       axios
//         .get(`${baseURL}orders`)
//         .then((x) => {
//           const data = x.data;
//           console.log('+++++++++++++++i am data' + data);
//           const userOrders = data.filter(
//             (order) => order.user._id === context.stateUser.user.sub
//           );
//           setOrders(userOrders);
//           console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"+x)
//         })
//         .catch((error) => console.log(error));

//       return () => {
//         setUserProfile();
//         setOrders();
//       };
//     }, [context.stateUser.isAuthenticated])
//   );

//   return (
//     <Container style={styles.container}>
//       <ScrollView contentContainerStyle={styles.subContainer}>
//         <Text style={{ fontSize: 30 }}>
//           {userProfile ? userProfile.name : ''}
//         </Text>
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ margin: 10 }}>
//             Email: {userProfile ? userProfile.email : ''}
//           </Text>
//           <Text style={{ margin: 10 }}>
//             Phone: {userProfile ? userProfile.phone : ''}
//           </Text>
//         </View>
//         <View style={{ marginTop: 80 }}>
//           <Button
//             title={'Sign Out'}
//             onPress={() => [
//               AsyncStorage.removeItem('jwt'),
//               logoutUser(context.dispatch),
//             ]}
//           />
//         </View>
//         <View style={styles.order}>
//           <Text style={{ fontSize: 20 }}>My Orders</Text>
//           <View>
//             {orders ? (
//               orders.map((x) => {
//                 return <OrderCard key={x.id} {...x} />;
//               })
//             ) : (
//               <View style={styles.order}>
//                 <Text>You have no orders</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   subContainer: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   order: {
//     marginTop: 20,
//     alignItems: 'center',
//     marginBottom: 60,
//   },
// });

// export default UserProfile;

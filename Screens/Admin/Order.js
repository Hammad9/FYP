import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';

import OrderCard from '../../Shared/OrderCard';

const Orders = (props) => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    const config = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVkNjI0NWZjYTYwNDhmMzU5NjUyMDYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjEwMjA1NzYsImV4cCI6MTY2MTYyNTM3Nn0.Hb-N3mqDE3i_FPU0b-uroeRDOB_i3X27xOl48aWdxAU',
      },
    };
    axios
      .get(`${baseURL}orders`, config)
      .then((x) => {
        setOrderList(x.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Text>Shipped Order List</Text>
    </View>
  );
};

export default Orders;
// import React, { useState, useCallback} from "react"
// import { View, FlatList, Text} from "react-native"
// import axios from "axios"
// import baseURL from "../../assets/common/baseUrl"
// import { useFocusEffect } from "@react-navigation/native"
// const Orders=()=>{
//     const [orderList,setOrderList]=useState()
//         useFocusEffect(
//         useCallback(
//             () => {
//                 getOrders();
//             return () => {
//                 setOrderList();
//             }
//             },
//             [],
//         )
//     )

//     const getOrders = () => {
//         axios
//         .get(`${baseURL}orders`)
//         .then((x) => {
//             setOrderList(x.data);
//             console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"+x.data)
//         })
//         .catch((error) => console.log(error))
//     }

//     return(
//         <FlatList
//         data={orderList}
//         renderItem={({item})=>(

//             <Text>{item.shippingAddress1}</Text>
//         )}
//         />
//         )
//     }

//     export default Orders;

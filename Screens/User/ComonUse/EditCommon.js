
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


import * as ImagePicker from 'expo-image-picker';
// import CameraOpen from './CameraOpen';

import { useNavigation } from '@react-navigation/native';


// Yup Data
const reviewSchema = yup.object({
  fname: yup.string().required().min(4),
  lname: yup.string().required().min(4),
  number: yup.string().required().min(4),
  email: yup.string().required().min(4),
  country: yup.string().required().min(4),
  city: yup.string().required().min(4),
})


const EditCommon = () => {

  const [image, setImage] = useState(null);
  const { colors } = useTheme();

  // const userCollectionRef = collection(db, "profile");
  const navigation=useNavigation();

  // Pick from mobile
  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const storage = getStorage();  //storage itself
      const imageref = ref(storage, "image.jpg")       //how image would be address inside storage


      // conver image to array bytes
      const img = await fetch(result.uri)
      const bytes = await img.blob();

     const finalImage= await uploadBytes(imageref, bytes)
     setImage(finalImage)
      console.log("Image Succcessfully uploaded")

    }
    // const imageRef = ref(db, `images/${image.name + v4()}`);
    // uploadBytes(imageRef,image).then(()=>{
    //   alert("Image Upload")
    // })
  }


  // Take photo



  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle} >Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={()=>navigation.navigate("Camera")}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
      }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            John Doe
          </Text>
        </View>

        <Formik
          initialValues={{
            fname: "",
            lname: "",
            number: "",
            email: "",
            country: "",
            city: "",
          }}
          validationSchema={reviewSchema}

          onSubmit={(values) => {
            try {
              console.log("Data in Try ")
              addDoc(userCollectionRef, {
                fname: values.fname,
                lname: values.lname,
                number: values.number,
                email: values.email,
                country: values.country,
                city: values.city,
              })
            }
            catch { (err) => console.log("Error is ", $err) }
          }}
        >
          {
            (props) => (
              <>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={props.handleChange("fname")}
                    value={props.values.fname}
                    onBlur={props.handleBlur('fname')}
                  />
                  <Text style={styles.error}>{props.touched.fname && props.errors.fname}</Text>
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={props.handleChange("lname")}
                    value={props.values.lname}
                    onBlur={props.handleBlur('lname')}
                  />
                  <Text style={styles.error}>{props.touched.lname && props.errors.lname}</Text>
                </View>
                <View style={styles.action}>
                  <Feather name="phone" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={props.handleChange("number")}
                    value={props.values.number}
                    onBlur={props.handleBlur('number')}
                  />
                  <Text style={styles.error}>{props.touched.number && props.errors.number}</Text>
                </View>
                <View style={styles.action}>
                  <FontAwesome name="envelope-o" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                    onBlur={props.handleBlur('email')}
                  />
                  <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
                </View>
                <View style={styles.action}>
                  <FontAwesome name="globe" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={props.handleChange("country")}
                    value={props.values.country}
                    onBlur={props.handleBlur('country')}
                  />
                  <Text style={styles.error}>{props.touched.country && props.errors.country}</Text>
                </View>
                <View style={styles.action}>
                  <Icon name="map-marker-outline" color={colors.text} size={20} />
                  <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={props.handleChange("city")}
                    value={props.values.city}
                    onBlur={props.handleBlur('city')}
                  />
                  <Text style={styles.error}>{props.touched.city && props.errors.city}</Text>
                </View>
                {/* onPress={props.handleSubmit} */}
                <TouchableOpacity style={styles.commandButton} onPress={props.handleSubmit} >
                  <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
              </>
            )
          }
        </Formik>
      </Animated.View>
    </View>
  );
};

export default EditCommon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#694fad',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#694fad',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#694fad',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  error: {
    color: 'red',
  }
});
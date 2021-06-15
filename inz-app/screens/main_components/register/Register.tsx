import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { Users } from "../../../model/users";
import { Colors } from "../../../model/colors";
import { styles } from "./Register_styles"

import { AuthContext } from "../../../components/context";

const Register = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    passwordConfirm: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    arePassSame: true,
  });

  const { colors } = useTheme();

  const { RegisterContext } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleRegister = (
    userName,
    password,
    areTheSame,
    isValidUser,
    isValidPassword
  ) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (areTheSame) {
      if (isValidUser && isValidPassword) {
        RegisterContext(userName, password);
        return;
      } else {
        Alert.alert("Wrong Input!", "Username or password is incorrect.", [
          { text: "Okay" },
        ]);
        return;
      }
    } else {
      Alert.alert("Wrong Input!", "Passwords are not the same.", [
        { text: "Okay" },
      ]);
      return;
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handlePasswordConfirmChange = (val) => {
    if (val == data.password) {
      setData({
        ...data,
        arePassSame: true,
      });
    } else {
      setData({
        ...data,
        arePassSame: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.main_color} barStyle="light-content" />
      <View style={styles.header}>
        {/* <Image
          style={styles.image}
          source={require("../../../assets/images/logo.png")}
        /> */}
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: "black",
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: "grey",
            },
          ]}
        >
          Nazwa użytkownika
        </Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color={"grey"}
            size={20}
            style={{ paddingBottom: 10 }}
          />
          <TextInput
            placeholder="Twoja nazwa użytkownika"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: "grey",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
            Nazwa użytkownika powinna mieć przynajmniej 4 znaki.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "grey",
              marginTop: 10,
            },
          ]}
        >
          Hasło
        </Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color={"grey"}
            size={20}
            style={{ paddingBottom: 10 }}
          />
          <TextInput
            placeholder="Twoje hasło"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: "grey",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color={Colors.main_color} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
             Hasło powinno mieć powyżej 8 znaków.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "grey",
              marginTop: 10,
            },
          ]}
        >
          Potwirdź hasło
        </Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color={"grey"}
            size={20}
            style={{ paddingBottom: 10 }}
          />
          <TextInput
            placeholder="Twoje hasło"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: "grey",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordConfirmChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color={Colors.main_color} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.arePassSame ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Hasła powinny być takie same.</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={
              (styles.signIn,
              {
                backgroundColor: Colors.main_color,
                width: "100%",
                borderRadius: 10,
              })
            }
            onPress={() =>
              handleRegister(
                data.username,
                data.password,
                data.arePassSame,
                data.isValidUser,
                data.isValidPassword
              )
            }
          >
            <View style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "black",
                  },
                ]}
              >
                Zarejestruj
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={[
              styles.signIn,
              {
                borderColor: Colors.main_color,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: Colors.main_color,
                },
              ]}
            >
              Zaloguj
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Register;

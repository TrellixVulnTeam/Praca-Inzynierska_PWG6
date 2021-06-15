import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { AuthContext } from "../../../components/context";
import { styles } from "./Login_styles";
import { Colors } from "../../../model/colors";

const Login = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "aaaa",
    password: "aaaaaaaa",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const { LoginContext } = React.useContext(AuthContext);

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

  const loginHandle = () => {
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Błąd logowania!",
        "Pole nazwy użytkownika i/lub hasła nie może być puste",
        [{ text: "Okay" }]
      );
      return;
    }

    // if (foundUser.length == 0) {
    //   Alert.alert("Invalid User!", "Username or password is incorrect.", [
    //     { text: "Okay" },
    //   ]);
    //   return;
    // }
    LoginContext(data.username, data.password);
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
              marginTop: 35,
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

        <TouchableOpacity>
          <Text style={{ color: Colors.main_color, marginTop: 15 }}>
            Zapomniałem hasła
          </Text>
        </TouchableOpacity>
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
            onPress={() => {
              loginHandle();
            }}
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
                Zaloguj
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
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
              Zarejestruj
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;

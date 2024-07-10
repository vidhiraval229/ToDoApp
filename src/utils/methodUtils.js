import { View, TouchableOpacity,  } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import COLORS from "./colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const showToastAlertWMsg = (text, success = true) => {
    Toast.show({
        type: success ? "success" : "error",
        text1: success ? "Success" : "Failed",
        text2: text,
        bottomOffset: 50,
        visibilityTime: 3000,
        autoHide: true,
        position: "top",
    });
};

export const toastConfig = {

    success: (props) => (
        <BaseToast
            {...props}
            style={{ width: "90%", borderLeftColor: COLORS.DarkTheme, height: 50 }}
            contentContainerStyle={{ paddingHorizontal: 15, width: "90%" }}
            text1Style={{
                fontSize: 12,
                fontWeight: "bold",
            }}
            renderLeadingIcon={() => (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 10,
                    }}
                />
            )}
            renderTrailingIcon={() => (
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        width: 50,
                        alignItems: "center",
                    }}
                    onPress={Toast.hide}
                />
            )}
        />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 12,
                fontWeight: "bold",
            }}
            style={{
                width: "90%",
                borderLeftColor: "#FF9494",
            }}
            contentContainerStyle={{ paddingHorizontal: 15, width: "90%" }}
            renderLeadingIcon={() => (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 10,
                    }}
                />
            )}
            renderTrailingIcon={() => (
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        width: 50,
                        alignItems: "center",
                    }}
                    onPressIn={Toast.hide}
               />
            )}
        />
    ),
  };